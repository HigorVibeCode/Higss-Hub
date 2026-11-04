import { ActionForm, SubmitButton } from '@/components/admin/ActionForm';
import { CopyButton } from '@/components/admin/CopyButton';
import { getHubData, type Client, type Link } from '@/lib/data';
import { clientUrl } from '@/lib/domain';
import { env } from '@/lib/env';
import { getDictionary } from '@/lib/i18n';
import {
  deleteClient,
  deleteLink,
  moveClient,
  moveLink,
  refreshPreviews,
  saveClient,
  saveLink,
  saveStats,
  toggleLinkPublic,
} from './actions';
import { DEFAULT_STATS, readHub } from '@/lib/store';

const KIND_LABELS = getDictionary('pt').kinds;

type Props = { searchParams: Promise<{ editar?: string; cliente?: string }> };

export default async function AdminPage({ searchParams }: Props) {
  const { editar, cliente } = await searchParams;
  const [{ clients, links }, hub] = await Promise.all([getHubData(true), readHub()]);
  const stats = { ...DEFAULT_STATS, ...hub.stats };

  const groups = [
    ...clients.map((c) => ({ client: c as Client | null, links: links.filter((l) => l.client_id === c.id) })),
    { client: null, links: links.filter((l) => !l.client_id) },
  ];
  const publicCount = links.filter((l) => l.is_public).length;

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Painel</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight">Seus links</h1>
          <p className="text-sm text-muted">
            {clients.length} clientes · {links.length} links · {publicCount} públicos
          </p>
          <ActionForm action={refreshPreviews} className="mt-2 flex flex-wrap items-center gap-3">
            <SubmitButton className="text-xs font-semibold text-accent hover:text-accent-hover">↻ Atualizar miniaturas</SubmitButton>
          </ActionForm>
        </div>
        <details className="w-full sm:relative sm:w-auto">
          <summary className="btn-primary cursor-pointer list-none">+ Novo cliente</summary>
          <div className="mt-3 rounded-xl border border-border bg-surface p-4 shadow-2xl sm:absolute sm:right-0 sm:z-20 sm:w-[28rem]">
            <ActionForm action={saveClient} resetOnSuccess className="flex flex-col gap-3">
              <ClientFields />
              <SubmitButton>Criar cliente</SubmitButton>
            </ActionForm>
          </div>
        </details>
      </div>

      <details className="rounded-2xl border border-border bg-surface/90 backdrop-blur">
        <summary className="cursor-pointer list-none p-4">
          <span className="font-display font-bold">Números da página inicial</span>
          <span className="ml-2 text-sm text-muted">aparecem na seção “Feito na prática”; vazio esconde</span>
        </summary>
        <ActionForm action={saveStats} className="grid gap-3 border-t border-border p-4 sm:grid-cols-2">
          <Field label="Clientes atendidos" hint={`Vazio: usa o total cadastrado (${clients.length}).`}>
            <input name="clients" type="number" min="0" defaultValue={stats.clients ?? ''} className="field" />
          </Field>
          <Field label="Projetos entregues">
            <input name="projects" type="number" min="0" defaultValue={stats.projects ?? ''} className="field" />
          </Field>
          <Field label="Países">
            <input name="countries" type="number" min="0" defaultValue={stats.countries ?? ''} className="field" />
          </Field>
          <Field label="Siglas dos países" hint="Aparece embaixo do número, ex.: BR · CH · US">
            <input name="countries_list" defaultValue={stats.countries_list ?? ''} className="field" />
          </Field>
          <Field label="Idiomas">
            <input name="languages" type="number" min="0" defaultValue={stats.languages ?? ''} className="field" />
          </Field>
          <div className="flex items-end">
            <SubmitButton>Salvar números</SubmitButton>
          </div>
        </ActionForm>
      </details>

      {groups.map(({ client, links: groupLinks }, gi) => {
        if (!client && groupLinks.length === 0 && clients.length > 0) return null;
        const editingClient = client && cliente === client.id;
        return (
          <section key={client?.id ?? 'sem-cliente'} id={client ? `c-${client.id}` : 'sem-cliente'} className="rounded-2xl border border-border bg-surface/90 backdrop-blur">
            <header className="flex flex-wrap items-center gap-3 border-b border-border p-4">
              {client?.accent_color && <span className="size-3 rounded-full" style={{ background: client.accent_color }} />}
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-xl font-extrabold tracking-tight">{client?.name ?? 'Sem cliente'}</h2>
                {client ? (
                  <a href={clientUrl(client.slug, env.rootDomain)} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:text-accent-hover">
                    {client.slug}.{env.rootDomain} ↗
                  </a>
                ) : (
                  <p className="text-sm text-muted">Aparecem só no hub, em “Outros projetos”.</p>
                )}
              </div>
              {client && (
                <div className="flex flex-wrap items-center gap-2">
                  <CopyButton value={clientUrl(client.slug, env.rootDomain)} />
                  <a href={editingClient ? '/admin' : `/admin?cliente=${client.id}#c-${client.id}`} className="btn-ghost">
                    {editingClient ? 'Fechar' : 'Editar'}
                  </a>
                  <MoveButtons action={moveClient} id={client.id} first={gi === 0} last={gi === clients.length - 1} />
                </div>
              )}
            </header>

            {editingClient && (
              <div className="flex flex-col gap-3 border-b border-border bg-card/40 p-4">
                <ActionForm action={saveClient} className="flex flex-col gap-3">
                  <input type="hidden" name="id" value={client.id} />
                  <ClientFields client={client} />
                  <SubmitButton>Salvar cliente</SubmitButton>
                </ActionForm>
                <ActionForm action={deleteClient} confirm={`Excluir ${client.name}? Os links dele vão para “Sem cliente”.`}>
                  <input type="hidden" name="id" value={client.id} />
                  <SubmitButton className="btn-ghost text-danger hover:border-danger hover:text-danger">Excluir cliente</SubmitButton>
                </ActionForm>
              </div>
            )}

            <ul className="divide-y divide-border">
              {groupLinks.length === 0 && <li className="p-4 text-sm text-muted">Nenhum link ainda.</li>}
              {groupLinks.map((link, li) => (
                <li key={link.id} id={`l-${link.id}`} className="p-4">
                  <LinkRow link={link} first={li === 0} last={li === groupLinks.length - 1} editing={editar === link.id} />
                  {editar === link.id && (
                    <ActionForm action={saveLink} className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-card/40 p-4">
                      <input type="hidden" name="id" value={link.id} />
                      <LinkFields link={link} clients={clients} clientId={link.client_id} />
                      <div className="flex gap-2">
                        <SubmitButton>Salvar link</SubmitButton>
                        <a href="/admin" className="btn-ghost">
                          Cancelar
                        </a>
                      </div>
                    </ActionForm>
                  )}
                </li>
              ))}
            </ul>

            <details className="border-t border-border">
              <summary className="cursor-pointer list-none p-4 text-sm font-semibold text-accent hover:text-accent-hover">
                + Adicionar link{client ? ` para ${client.name}` : ''}
              </summary>
              <ActionForm action={saveLink} resetOnSuccess className="flex flex-col gap-3 px-4 pb-4">
                <LinkFields clients={clients} clientId={client?.id ?? null} />
                <SubmitButton>Adicionar link</SubmitButton>
              </ActionForm>
            </details>
          </section>
        );
      })}
    </main>
  );
}

function LinkRow({ link, first, last, editing }: { link: Link; first: boolean; last: boolean; editing: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="min-w-0 flex-1 basis-56">
        <p className="truncate font-semibold">{link.title}</p>
        <a href={link.url} target="_blank" rel="noopener noreferrer" className="block truncate text-xs text-muted hover:text-text">
          {link.url}
        </a>
      </div>
      <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">{KIND_LABELS[link.kind]}</span>
      <ActionForm action={toggleLinkPublic}>
        <input type="hidden" name="id" value={link.id} />
        <input type="hidden" name="is_public" value={String(!link.is_public)} />
        <SubmitButton
          title={link.is_public ? 'Tornar privado' : 'Tornar público'}
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors ${
            link.is_public
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:border-emerald-400'
              : 'border-accent/40 bg-accent/10 text-accent hover:border-accent'
          }`}
        >
          {link.is_public ? 'Público' : 'Privado'}
        </SubmitButton>
      </ActionForm>
      <div className="flex items-center gap-1.5">
        <MoveButtons action={moveLink} id={link.id} first={first} last={last} />
        <a href={editing ? '/admin' : `/admin?editar=${link.id}#l-${link.id}`} className="btn-icon" title="Editar" aria-label="Editar">
          ✎
        </a>
        <ActionForm action={deleteLink} confirm={`Excluir o link “${link.title}”?`}>
          <input type="hidden" name="id" value={link.id} />
          <SubmitButton className="btn-icon hover:border-danger hover:text-danger" title="Excluir">
            ✕
          </SubmitButton>
        </ActionForm>
      </div>
    </div>
  );
}

function MoveButtons({
  action,
  id,
  first,
  last,
}: {
  action: typeof moveLink;
  id: string;
  first: boolean;
  last: boolean;
}) {
  return (
    <>
      {(['up', 'down'] as const).map((dir) => (
        <ActionForm key={dir} action={action}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="dir" value={dir} />
          <SubmitButton className="btn-icon" title={dir === 'up' ? 'Subir' : 'Descer'}>
            {dir === 'up' ? '↑' : '↓'}
          </SubmitButton>
        </ActionForm>
      )).filter((_, i) => (i === 0 ? !first : !last))}
    </>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}

function ClientFields({ client }: { client?: Client }) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nome">
          <input name="name" required defaultValue={client?.name} className="field" placeholder="Orla do Sol Pousada" />
        </Field>
        <Field label="Endereço" hint={`vira <endereço>.${env.rootDomain}`}>
          <input name="slug" required defaultValue={client?.slug} className="field" placeholder="orla" pattern="[a-z0-9-]+" />
        </Field>
      </div>
      <Field label="Frase de apresentação (opcional)">
        <input name="tagline" defaultValue={client?.tagline ?? ''} className="field" placeholder="Site, reservas e painel da pousada" />
      </Field>
      <div className="grid gap-3 sm:grid-cols-[1fr_10rem]">
        <Field label="Link da logo (opcional)">
          <input name="logo_url" type="url" defaultValue={client?.logo_url ?? ''} className="field" placeholder="https://…/logo.png" />
        </Field>
        <Field label="Cor (opcional)">
          <input name="accent_color" defaultValue={client?.accent_color ?? ''} className="field" placeholder="#D87445" pattern="#[0-9a-fA-F]{6}" />
        </Field>
      </div>
    </>
  );
}

function LinkFields({ link, clients, clientId }: { link?: Link; clients: Client[]; clientId: string | null }) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nome">
          <input name="title" defaultValue={link?.title} className="field" placeholder="Vazio: usa o título do site" />
        </Field>
        <Field label="Endereço">
          <input name="url" required defaultValue={link?.url} className="field" placeholder="orladosol.com.br" />
        </Field>
      </div>
      <Field label="Descrição (opcional)" hint="Vazia: usa a descrição do próprio site.">
        <input name="description" defaultValue={link?.description ?? ''} className="field" placeholder="Para que serve esse link" />
      </Field>
      <Field label="Imagem de capa (opcional)" hint="Vazia: usa a miniatura do site, a mesma que aparece no WhatsApp.">
        <input name="image_url" type="url" defaultValue={link?.image_url ?? ''} className="field" placeholder="https://…/capa.jpg" />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Cliente">
          <select name="client_id" defaultValue={clientId ?? ''} className="field">
            <option value="">Sem cliente</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tipo">
          <select name="kind" defaultValue={link?.kind ?? 'site'} className="field">
            {Object.entries(KIND_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_public" defaultChecked={link?.is_public ?? false} className="size-4 accent-[#d87445]" />
        Visível na página do cliente
      </label>
    </>
  );
}
