# 🚀 Guia Completo de Deploy - HIGSS HUB

Este guia fornece instruções detalhadas para fazer o deploy do site HIGSS HUB.

## 📋 Pré-requisitos

- Conta no provedor de hospedagem escolhido
- Acesso ao repositório Git (se usar deploy automático)
- Domínio `higsshub.com` configurado (opcional para teste)

## 🎯 Opção Recomendada: Vercel

A Vercel é a plataforma ideal para projetos Next.js, oferecendo:
- Deploy automático via Git
- CDN global
- SSL automático
- Preview deployments
- Otimizações automáticas

### Método 1: Deploy via Dashboard (Mais Fácil)

1. **Prepare o repositório:**
   ```bash
   # Certifique-se de que tudo está commitado
   git add .
   git commit -m "Preparar para deploy"
   git push
   ```

2. **Acesse a Vercel:**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login com GitHub, GitLab ou Bitbucket

3. **Importe o projeto:**
   - Clique em "Add New Project"
   - Selecione o repositório do HIGSS HUB
   - A Vercel detectará automaticamente Next.js

4. **Configure o projeto:**
   - **Framework Preset:** Next.js (já detectado)
   - **Root Directory:** `./` (raiz)
   - **Build Command:** `npm run build` (padrão)
   - **Output Directory:** `.next` (padrão)
   - **Install Command:** `npm install` (padrão)

5. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build (2-5 minutos)
   - O site estará disponível em uma URL temporária (ex: `higss-hub.vercel.app`)

### Método 2: Deploy via CLI

1. **Instale a CLI da Vercel:**
   ```bash
   npm i -g vercel
   ```

2. **Faça login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Primeira vez: escolha as opções padrão
   - Produção: use `vercel --prod`

### Configurar Domínio Personalizado

1. **No Dashboard da Vercel:**
   - Vá em Settings > Domains
   - Clique em "Add Domain"
   - Digite `higsshub.com`

2. **Configure DNS:**
   - A Vercel fornecerá os registros DNS necessários
   - Adicione no seu provedor de DNS:
     - Tipo: `A` ou `CNAME`
     - Valor: fornecido pela Vercel
   - Para `www.higsshub.com`, adicione também

3. **Aguarde propagação:**
   - Pode levar de alguns minutos a 48 horas
   - Verifique com: `dig higsshub.com` ou ferramentas online

## 🔧 Teste Local Antes do Deploy

Sempre teste o build de produção localmente:

```bash
# Build de produção
npm run build

# Iniciar servidor de produção
npm run start

# Testar em http://localhost:3000
```

### Verificações Importantes:

- [ ] Todas as rotas funcionam (`/en`, `/pt`, `/de`, `/fr`, `/es`, `/it`)
- [ ] Imagens carregam corretamente (`/images/logo.png`, `/images/hero-background.jpg`)
- [ ] Formulários funcionam (sem erros no console)
- [ ] Links de navegação funcionam
- [ ] Seletor de idiomas funciona
- [ ] Responsividade em mobile e desktop
- [ ] SEO (verifique com ferramentas como Lighthouse)

## 📦 Outras Opções de Deploy

### Netlify

1. **Crie `netlify.toml` na raiz:**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   
   [build.environment]
     NODE_VERSION = "18"
   ```

2. **Deploy:**
   - Acesse [netlify.com](https://netlify.com)
   - Conecte o repositório
   - Configure o domínio

### Servidor Próprio (VPS/Dedicated)

1. **Instale Node.js 18+ e npm**

2. **Clone o repositório:**
   ```bash
   git clone <seu-repositorio>
   cd higss-hub
   ```

3. **Instale dependências:**
   ```bash
   npm install
   ```

4. **Build:**
   ```bash
   npm run build
   ```

5. **Inicie com PM2 (recomendado):**
   ```bash
   npm install -g pm2
   pm2 start npm --name "higss-hub" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx como reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name higsshub.com www.higsshub.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Configure SSL com Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d higsshub.com -d www.higsshub.com
   ```

## 🔍 Troubleshooting

### Build Falha

- Verifique se todas as dependências estão instaladas
- Execute `npm run lint` para verificar erros
- Verifique logs do build no console

### Imagens Não Carregam

- Certifique-se de que as imagens estão em `public/images/`
- Verifique os caminhos no código (devem começar com `/images/`)
- Limpe o cache: `rm -rf .next`

### Rotas de Idioma Não Funcionam

- Verifique se `middleware.ts` está na raiz do projeto
- Confirme que `i18n.ts` está configurado corretamente
- Verifique se todos os arquivos de tradução existem

### Erro 404 em Produção

- Verifique se o build foi bem-sucedido
- Confirme que todas as rotas estão em `app/[locale]/`
- Verifique configuração de rewrites no `next.config.js` (se necessário)

## 📊 Monitoramento Pós-Deploy

Após o deploy, monitore:

1. **Performance:**
   - Use Google PageSpeed Insights
   - Verifique Lighthouse scores
   - Monitore Core Web Vitals

2. **Analytics:**
   - Configure Google Analytics (se necessário)
   - Monitore erros no console do navegador

3. **SEO:**
   - Verifique sitemap: `https://higsshub.com/sitemap.xml`
   - Verifique robots.txt: `https://higsshub.com/robots.txt`
   - Teste com Google Search Console

## 🔄 Deploy Contínuo

Para deploy automático a cada push:

1. **Vercel/Netlify:** Conecte o repositório Git (já configurado)
2. **Cada push na branch `main`/`master`** fará deploy automático
3. **Pull Requests** geram preview deployments automaticamente

## 📝 Checklist Final

Antes de considerar o deploy completo:

- [ ] Build local funciona sem erros
- [ ] Todas as rotas testadas em todos os idiomas
- [ ] Imagens carregam corretamente
- [ ] Formulários funcionam
- [ ] Links externos funcionam (WhatsApp, email)
- [ ] Responsividade verificada
- [ ] SEO configurado (sitemap, robots.txt)
- [ ] Domínio configurado e propagado
- [ ] SSL/HTTPS ativo
- [ ] Analytics configurado (opcional)
- [ ] Backup do código e conteúdo

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs do build no dashboard do provedor
2. Teste localmente com `npm run build && npm run start`
3. Verifique a documentação do Next.js: [nextjs.org/docs](https://nextjs.org/docs)
4. Verifique a documentação do next-intl: [next-intl-docs.vercel.app](https://next-intl-docs.vercel.app)

---

**Boa sorte com o deploy! 🚀**
