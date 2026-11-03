-- Higss Hub: clientes, links e quem administra.
-- Visitantes leem só links públicos; o admin (tabela admins) lê e edita tudo.

create table public.admins (
  email text primary key
);

alter table public.admins enable row level security;
-- sem policies: ninguém lê pela API; só a função is_admin() consulta.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins a
    where a.email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]([a-z0-9-]{0,38}[a-z0-9])?$'),
  name text not null check (length(trim(name)) > 0),
  tagline text,
  logo_url text check (logo_url is null or logo_url ~* '^https?://'),
  accent_color text check (accent_color is null or accent_color ~ '^#[0-9a-fA-F]{6}$'),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.links (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients (id) on delete set null,
  title text not null check (length(trim(title)) > 0),
  url text not null check (url ~* '^https?://'),
  description text,
  kind text not null default 'site'
    check (kind in ('site', 'app', 'admin', 'staging', 'docs', 'other')),
  is_public boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index links_client_order_idx on public.links (client_id, sort_order);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger clients_touch before update on public.clients
  for each row execute function public.touch_updated_at();
create trigger links_touch before update on public.links
  for each row execute function public.touch_updated_at();

alter table public.clients enable row level security;
alter table public.links enable row level security;

create policy "clientes visíveis para todos" on public.clients
  for select to anon, authenticated using (true);
create policy "admin gerencia clientes" on public.clients
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "links públicos ou admin" on public.links
  for select to anon, authenticated using (is_public or public.is_admin());
create policy "admin gerencia links" on public.links
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

grant select on public.clients, public.links to anon, authenticated;
grant insert, update, delete on public.clients, public.links to authenticated;

-- Dados iniciais
insert into public.admins (email) values ('higorlucas2@gmail.com');

insert into public.clients (slug, name, sort_order) values
  ('orla', 'Orla do Sol Pousada', 10),
  ('crea', 'Crea Glass', 20),
  ('ngflorida', 'NeoGlass Florida', 30),
  ('ngsoftware', 'NeoGlass Software', 40),
  ('buechler', 'Buechler Glass', 50);
