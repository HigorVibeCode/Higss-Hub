import { readHub, type Client, type Link } from '@/lib/store';

export type { Client, Link } from '@/lib/store';

const byOrder = <T extends { sort_order: number }>(a: T, b: T) => a.sort_order - b.sort_order;

/** Clients and links for the hub; private links only when the admin is looking. */
export async function getHubData(includePrivate: boolean) {
  const data = await readHub();
  return {
    clients: [...data.clients].sort(byOrder) as Client[],
    links: data.links.filter((l) => includePrivate || l.is_public).sort(byOrder) as Link[],
  };
}

/** A client page always shows what the client sees: public links only. */
export async function getClientPage(slug: string) {
  const data = await readHub();
  const client = data.clients.find((c) => c.slug === slug);
  if (!client) return null;
  return { client, links: data.links.filter((l) => l.client_id === client.id && l.is_public).sort(byOrder) };
}
