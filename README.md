# 🐦 Bird Runner

Un mini-jeu mobile en React Native (Expo) où un oiseau avance automatiquement et vous le contrôlez en le déplaçant à gauche et à droite avec deux boutons.

## 📸 Captures d'écran

| Écran d'accueil | Jeu | Game Over |
|-----------------|-----|-----------|
| ![Home](./screenshots/home.png) | ![Game](./screenshots/game.png) | ![GameOver](./screenshots/gameover.png) |

## 🎮 Gameplay

- **Objectif** : Survivre le plus longtemps possible en évitant les obstacles et en collectant la nourriture
- **Contrôles** : Deux boutons à l'écran (GAUCHE / DROITE) pour déplacer l'oiseau
- **Score** : +1 point par nourriture collectée
- **Difficulté** : La vitesse augmente progressivement

## 🚀 Installation et lancement

### Prérequis
- Node.js (v18+)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`) ou Expo Go app sur votre téléphone

### Installation

```bash
# Cloner le projet
git clone https://github.com/leoduriez/bird-runner.git
cd bird-runner

# Installer les dépendances
npm install

# Lancer le projet
npm start
```

### Lancement sur appareil/simulateur

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web
npm run web
```

Ou scannez le QR code avec l'application Expo Go sur votre téléphone.

## 🏗️ Architecture du projet

```
bird-runner/
├── App.tsx                 # Point d'entrée, gestion des états
├── assets/                 # Images et ressources
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
├── components/             # Composants réutilisables
│   ├── Bird.tsx           # Sprite de l'oiseau
│   ├── Obstacle.tsx       # Sprite des obstacles (arbres)
│   ├── Food.tsx           # Sprite de la nourriture (pommes)
│   ├── Controls.tsx       # Boutons GAUCHE/DROITE
│   ├── HUD.tsx            # Affichage du score
│   └── Background.tsx     # Fond animé avec nuages
├── constants/              # Configuration du jeu
│   └── gameConfig.ts      # Dimensions, vitesses, couleurs
├── screens/                # Écrans de l'application
│   ├── HomeScreen.tsx     # Écran d'accueil
│   ├── GameScreen.tsx     # Écran de jeu (game loop)
│   └── GameOverScreen.tsx # Écran de fin de partie
└── utils/                  # Fonctions utilitaires
    ├── collision.ts       # Détection de collisions AABB
    └── storage.ts         # AsyncStorage pour le meilleur score
```

## ⚙️ Choix techniques

### Framework
- **React Native avec Expo** : Développement rapide et cross-platform
- **TypeScript** : Typage statique pour une meilleure maintenabilité

### Bibliothèques
- **@react-native-async-storage/async-storage** : Persistance du meilleur score
- **expo-status-bar** : Gestion de la barre de statut

### Game Loop
- Boucle de jeu à 60 FPS avec `setInterval`
- Mise à jour continue des positions des entités
- Détection de collisions AABB (Axis-Aligned Bounding Box)

### Système de lanes
- 5 couloirs pour les obstacles et la nourriture
- Spawn contrôlé avec variation aléatoire
- Système anti-collision pour éviter les superpositions

### Stockage local
- Meilleur score sauvegardé via AsyncStorage
- Fonctionne 100% offline

## 🎨 Visuels

- **Oiseau** : Design simple avec corps, tête, bec, aile et queue
- **Obstacles** : Arbres stylisés (tronc + couronne)
- **Nourriture** : Pommes avec tige et reflet
- **Fond** : Ciel bleu avec nuages en parallaxe

## 📝 Règles de collision

- Chaque entité possède une hitbox rectangulaire
- Les hitbox sont légèrement réduites pour des collisions équitables
- Collision obstacle = Game Over
- Collision nourriture = +1 point

## 🎯 Fonctionnalités

- [x] Écran d'accueil avec titre et instructions
- [x] Contrôles tactiles (boutons GAUCHE/DROITE)
- [x] Obstacles avec spawn aléatoire
- [x] Nourriture à collecter
- [x] Score en temps réel
- [x] Difficulté progressive
- [x] Écran Game Over
- [x] Sauvegarde du meilleur score
- [x] Bouton Rejouer / Retour accueil

## 📄 Licence

MIT License
