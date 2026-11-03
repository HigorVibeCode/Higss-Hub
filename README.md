# Higss Hub

Hub de links do Higor: todos os projetos em um só lugar, com uma página própria para cada cliente.

| Endereço | O que mostra |
|---|---|
| `higsshub.com` | O hub: links públicos agrupados por cliente, com busca. Logado, mostra também os privados |
| `<cliente>.higsshub.com` | Só os links públicos daquele cliente (ex.: `orla.higsshub.com`) |
| `higsshub.com/c/<cliente>` | A mesma página do cliente, útil nos previews `*.vercel.app` |
| `higsshub.com/admin` | Painel para cadastrar clientes e links, protegido por senha |

Stack: Next.js 16 (App Router) e Tailwind 4, só com a Vercel. Os dados ficam num JSON privado no **Vercel Blob**. Idiomas da interface: en, pt, de, fr, es, it.

## Colocar no ar (só na Vercel)

1. **Storage → Create → Blob.** Crie um armazenamento com acesso **Private** e conecte ao projeto Higss-Hub. Isso cria sozinho a variável de acesso ao Blob.
2. **Settings → Environment Variables.** Crie `ADMIN_PASSWORD` com a senha do painel. `ROOT_DOMAIN` já vale `higsshub.com` por padrão.
3. **Settings → Domains.** Adicione `*.higsshub.com`. O DNS já está na Vercel, então o certificado sai sozinho.
4. **Publique de novo** (Deployments → Redeploy) para as variáveis entrarem.

No primeiro acesso o painel já traz os 5 clientes. O arquivo `hub.json` é criado no Blob na primeira vez que você salva algo.

## Rodar localmente

```bash
cp .env.example .env.local   # defina ADMIN_PASSWORD
npm install
npm run dev
```

- Sem as credenciais do Blob, os dados ficam em `.data/hub.json`, que não vai para o Git.
- Para usar o Blob de produção localmente, rode `vercel env pull .env.local`.
- `http://localhost:3000` abre o hub.
- `http://orla.localhost:3000` abre a página do cliente.

## Como funciona

- `lib/store.ts`: lê e grava o `hub.json`. A leitura fica em cache e cada gravação limpa o cache na hora. A gravação usa o ETag para não sobrescrever uma edição feita em outra aba.
- `lib/auth.ts`: o login com `ADMIN_PASSWORD` gera um cookie assinado que vale 30 dias. Trocar a senha desconecta todas as sessões.
- `proxy.ts`: transforma `<slug>.higsshub.com` em `/c/<slug>` e redireciona as URLs do site antigo (`/pt`, `/en/...`) para o hub.
- O filtro de links privados acontece no servidor. Links privados nunca chegam ao navegador de quem não está logado, e as páginas de cliente mostram só os públicos.
- Os textos da interface ficam em `lib/i18n.ts`. O idioma vem do cookie `locale` ou do navegador.
