# Higss Hub

Hub de links do Higor: todos os projetos em um só lugar, com uma página própria para cada cliente.

| Endereço | O que mostra |
|---|---|
| `higsshub.com` | O hub: links públicos agrupados por cliente, com busca. Logado, mostra também os privados |
| `<cliente>.higsshub.com` | Só os links públicos daquele cliente (ex.: `orla.higsshub.com`) |
| `higsshub.com/c/<cliente>` | A mesma página do cliente, útil nos previews `*.vercel.app` |
| `higsshub.com/admin` | Painel para cadastrar clientes e links (login por link no e-mail) |

Stack: Next.js 16 (App Router), Tailwind 4, Supabase (banco + login). Idiomas da interface: en, pt, de, fr, es, it.

## Colocar no ar

1. **Supabase.** Crie um projeto novo e rode `supabase/migrations/20261103000000_hub_inicial.sql` no SQL Editor. A migration cria as tabelas, as regras de acesso (RLS), o admin (`public.admins`) e os 5 clientes iniciais.
2. **Supabase → Authentication → URL Configuration.**
   - Site URL: `https://higsshub.com`
   - Redirect URLs: `https://higsshub.com/auth/callback` e `http://localhost:3000/auth/callback`
3. **Vercel → Settings → Environment Variables.** Use os nomes do [.env.example](.env.example):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (ou a chave anon antiga)
   - `ROOT_DOMAIN=higsshub.com`
   - `ADMIN_EMAILS`
4. **Vercel → Settings → Domains.** Adicione `*.higsshub.com`. O DNS já está na Vercel, então o certificado sai sozinho.

## Rodar localmente

```bash
cp .env.example .env.local   # preencha com as chaves do Supabase
npm install
npm run dev
```

- `http://localhost:3000`: o hub.
- `http://orla.localhost:3000`: a página do cliente (subdomínio em dev).

## Como funciona

- `proxy.ts`: transforma `<slug>.higsshub.com` em `/c/<slug>`, redireciona as URLs do site antigo (`/pt`, `/en/...`) para o hub e renova a sessão do admin.
- Quem pode ver o quê é decidido pelo **RLS do banco**: visitantes só leem `links.is_public = true`, e o admin lê e edita tudo.
- `ADMIN_EMAILS` só filtra quem recebe o link de login. A permissão de verdade é a tabela `public.admins`.
- Os textos da interface ficam em `lib/i18n.ts`. O idioma vem do cookie `locale` ou do navegador.
