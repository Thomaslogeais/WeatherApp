# 🌤️ Météo App React

Une application météo moderne et responsive développée avec React et TypeScript, utilisant l'API OpenWeatherMap.

## ✨ Fonctionnalités

- 🔍 **Recherche de villes** : Recherchez la météo de n'importe quelle ville dans le monde
- 🌡️ **Météo actuelle** : Température, description, ressenti, humidité, vent et pression
- 📅 **Prévisions 5 jours** : Prévisions météorologiques détaillées
- ⭐ **Favoris** : Sauvegardez vos villes préférées pour un accès rapide
- 📱 **Design responsive** : Interface adaptée à tous les écrans
- 🎨 **Interface moderne** : Design élégant avec animations fluides
- 💾 **Stockage local** : Vos favoris sont sauvegardés localement

## 🚀 Installation

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

3. **Configurez votre clé API**
   
   a. Créez un compte gratuit sur [OpenWeatherMap](https://openweathermap.org/api)
   
   b. Obtenez votre clé API gratuite
   
   c. Copiez le fichier `.env.example` vers `.env`
   ```bash
   cp .env.example .env
   ```
   
   d. Ouvrez le fichier `.env` et remplacez `YOUR_API_KEY_HERE` par votre vraie clé API :
   ```
   REACT_APP_OPENWEATHER_API_KEY=votre_cle_api_ici
   ```

4. **Démarrez l'application**
   ```bash
   npm start
   ```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🛠️ Scripts disponibles

- `npm start` : Démarre l'application en mode développement
- `npm run build` : Compile l'application pour la production

## 📁 Structure du projet

```
src/
├── components/          # Composants React
│   ├── FavoritesList.tsx
│   ├── ForecastCard.tsx
│   ├── SearchBar.tsx
│   └── WeatherCard.tsx
├── hooks/              # Hooks personnalisés
│   └── useLocalStorage.ts
├── services/           # Services API
│   └── weatherService.ts
├── styles/             # Fichiers CSS
│   └── App.css
├── types/              # Types TypeScript
│   └── weather.ts
├── App.tsx             # Composant principal
└── index.tsx           # Point d'entrée
```

## 🎯 Utilisation

1. **Recherche** : Tapez le nom d'une ville dans la barre de recherche et appuyez sur Entrée
2. **Favoris** : Cliquez sur l'étoile pour ajouter/retirer une ville des favoris
3. **Navigation** : Cliquez sur une ville favorite pour afficher sa météo
4. **Prévisions** : Les prévisions 5 jours s'affichent automatiquement sous la météo actuelle
