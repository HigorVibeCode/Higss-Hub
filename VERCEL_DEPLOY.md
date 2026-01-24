# 🚀 Deploy na Vercel - HIGSS HUB

Guia rápido e direto para fazer o deploy do site HIGSS HUB na Vercel.

## ✅ Pré-requisitos

- Conta na Vercel (gratuita): [vercel.com](https://vercel.com)
- Repositório Git (GitHub, GitLab ou Bitbucket)
- Node.js 18+ instalado localmente (para testes)

## 📋 Passo a Passo

### 1. Teste Local (OBRIGATÓRIO)

Antes de fazer o deploy, teste o build localmente:

```bash
# Instalar dependências
npm install

# Build de produção
npm run build

# Testar servidor de produção
npm run start
```

Teste em `http://localhost:3000` e verifique:
- ✅ Todas as rotas funcionam (`/en`, `/pt`, `/de`, `/fr`, `/es`, `/it`)
- ✅ Imagens carregam (`/images/logo.png`, `/images/sessao.png`, `/images/hero-background.jpg`)
- ✅ Seletor de idiomas funciona
- ✅ Formulários não têm erros no console
- ✅ Responsividade em mobile e desktop

### 2. Commit e Push

Certifique-se de que todo o código está commitado:

```bash
git add .
git commit -m "Preparar para deploy na Vercel"
git push
```

### 3. Deploy na Vercel

#### Opção A: Via Dashboard (Recomendado)

1. **Acesse [vercel.com](https://vercel.com)** e faça login
2. **Clique em "Add New Project"**
3. **Importe o repositório** do HIGSS HUB
4. **Configure o projeto:**
   - **Framework Preset:** Next.js (detectado automaticamente)
   - **Root Directory:** `./` (raiz)
   - **Build Command:** `npm run build` (padrão)
   - **Output Directory:** `.next` (padrão)
   - **Install Command:** `npm install` (padrão)
5. **Clique em "Deploy"**
6. **Aguarde 2-5 minutos** para o build completar

#### Opção B: Via CLI

```bash
# Instalar CLI da Vercel
npm i -g vercel

# Fazer login
vercel login

# Deploy (primeira vez)
vercel

# Deploy de produção
vercel --prod
```

### 4. Configurar Domínio Personalizado

1. **No Dashboard da Vercel:**
   - Vá em **Settings > Domains**
   - Clique em **"Add Domain"**
   - Digite `higsshub.com` e `www.higsshub.com`

2. **Configure DNS no seu provedor:**
   - A Vercel fornecerá os registros DNS necessários
   - Adicione os registros conforme instruções:
     - Tipo: `A` ou `CNAME`
     - Valor: fornecido pela Vercel
   - Aguarde propagação DNS (pode levar até 48 horas)

### 5. Variáveis de Ambiente

**Atualmente não são necessárias**, mas se precisar adicionar no futuro:

1. No Dashboard da Vercel: **Settings > Environment Variables**
2. Adicione as variáveis necessárias
3. Faça um novo deploy

## 🔧 Configurações Importantes

### Build Settings (Automático)

A Vercel detecta automaticamente:
- ✅ Next.js 14
- ✅ TypeScript
- ✅ Node.js 18+
- ✅ Build command: `npm run build`
- ✅ Output directory: `.next`

### Estrutura de Rotas

O site usa `next-intl` com rotas:
- `/en` (default)
- `/pt`, `/de`, `/fr`, `/es`, `/it`

A Vercel suporta isso automaticamente via middleware.

## 📁 Arquivos Importantes

Certifique-se de que estes arquivos estão no repositório:

- ✅ `next.config.js` - Configuração do Next.js
- ✅ `middleware.ts` - Middleware do next-intl
- ✅ `i18n.ts` - Configuração de internacionalização
- ✅ `public/images/logo.png` - Logo
- ✅ `public/images/sessao.png` - Ícone multiplataforma
- ✅ `public/images/hero-background.jpg` - Imagem de fundo do hero
- ✅ `messages/*.json` - Arquivos de tradução
- ✅ `content/*.json` - Arquivos de conteúdo

## 🐛 Troubleshooting

### Build Falha

- Verifique os logs no dashboard da Vercel
- Teste localmente: `npm run build`
- Verifique se todas as dependências estão em `package.json`

### Imagens Não Carregam

- Verifique se as imagens estão em `public/images/`
- Confirme os caminhos no código (`/images/...`)
- Limpe o cache: `rm -rf .next`

### Rotas de Idioma Não Funcionam

- Verifique se `middleware.ts` está na raiz
- Confirme que `i18n.ts` está configurado corretamente
- Verifique se todos os arquivos de tradução existem

### Erro 404 em Produção

- Verifique se o build foi bem-sucedido
- Confirme que todas as rotas estão em `app/[locale]/`
- Verifique os logs de build na Vercel

## 📊 Após o Deploy

1. **Teste todas as rotas** em todos os idiomas
2. **Verifique imagens** carregando corretamente
3. **Teste responsividade** em mobile e desktop
4. **Configure Analytics** (opcional): Google Analytics, Vercel Analytics
5. **Monitore performance**: Use Google PageSpeed Insights

## 🔄 Deploy Contínuo

Após configurar:
- ✅ Cada push na branch `main`/`master` faz deploy automático
- ✅ Pull Requests geram preview deployments
- ✅ Deploys são instantâneos após o primeiro setup

## 📝 Checklist Final

Antes de considerar o deploy completo:

- [ ] Build local funciona: `npm run build && npm run start`
- [ ] Todas as rotas testadas em todos os idiomas
- [ ] Imagens carregam corretamente
- [ ] Seletor de idiomas funciona
- [ ] Formulários funcionam (sem erros no console)
- [ ] Responsividade verificada
- [ ] Domínio configurado e propagado
- [ ] SSL/HTTPS ativo (automático na Vercel)
- [ ] Sitemap acessível: `https://higsshub.com/sitemap.xml`
- [ ] Robots.txt acessível: `https://higsshub.com/robots.txt`

## 🎉 Pronto!

Seu site está no ar! 🚀

**URL temporária:** `https://higss-hub.vercel.app` (ou similar)
**URL final:** `https://higsshub.com` (após configurar domínio)

---

**Suporte:** Se encontrar problemas, verifique os logs no dashboard da Vercel ou consulte a [documentação do Next.js](https://nextjs.org/docs).
