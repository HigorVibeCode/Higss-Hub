import { getPreview } from '@/lib/preview';
import { readHub, type Client, type Link } from '@/lib/store';

export type { Client, Link } from '@/lib/store';

/** A link ready for a card: cover image, icon and description resolved from the site when not set by hand. */
export type LinkView = Link & { cover: string | null; icon: string | null; summary: string | null };

const byOrder = <T extends { sort_order: number }>(a: T, b: T) => a.sort_order - b.sort_order;

async function withPreviews(links: Link[]): Promise<LinkView[]> {
  return Promise.all(
    links.map(async (link) => {
      const preview = await getPreview(link.url);
      return {
        ...link,
        cover: link.image_url || preview.image,
        icon: preview.icon,
        summary: link.description || preview.description,
      };
    }),
  );
}

/** Clients and links for the hub; private links only when the admin is looking. */
export async function getHubData(includePrivate: boolean) {
  const data = await readHub();
  return {
    clients: [...data.clients].sort(byOrder) as Client[],
    links: data.links.filter((l) => includePrivate || l.is_public).sort(byOrder) as Link[],
  };
}

export async function getHubView(includePrivate: boolean) {
  const { clients, links } = await getHubData(includePrivate);
  return { clients, links: await withPreviews(links) };
}

/** A client page always shows what the client sees: public links only. */
export async function getClientPage(slug: string) {
  const data = await readHub();
  const client = data.clients.find((c) => c.slug === slug);
  if (!client) return null;
  const links = data.links.filter((l) => l.client_id === client.id && l.is_public).sort(byOrder);
  return { client, links: await withPreviews(links) };
}
