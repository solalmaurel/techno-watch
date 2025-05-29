# Techno Watch

Une application Next.js pour suivre l'actualité technologique via des flux RSS et générer des résumés automatiques.

## 🏗️ Structure du projet

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # Routes API
│   │   ├── brief/         # Génération des briefs quotidiens
│   │   └── podcast-script/ # Génération des scripts de podcast
│   ├── brief-du-jour/     # Page des briefs du jour
│   ├── pages/             # Pages additionnelles
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants React réutilisables
│   └── TwitterTimeline.tsx
├── lib/                   # Utilitaires et logique métier
│   ├── fetchFeeds.ts      # Récupération des flux RSS
│   ├── getBrief.ts        # Récupération des briefs depuis Firebase
│   ├── saveBrief.ts       # Sauvegarde des briefs
│   ├── saveScript.ts      # Sauvegarde des scripts
│   ├── select-articles.ts # Sélection d'articles via IA
│   ├── summarize.ts       # Résumé d'articles via IA
│   ├── summarize-local.ts # Résumé local (alternative)
│   └── write-podcast.ts   # Génération de scripts podcast
├── config/                # Configuration de l'application
│   ├── feeds.ts           # Configuration des flux RSS
│   └── firebase.ts        # Configuration Firebase
├── types/                 # Types TypeScript
│   └── index.ts           # Types principaux (Article, Brief, etc.)
└── scripts/               # Scripts utilitaires
    └── test-fetch.ts      # Test de récupération des flux
```

## 🚀 Fonctionnalités

- **Agrégation RSS** : Collecte automatique d'articles depuis plusieurs sources tech
- **Résumés IA** : Génération de résumés concis via OpenAI
- **Sélection intelligente** : Choix automatique des articles les plus pertinents
- **Scripts podcast** : Génération de scripts pour podcasts tech
- **Stockage Firebase** : Persistance des briefs et scripts

## 🛠️ Technologies

- **Next.js 15** avec App Router
- **TypeScript** pour le typage statique
- **Firebase Firestore** pour la base de données
- **OpenAI API** résumés et sélection
- **Tailwind CSS** pour le styling
- **RSS Parser** pour l'agrégation de contenu

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

Créez un fichier `.env.local` avec :

```env
OPENAI_API_KEY=your_openai_api_key
BRAVE_API_KEY=your_brave_search_api_key
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## 🏃‍♂️ Développement

```bash
npm run dev
```

## 📝 Scripts disponibles

- `npm run dev` : Démarre le serveur de développement
- `npm run build` : Build de production
- `npm run start` : Démarre le serveur de production
- `npm run lint` : Vérification du code

## 🔗 API Endpoints

- `GET /api/brief` : Récupère ou génère les briefs du jour
- `GET /api/podcast-script` : Récupère ou génère le script podcast du jour
- `POST /api/podcast-script` : Génère un script à partir de briefs fournis

## 🎯 Flux de données

1. **Collecte** : Les flux RSS sont récupérés depuis les sources configurées
2. **Sélection** : L'IA sélectionne les articles les plus pertinents
3. **Résumé** : Chaque article sélectionné est résumé par l'IA
4. **Stockage** : Les briefs sont sauvegardés dans Firebase
5. **Podcast** : Un script de podcast peut être généré à partir des briefs

## 🔧 Personnalisation

### Ajouter de nouveaux flux RSS

Modifiez le fichier `src/config/feeds.ts` :

```typescript
export const RSS_FEEDS: FeedConfig[] = [
  {
    url: "https://example.com/feed.xml",
    category: "Tech",
    description: "Description du flux",
  },
  // ...
];
```

### Modifier les prompts IA

Les prompts sont configurés dans :

- `src/lib/summarize.ts` pour les résumés
- `src/lib/select-articles.ts` pour la sélection
- `src/lib/write-podcast.ts` pour les scripts podcast
