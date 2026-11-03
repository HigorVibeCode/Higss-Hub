import { BlobPreconditionFailedError, get, put } from '@vercel/blob';
import { revalidateTag, unstable_cache } from 'next/cache';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Kind } from '@/lib/i18n';

export type Client = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  logo_url: string | null;
  accent_color: string | null;
  sort_order: number;
};

export type Link = {
  id: string;
  client_id: string | null;
  title: string;
  url: string;
  description: string | null;
  kind: Kind;
  is_public: boolean;
  sort_order: number;
};

export type HubData = { clients: Client[]; links: Link[] };

const BLOB_PATH = 'hub.json';
const LOCAL_FILE = path.join(process.cwd(), '.data', 'hub.json');
const TAG = 'hub';

/** Where the hub lives: a private Vercel Blob in production, a local file in dev without Blob credentials. */
export const storageMode: 'blob' | 'local' | null =
  process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID
    ? 'blob'
    : process.env.NODE_ENV === 'development'
      ? 'local'
      : null;

// Stable ids so edits work before the first save creates the file.
const seed = (): HubData => ({
  clients: [
    ['orla', 'Orla do Sol Pousada'],
    ['crea', 'Crea Glass'],
    ['ngflorida', 'NeoGlass Florida'],
    ['ngsoftware', 'NeoGlass Software'],
    ['buechler', 'Buechler Glass'],
  ].map(([slug, name], i) => ({
    id: `seed-${slug}`,
    slug,
    name,
    tagline: null,
    logo_url: null,
    accent_color: null,
    sort_order: (i + 1) * 10,
  })),
  links: [],
});

async function readRaw(): Promise<{ data: HubData; etag: string | null }> {
  if (storageMode === 'blob') {
    const res = await get(BLOB_PATH, { access: 'private', useCache: false });
    if (!res || res.statusCode !== 200) return { data: seed(), etag: null };
    return { data: (await new Response(res.stream).json()) as HubData, etag: res.blob.etag };
  }
  if (storageMode === 'local') {
    try {
      return { data: JSON.parse(await readFile(LOCAL_FILE, 'utf8')) as HubData, etag: null };
    } catch {
      return { data: seed(), etag: null };
    }
  }
  throw new Error('Armazenamento não configurado.');
}

/** Cached read; every write expires it so the next request sees the change. */
export const readHub = unstable_cache(async () => (await readRaw()).data, ['hub-data'], { tags: [TAG] });

/**
 * Reads the latest data, lets `mutate` change it in place, then saves.
 * `mutate` returns an error message to abort without saving.
 */
export async function updateHub(mutate: (data: HubData) => string | void): Promise<string | void> {
  const { data, etag } = await readRaw();
  const error = mutate(data);
  if (error) return error;
  const body = JSON.stringify(data, null, 2);

  if (storageMode === 'blob') {
    try {
      await put(BLOB_PATH, body, {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
        ...(etag ? { ifMatch: etag } : {}),
      });
    } catch (e) {
      if (e instanceof BlobPreconditionFailedError) return 'Os dados mudaram em outra aba. Recarregue a página e tente de novo.';
      throw e;
    }
  } else {
    await mkdir(path.dirname(LOCAL_FILE), { recursive: true });
    await writeFile(LOCAL_FILE, body);
  }
  revalidateTag(TAG, { expire: 0 });
}
