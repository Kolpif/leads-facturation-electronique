# 🚀 Landing Page - Facturation Électronique 2026

Landing page professionnelle pour la génération de leads qualifiés dans le secteur de la facturation électronique B2B.

## 📋 Caractéristiques

### ✨ Fonctionnalités Principales
- **Quiz de Qualification** : 5 questions ciblées pour qualifier les prospects
- **Validation SIREN** : Vérification automatique via algorithme de Luhn
- **Lead Scoring** : Attribution automatique de score (Bronze, Silver, Gold, Platinum)
- **Design Fortune 500** : Interface moderne et professionnelle
- **Responsive** : Optimisé mobile, tablette et desktop
- **SEO Optimisé** : Meta tags, structure sémantique
- **Performance** : Next.js 14, chargement ultra-rapide

### 🎯 Lead Tiers & Pricing
| Tier | Score | Prix Estimé | Caractéristiques |
|------|-------|-------------|------------------|
| **Bronze** | 0-39 | 30€ | Auto-entrepreneurs, faible volume |
| **Silver** | 40-59 | 65€ | TPE, volume moyen |
| **Gold** | 60-79 | 110€ | PME, volume élevé, urgent |
| **Platinum** | 80-100 | 180€ | ETI/GE, très urgent, CA élevé |

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : TailwindCSS + Custom Design System
- **UI Components** : Shadcn/ui + Lucide Icons
- **Animations** : Framer Motion
- **API** : Next.js API Routes
- **Validation** : Custom validators (SIREN, email, phone)

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation Locale

\`\`\`bash
# 1. Cloner le repository
cd leads-facturation-electronique

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev

# 4. Ouvrir http://localhost:3000
\`\`\`

## 🚀 Déploiement

### Option 1 : Vercel (Recommandé - Meilleur pour SEO)

\`\`\`bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel --prod
\`\`\`

**Avantages Vercel :**
- ✅ Déploiement instantané
- ✅ SSL automatique
- ✅ CDN global
- ✅ Excellent pour SEO (Edge Network)
- ✅ Analytics inclus
- ✅ Zero configuration

**Via Interface Web :**
1. Aller sur [vercel.com](https://vercel.com)
2. Importer le repository GitHub
3. Vercel détecte automatiquement Next.js
4. Cliquer sur "Deploy"

### Option 2 : Google Cloud Run

\`\`\`bash
# 1. Créer Dockerfile
# (voir section Dockerfile ci-dessous)

# 2. Build l'image
docker build -t leads-efacture .

# 3. Tag pour GCR
docker tag leads-efacture gcr.io/[PROJECT-ID]/leads-efacture

# 4. Push vers GCR
docker push gcr.io/[PROJECT-ID]/leads-efacture

# 5. Déployer sur Cloud Run
gcloud run deploy leads-efacture \
  --image gcr.io/[PROJECT-ID]/leads-efacture \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated
\`\`\`

### Option 3 : Wix (Non Recommandé)

⚠️ **Wix n'est PAS compatible avec Next.js !**

Wix ne supporte que :
- HTML/CSS/JavaScript statique
- Wix Velo (leur propre framework)

**Alternative si vous voulez absolument utiliser Wix :**
1. Exporter le site en HTML statique : `npm run build && npm run export`
2. Télécharger le dossier `out/`
3. Héberger sur Wix comme site statique

**MAIS : Vous perdrez :**
- ❌ API Routes (validation SIREN, soumission leads)
- ❌ Server-side rendering
- ❌ Performance optimale
- ❌ SEO optimal

## 📁 Structure du Projet

\`\`\`
leads-facturation-electronique/
├── app/
│   ├── api/
│   │   ├── validate-siren/
│   │   │   └── route.ts          # API validation SIREN
│   │   └── submit-lead/
│   │       └── route.ts           # API soumission leads
│   ├── globals.css                # Styles globaux
│   ├── layout.tsx                 # Layout principal
│   └── page.tsx                   # Page d'accueil
│
├── components/
│   ├── ui/
│   │   ├── button.tsx             # Composant Button
│   │   ├── card.tsx               # Composant Card
│   │   └── input.tsx              # Composant Input
│   └── QuizForm.tsx               # Quiz de qualification
│
├── lib/
│   └── utils.ts                   # Utilitaires (validation, etc.)
│
├── data/
│   └── leads.json                 # Stockage leads (dev only)
│
└── public/                        # Assets statiques
\`\`\`

## 🔧 Configuration

### Variables d'Environnement (Optionnel)

Créer `.env.local` :

\`\`\`bash
# API INSEE (pour validation SIREN en production)
INSEE_API_KEY=your_insee_api_key

# Base de données (en production)
DATABASE_URL=postgresql://...

# Email (pour notifications)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your@email.com
SMTP_PASS=your_password

# Webhook pour CRM
WEBHOOK_URL=https://your-crm.com/webhook
\`\`\`

## 📊 Suivi des Leads

### Format JSON des Leads

Les leads sont sauvegardés dans `data/leads.json` :

\`\`\`json
{
  "id": "LEAD-1234567890-abc123",
  "companySize": "pme",
  "sector": "btp",
  "invoicesPerMonth": "50-200",
  "currentSoftware": "sage",
  "timeline": "urgent",
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean.dupont@example.com",
  "phone": "0601020304",
  "companyName": "Entreprise XYZ",
  "siren": "123456789",
  "ca": "1M-10M",
  "score": 75,
  "tier": "Gold",
  "estimatedValue": 110,
  "createdAt": "2026-01-18T10:30:00.000Z",
  "status": "new"
}
\`\`\`

### Intégration CRM (Production)

Pour envoyer automatiquement les leads vers votre CRM :

**1. HubSpot :**
\`\`\`typescript
// Dans app/api/submit-lead/route.ts
await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.HUBSPOT_API_KEY}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    properties: {
      firstname: lead.firstName,
      lastname: lead.lastName,
      email: lead.email,
      // ...
    }
  })
})
\`\`\`

**2. Salesforce, Pipedrive, etc. :** Même principe avec leur API respective.

## 🎨 Personnalisation

### Couleurs & Branding

Modifier dans `tailwind.config.js` :

\`\`\`javascript
colors: {
  primary: {
    // Votre palette principale
    500: '#0ea5e9',
    600: '#0284c7',
    // ...
  }
}
\`\`\`

### Textes & Contenus

Modifier directement dans `app/page.tsx` et `components/QuizForm.tsx`

## 📈 Analytics & Tracking

### Google Analytics

Ajouter dans `app/layout.tsx` :

\`\`\`tsx
import Script from 'next/script'

// Dans le <head>
<Script
  src={\`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX\`}
  strategy="afterInteractive"
/>
\`\`\`

### Meta Pixel (Facebook)

Idem, ajouter le script Facebook Pixel.

## 🔒 Sécurité

- ✅ Validation côté client ET serveur
- ✅ Rate limiting (à ajouter en production)
- ✅ CORS configuré
- ✅ Sanitization des inputs
- ✅ Protection CSRF (Next.js intégré)

## 📱 SEO & Performance

### Optimisations SEO
- ✅ Meta tags optimisés
- ✅ Structure HTML sémantique
- ✅ Sitemap (à générer)
- ✅ robots.txt
- ✅ Open Graph tags
- ✅ Schema.org markup (à ajouter)

### Performance
- ✅ Next.js Image Optimization
- ✅ Code Splitting automatique
- ✅ Lazy Loading
- ✅ CSS optimisé (TailwindCSS purge)
- ✅ Bundle size optimisé

## 🐛 Troubleshooting

### "Module not found"
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Port 3000 déjà utilisé
\`\`\`bash
# Utiliser un autre port
npm run dev -- -p 3001
\`\`\`

### Build errors
\`\`\`bash
# Clean build
rm -rf .next
npm run build
\`\`\`

## 📞 Support

Pour toute question :
- 📧 Email : support@votre-domaine.com
- 📱 Téléphone : 01 XX XX XX XX

## 📄 License

MIT © 2026

---

**Développé avec ❤️ pour la révolution de la facturation électronique**
\`\`\`
