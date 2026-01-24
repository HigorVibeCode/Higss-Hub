# ✅ Checklist de Deploy - HIGSS HUB

Use este checklist antes de fazer o deploy na Vercel.

## 📦 Arquivos Essenciais

- [x] `next.config.js` - Configurado com next-intl
- [x] `middleware.ts` - Middleware do next-intl configurado
- [x] `i18n.ts` - Configuração de idiomas
- [x] `package.json` - Dependências corretas
- [x] `.gitignore` - Configurado

## 🖼️ Imagens Necessárias

Certifique-se de que estas imagens existem em `public/images/`:

- [ ] `logo.png` - Logo do HIGSS HUB
- [ ] `sessao.png` - Ícone multiplataforma
- [ ] `hero-background.jpg` - Imagem de fundo do hero

## 📄 Arquivos de Conteúdo

- [x] `messages/en.json` - Traduções em inglês
- [x] `messages/pt.json` - Traduções em português
- [x] `messages/de.json` - Traduções em alemão
- [x] `messages/fr.json` - Traduções em francês
- [x] `messages/es.json` - Traduções em espanhol
- [x] `messages/it.json` - Traduções em italiano
- [x] `content/metrics.json` - Métricas
- [x] `content/catalog.json` - Catálogo de produtos
- [x] `content/smartlab.json` - Timeline do Smart Lab

## 🧪 Teste Local (Antes do Deploy)

```bash
# 1. Instalar dependências
npm install

# 2. Build de produção
npm run build

# 3. Iniciar servidor de produção
npm run start
```

Teste em `http://localhost:3000`:

- [ ] Home page carrega (`/en`)
- [ ] Todas as rotas de idioma funcionam (`/pt`, `/de`, `/fr`, `/es`, `/it`)
- [ ] Seletor de idiomas funciona
- [ ] Imagens carregam (logo, sessao, hero-background)
- [ ] Products & Services mostra todos os itens
- [ ] Smart Lab mostra todos os itens
- [ ] Formulário de contato não tem erros
- [ ] Responsividade mobile funciona
- [ ] Responsividade desktop funciona

## 🚀 Deploy na Vercel

### Passo 1: Preparar Repositório

```bash
git add .
git commit -m "Preparar para deploy na Vercel"
git push
```

### Passo 2: Deploy

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe o repositório
4. Clique em "Deploy" (configurações automáticas)

### Passo 3: Configurar Domínio

1. Settings > Domains
2. Adicione `higsshub.com` e `www.higsshub.com`
3. Configure DNS conforme instruções

## ✅ Pós-Deploy

- [ ] Site acessível na URL da Vercel
- [ ] Todas as rotas funcionam
- [ ] Imagens carregam
- [ ] Domínio personalizado configurado
- [ ] SSL/HTTPS ativo
- [ ] Sitemap acessível: `/sitemap.xml`
- [ ] Robots.txt acessível: `/robots.txt`

## 🎉 Pronto!

Seu site está no ar! 🚀
