# HIGSS HUB - Site Institucional

Site institucional e catálogo para HIGSS HUB, construído com Next.js App Router, TypeScript, TailwindCSS e next-intl para internacionalização.

## 🚀 Como Rodar Localmente

1. **Instalar dependências:**
```bash
npm install
```

2. **Rodar o servidor de desenvolvimento:**
```bash
npm run dev
```

3. **Abrir no navegador:**
```
http://localhost:3000
```

O site estará disponível em `/en` (padrão), `/pt`, `/de`, `/fr`, `/es`, `/it`.

## 📁 Estrutura do Projeto

```
app/
 └─ [locale]/
     └─ (site)/
         ├─ page.tsx (Home)
         ├─ products-services/
         │   ├─ page.tsx
         │   └─ [slug]/page.tsx
         ├─ smart-lab/page.tsx
         └─ contact/page.tsx

components/          # Componentes reutilizáveis
content/            # Arquivos de conteúdo (JSON)
messages/           # Arquivos de tradução (JSON)
```

## ✏️ Como Editar Textos e Dados por Idioma

### Traduções Gerais

Edite os arquivos em `messages/`:
- `messages/en.json` - Inglês (padrão)
- `messages/pt.json` - Português
- `messages/de.json` - Alemão
- `messages/fr.json` - Francês
- `messages/es.json` - Espanhol
- `messages/it.json` - Italiano

Cada arquivo contém todas as traduções do site organizadas por seção (nav, footer, home, products, smartLab, contact).

### Métricas da Home

Edite `content/metrics.json`. O arquivo contém um objeto com chaves de idioma, cada uma com um array de métricas:

```json
{
  "en": [
    { "value": "50+", "label": "Projects delivered" }
  ],
  "pt": [
    { "value": "50+", "label": "Projetos entregues" }
  ]
}
```

## 📦 Como Adicionar Novo Item no Catálogo

1. Edite `content/catalog.json`
2. Adicione o novo item no array `items` do idioma desejado:

```json
{
  "en": {
    "items": [
      {
        "slug": "meu-novo-produto",
        "title": "Meu Novo Produto",
        "category": "services", // ou "digital-products" ou "software-systems"
        "shortDescription": "Descrição curta do produto",
        "tags": ["Tag1", "Tag2"],
        "whoItsFor": "Para quem é este produto",
        "whatYouGet": [
          "Item 1",
          "Item 2"
        ],
        "howItWorks": [
          "Passo 1",
          "Passo 2"
        ],
        "typicalTimeline": "Cronograma típico",
        "faq": [
          {
            "question": "Pergunta?",
            "answer": "Resposta."
          }
        ]
      }
    ]
  }
}
```

3. Adicione o mesmo item nos outros idiomas (pt, de, fr, es, it) com as traduções apropriadas.

**Importante:** O `slug` deve ser o mesmo em todos os idiomas (usado na URL).

## 🧪 Como Adicionar Novo Item na Timeline do Smart Lab

1. Edite `content/smartlab.json`
2. Adicione o novo item no array `items` do idioma desejado:

```json
{
  "en": {
    "items": [
      {
        "phase": "Phase 6", // ou "year": "2025"
        "title": "Título do Insight",
        "insight": "Texto curto do insight (2-4 linhas)",
        "tags": ["Tag1", "Tag2"],
        "link": { // opcional
          "label": "Ler mais",
          "url": "https://..."
        },
        "howIApplyIt": "Parágrafo curto explicando como aplico este insight"
      }
    ]
  }
}
```

3. Adicione o mesmo item nos outros idiomas com as traduções apropriadas.

## 🎨 Design System

### Cores
- `bg`: #071316 (fundo principal)
- `surface`: #0B1A1E (superfícies)
- `card`: #24343A (cards)
- `border`: #3A4B52 (bordas)
- `text`: #F4F6F7 (texto principal)
- `muted`: #A8B3B8 (texto secundário)
- `accent`: #D87445 (destaque laranja)
- `accentHover`: #F08B5C (hover do accent)

### Tipografia
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 🌐 Internacionalização

O site suporta 6 idiomas:
- Inglês (EN) - padrão
- Português (PT)
- Alemão (DE)
- Francês (FR)
- Espanhol (ES)
- Italiano (IT)

As rotas seguem o padrão: `/{locale}/{page}`

## 📄 Páginas

1. **Home** (`/`) - Hero, mensagem principal, métricas, "How I Work", CTA
2. **Products & Services** (`/products-services`) - Catálogo com filtros
3. **The Smart Lab** (`/smart-lab`) - Timeline com filtros por tags
4. **Contact** (`/contact`) - Formulário de contato e WhatsApp

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter

## 📝 Notas

- O formulário de contato não tem backend configurado (apenas estrutura)
- O WhatsApp usa link `wa.me` com mensagem padrão
- SEO básico implementado (metadata, sitemap, robots.txt)
- Design responsivo mobile-first

## 🚀 Deploy

### Opção 1: Vercel (Recomendado para Next.js)

A Vercel é a plataforma recomendada para projetos Next.js e oferece deploy automático.

#### Passo a Passo:

1. **Teste o build localmente:**
   ```bash
   npm run build
   npm run start
   ```
   Teste em `http://localhost:3000` para garantir que tudo funciona.

2. **Instale a CLI da Vercel (opcional):**
   ```bash
   npm i -g vercel
   ```

3. **Deploy via CLI:**
   ```bash
   vercel
   ```
   Siga as instruções no terminal.

4. **Deploy via Dashboard (recomendado):**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub/GitLab/Bitbucket
   - Clique em "Add New Project"
   - Importe o repositório do projeto
   - A Vercel detectará automaticamente Next.js
   - Clique em "Deploy"

5. **Configuração do Domínio:**
   - No dashboard da Vercel, vá em Settings > Domains
   - Adicione `higsshub.com` e `www.higsshub.com`
   - Configure os registros DNS conforme instruções da Vercel

#### Configurações Importantes:

- **Framework Preset:** Next.js (detectado automaticamente)
- **Build Command:** `npm run build` (padrão)
- **Output Directory:** `.next` (padrão)
- **Install Command:** `npm install` (padrão)

### Opção 2: Netlify

1. **Crie `netlify.toml` na raiz do projeto:**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy:**
   - Acesse [netlify.com](https://netlify.com)
   - Conecte o repositório
   - Configure o domínio

### Opção 3: Outros Provedores

Para outros provedores (AWS, DigitalOcean, etc.), você precisará:

1. **Build do projeto:**
   ```bash
   npm run build
   ```

2. **Iniciar o servidor:**
   ```bash
   npm run start
   ```

3. **Configurar variáveis de ambiente** (se necessário)

### Checklist Antes do Deploy

- [ ] Teste o build local: `npm run build && npm run start`
- [ ] Verifique todas as rotas em todos os idiomas
- [ ] Confirme que as imagens estão na pasta `public/images/`
- [ ] Verifique o sitemap e robots.txt
- [ ] Teste responsividade em mobile e desktop
- [ ] Verifique SEO (metadata, OpenGraph)

### Variáveis de Ambiente

Atualmente, o projeto não requer variáveis de ambiente. Se precisar adicionar no futuro, configure no painel do provedor de hospedagem.

### Domínio Personalizado

Para usar `higsshub.com`:

1. Configure os registros DNS conforme instruções do provedor
2. Adicione o domínio no painel de controle
3. Aguarde a propagação DNS (pode levar até 48 horas)
