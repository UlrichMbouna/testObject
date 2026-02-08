# 📦 Heyama – Test Technique Développeur

Ce projet est une application **full-stack** développée dans le cadre de l’examen technique Heyama.

Il met en œuvre :

* une **API REST NestJS**
* une base de données **MongoDB**
* un stockage d’images **S3 compatible (MinIO)**
* une communication **temps réel (Socket.IO)**
* une architecture **Dockerisée**

---

## 🧱 Architecture globale

```
Mobile App (React Native / Expo)
            |
            | REST + Socket.IO
            v
        Backend (NestJS)
            |
    ---------------------
    |                   |
 MongoDB            MinIO (S3)
 (Données)          (Images)
```

Toutes les applications (web et mobile) communiquent **exclusivement avec l’API**.

---

## ⚙️ Technologies utilisées

### Backend

* **NestJS**
* **TypeORM**
* **MongoDB**
* **Socket.IO**
* **AWS SDK (S3 compatible)**

### Infrastructure

* **Docker**
* **Docker Compose**
* **MinIO (stockage S3 local)**

---

## 🚀 Services Docker

Le projet utilise **3 services Docker** :

### 1️⃣ MongoDB

* Stockage des objets
* Authentification activée

### 2️⃣ MinIO (S3 local)

* Stockage des images
* Compatible AWS S3
* Interface web incluse

### 3️⃣ Backend NestJS

* API REST
* Upload images vers MinIO
* WebSocket temps réel

---

## ▶️ Lancement du projet

### Prérequis

* Docker
* Docker Compose
* Node.js (optionnel si tout est via Docker)

---

### Démarrage complet

À la racine du projet :

```bash
docker compose up --build
```

---

## 🌐 Ports exposés

| Service       | URL                                            |
| ------------- | ---------------------------------------------- |
| API Backend   | [http://localhost:3000](http://localhost:3000) |
| MongoDB       | localhost:27017                                |
| MinIO API     | [http://localhost:9000](http://localhost:9000) |
| MinIO Console | [http://localhost:9001](http://localhost:9001) |

---

## 🔐 Accès MinIO

Interface web :
👉 [http://localhost:9001](http://localhost:9001)

Identifiants :

```
Username: minioadmin
Password: minioadmin
```

⚠️ **Créer manuellement le bucket suivant** :

```
mon-bucket-local
```

---

## 📡 API – Endpoints principaux

### ➕ Créer un objet

```
POST /objects
```

**Body (multipart/form-data)** :

* `title` : string
* `description` : string
* `image` : file

---

### 📄 Lister les objets

```
GET /objects
```

---

### 🔍 Obtenir un objet

```
GET /objects/:id
```

---

### 🗑️ Supprimer un objet

```
DELETE /objects/:id
```

➡️ Supprime :

* l’entrée MongoDB
* l’image dans MinIO

---

## 🔄 Temps réel (Socket.IO)

Lorsqu’un objet est :

* créé
* supprimé

➡️ un événement est émis via **WebSocket**
➡️ toutes les applications connectées sont mises à jour instantanément.

---

## 📦 Variables d’environnement utilisées

```env
MONGO_URI=mongodb://root:example@mongodb:27017/mydb?authSource=admin

S3_ENDPOINT=http://minio:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=mon-bucket-local
S3_REGION=us-east-1
```

---

## 🧪 Développement

Le backend est lancé en mode **watch** :

```bash
npm run start:dev
```

Le code est monté dans le conteneur via un volume Docker.

---

## ✅ Objectifs couverts

✔ CRUD complet
✔ Upload image S3
✔ Suppression image + DB
✔ Temps réel Socket.IO
✔ Architecture modulaire
✔ Dockerisation complète

---

## ⭐ Bonus possibles

* Validation DTO
* Pagination
* Authentification
* Recherche
* Tests unitaires
* CI GitHub Actions

---

## 👨‍💻 Auteur

Projet réalisé dans le cadre du **test technique Heyama**.
Le code est volontairement clair, structuré et orienté production.

