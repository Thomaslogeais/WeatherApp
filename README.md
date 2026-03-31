#  Météo App React

Une application météo moderne et responsive développée avec React et TypeScript, utilisant l'API OpenWeatherMap.

##  Fonctionnalités

-  **Recherche de villes** : Recherchez la météo de n'importe quelle ville dans le monde
-  **Météo actuelle** : Température, description, ressenti, humidité, vent et pression
-  **Prévisions 5 jours** : Prévisions météorologiques détaillées
-  **Favoris** : Sauvegardez vos villes préférées pour un accès rapide
-  **Chatbot IA météo** : Discutez de la météo avec un assistant IA intelligent (Google Gemini)
-  **Design responsive** : Interface adaptée à tous les écrans
-  **Interface moderne** : Design élégant avec animations fluides
-  **Stockage local** : Vos favoris sont sauvegardés localement

##  Installation

### Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Une clé API OpenWeatherMap (gratuite)

### Étapes d'installation

1. **Clonez le projet**
   ```bash
   git clone <url-du-repo>
   cd weather-app-react
   ```

2. **Installez les dépendances**
   ```bash
   npm install
   ```

3. **Configurez vos clés API**
   
   a. **OpenWeatherMap** (pour les données météo) :
      - Créez un compte gratuit sur [OpenWeatherMap](https://openweathermap.org/api)
      - Obtenez votre clé API gratuite
   
   b. **Google Gemini** (pour le chatbot IA) :
      - Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
      - Connectez-vous avec votre compte Google
      - Créez une clé API gratuite
   
   c. Copiez le fichier `.env.example` vers `.env`
   ```bash
   cp .env.example .env
   ```
   
   d. Ouvrez le fichier `.env` et ajoutez vos clés API :
   ```
   REACT_APP_OPENWEATHER_API_KEY=votre_cle_openweather_ici
   REACT_APP_GEMINI_API_KEY=votre_cle_gemini_ici
   ```

4. **Démarrez l'application**
   ```bash
   npm start
   ```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

##  Scripts disponibles

- `npm start` : Démarre l'application en mode développement
- `npm run build` : Compile l'application pour la production

##  Structure du projet

```
src/
├── components/          # Composants React
│   ├── ChatBox.tsx     # 🆕 Chatbot IA météo
│   ├── FavoritesList.tsx
│   ├── ForecastCard.tsx
│   ├── SearchBar.tsx
│   └── WeatherCard.tsx
├── hooks/              # Hooks personnalisés
│   └── useLocalStorage.ts
├── services/           # Services API
│   ├── aiService.ts    # 🆕 Service Google Gemini
│   └── weatherService.ts
├── styles/             # Fichiers CSS
│   ├── App.css
│   └── ChatBox.css     # 🆕 Styles du chat
├── types/              # Types TypeScript
│   ├── chat.ts         # 🆕 Types pour le chat
│   └── weather.ts
├── App.tsx             # Composant principal
└── index.tsx           # Point d'entrée
```

##  Utilisation

1. **Recherche** : Tapez le nom d'une ville dans la barre de recherche et appuyez sur Entrée
2. **Favoris** : Cliquez sur l'étoile pour ajouter/retirer une ville des favoris
3. **Navigation** : Cliquez sur une ville favorite pour afficher sa météo
4. **Prévisions** : Les prévisions 5 jours s'affichent automatiquement sous la météo actuelle
5. **Chatbot IA** : Cliquez sur le bouton flottant en bas à droite pour discuter de la météo avec l'assistant IA

##  Assistant Météo IA

L'application intègre un chatbot intelligent propulsé par Google Gemini qui vous permet de :

- Poser des questions sur la météo actuelle
- Obtenir des informations sur les prévisions
- Discuter uniquement de sujets météorologiques (l'IA refuse poliment les autres sujets)

**Exemples de questions** :
- "Va-t-il pleuvoir demain ?"
- "Quelle est la température ressentie ?"
- "Dois-je prendre un parapluie ?"

##  Technologies utilisées

- **React 19** : Framework frontend
- **TypeScript** : Typage statique
- **OpenWeatherMap API** : Données météorologiques
- **Google Gemini API** : Intelligence artificielle conversationnelle
- **CSS3** : Styles et animations
- **Local Storage** : Persistence des favoris
