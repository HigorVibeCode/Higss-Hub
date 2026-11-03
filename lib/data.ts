import { getSupabase } from '@/lib/supabase/server';
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

export type Viewer = { email: string | null; isAdmin: boolean };

type Supabase = NonNullable<Awaited<ReturnType<typeof getSupabase>>>;

export async function getViewer(supabase: Supabase): Promise<Viewer> {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return { email: null, isAdmin: false };
  const { data: isAdmin } = await supabase.rpc('is_admin');
  return { email: data.user.email ?? null, isAdmin: isAdmin === true };
}

/** Clients and links visible to the current visitor (RLS hides private links from non-admins). */
export async function getHubData(supabase: Supabase) {
  const [clients, links] = await Promise.all([
    supabase.from('clients').select('*').order('sort_order').order('name'),
    supabase.from('links').select('*').order('sort_order').order('created_at'),
  ]);
  if (clients.error) throw clients.error;
  if (links.error) throw links.error;
  return { clients: clients.data as Client[], links: links.data as Link[] };
}

export async function getClientPage(supabase: Supabase, slug: string) {
  const { data: client, error } = await supabase.from('clients').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  if (!client) return null;
  const links = await supabase
    .from('links')
    .select('*')
    .eq('client_id', client.id)
    .order('sort_order')
    .order('created_at');
  if (links.error) throw links.error;
  return { client: client as Client, links: links.data as Link[] };
}
