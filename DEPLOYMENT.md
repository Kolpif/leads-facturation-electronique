# 🚀 Guide de Déploiement Rapide

## Option 1 : Vercel (RECOMMANDÉ - 5 minutes)

### Pourquoi Vercel ?
- ✅ **Déploiement le plus rapide** (littéralement 2 clics)
- ✅ **Meilleur SEO** (Edge Network global)
- ✅ **SSL automatique** + CDN
- ✅ **Zero configuration** (détection automatique Next.js)
- ✅ **Plan gratuit généreux** (100GB bande passante)
- ✅ **Analytics inclus**

### Étapes

**Via Interface Web (Le plus simple) :**

1. Va sur [vercel.com](https://vercel.com)
2. Connecte ton compte GitHub
3. Clique "New Project"
4. Importe le repository `leads-facturation-electronique`
5. Vercel détecte automatiquement Next.js
6. Clique "Deploy"
7. **C'EST FAIT !** 🎉

Ton site sera live sur : `https://ton-projet.vercel.app`

**Via CLI :**

\`\`\`bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Déployer
cd leads-facturation-electronique
vercel --prod

# C'est tout !
\`\`\`

### Domaine Personnalisé

1. Dans le dashboard Vercel → Settings → Domains
2. Ajoute ton domaine (ex: `facture-electronique-2026.fr`)
3. Configure les DNS selon les instructions
4. SSL automatique en 1 minute ✅

---

## Option 2 : Google Cloud Run (15-20 minutes)

### Prérequis
- Compte Google Cloud Platform
- `gcloud` CLI installé
- Docker installé

### Étapes Complètes

**1. Setup Google Cloud**

\`\`\`bash
# Login
gcloud auth login

# Créer un projet (ou utiliser existant)
gcloud projects create leads-efacture-2026 --name="Leads E-Facture"

# Définir le projet actif
gcloud config set project leads-efacture-2026

# Activer les APIs nécessaires
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
\`\`\`

**2. Build & Deploy**

\`\`\`bash
# Aller dans le dossier
cd leads-facturation-electronique

# Build avec Cloud Build (recommandé)
gcloud builds submit --tag gcr.io/leads-efacture-2026/leads-app

# OU Build local puis push
docker build -t gcr.io/leads-efacture-2026/leads-app .
docker push gcr.io/leads-efacture-2026/leads-app

# Déployer sur Cloud Run
gcloud run deploy leads-app \
  --image gcr.io/leads-efacture-2026/leads-app \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10
\`\`\`

**3. Configuration domaine personnalisé**

\`\`\`bash
# Mapper ton domaine
gcloud run services add-iam-policy-binding leads-app \
  --region=europe-west1 \
  --member="allUsers" \
  --role="roles/run.invoker"

# Puis dans Cloud Console : Cloud Run → Domain Mappings
\`\`\`

### Coûts Google Cloud Run

**Plan de Pricing :**
- Premier million de requêtes : **GRATUIT**
- Après : ~0,40€ par million de requêtes
- Mémoire : ~0,0025€ par GB-heure

**Estimation pour 10K visiteurs/mois :**
- ~50K requêtes (avec assets)
- Coût : **~0€ (dans le free tier)**

---

## Option 3 : Netlify (Alternative à Vercel)

\`\`\`bash
# 1. Installer Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Build
npm run build

# 4. Deploy
netlify deploy --prod
\`\`\`

---

## ⚠️ Ce qui NE marche PAS

### Wix
❌ **Wix ne supporte PAS Next.js !**

Wix ne permet que :
- HTML/CSS/JS statique
- Leur framework propriétaire (Wix Velo)

**Impossible d'avoir :**
- API Routes (validation SIREN, soumission leads)
- Server-side rendering
- Performance Next.js

**Si tu veux ABSOLUMENT utiliser Wix :**
Tu devras recoder tout en Wix Velo (= tout refaire from scratch).

---

## 📊 Comparaison Rapide

| Critère | Vercel | Cloud Run | Netlify | Wix |
|---------|--------|-----------|---------|-----|
| **Setup** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ |
| **SEO** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Prix** | Gratuit++ | Gratuit+ | Gratuit++ | 15-30€/mois |
| **Facilité** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ |

**Recommandation finale : VERCEL** 🏆

---

## 🔥 Quick Start (1 minute)

\`\`\`bash
# La méthode la plus rapide au monde :

npm install -g vercel
cd leads-facturation-electronique
vercel --prod

# Appuie sur "Entrée" 3 fois
# DONE ! 🎉
\`\`\`

---

## 📞 Aide ?

Si tu bloques :
1. Regarde les logs dans le dashboard de la plateforme
2. Vérifie que toutes les dépendances sont installées
3. Essaie `npm run build` localement d'abord

**90% des problèmes :** `rm -rf node_modules && npm install`
