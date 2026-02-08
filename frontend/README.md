# README - Application Web Heyama (Next.js)

## 📋 Description
Application web pour gérer des objets avec upload d'images et mise à jour en temps réel.

## 🚀 Installation
```bash
npm install
```

## ⚙️ Configuration
Créez `.env.local` :
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## ▶️ Lancement
```bash
npm run dev
```
Ouvrez http://localhost:3000

## 📁 Structure
```
app/
├── page.tsx          # Page principale
├── objects/[id]/     # Détails objet
├── components/       # Composants
├── contexts/         # Contexte WebSocket
└── lib/             # Configuration API
```

## 🔗 Backend requis
- API NestJS sur http://localhost:3001
- MongoDB connecté
- Socket.IO activé

## ✅ Fonctionnalités
- ✅ Liste des objets
- ✅ Création avec upload d'image
- ✅ Suppression
- ✅ Mise à jour temps réel
- ✅ Design responsive

```

# README - Application Mobile Heyama (React Native + Expo)

## 📱 Description
Application mobile pour gérer des objets avec caméra/galerie et mise à jour en temps réel.

## 🚀 Installation
```bash
npm install
npx expo install
```

## ⚙️ Configuration
Modifiez l'URL API dans `src/lib/api.ts` :
```javascript
const API_BASE_URL = 'http://VOTRE_IP:3001/api';
```

## ▶️ Lancement
```bash
npm start
```
Scannez le QR code avec l'app Expo Go

## 📁 Structure
```
src/
├── screens/          # Écrans
├── components/       # Composants réutilisables
├── contexts/         # Contexte objets + WebSocket
├── navigation/       # Navigation
└── lib/             # Configuration API
```

## 📱 Compatibilité
- iOS (Expo Go / Build)
- Android (Expo Go / Build)
- Web (expo-web)

## 📸 Permissions
- Caméra
- Galerie photos
- Stockage local

## ✅ Fonctionnalités
- ✅ Liste des objets
- ✅ Création avec photo/caméra
- ✅ Suppression
- ✅ Mise à jour temps réel
- ✅ Paramètres et cache
- ✅ Mode hors ligne partiel

## 🔗 Backend requis
Même backend que l'application web :
- API NestJS sur votre IP locale:3001
- Remplacer localhost par votre IP pour Android

