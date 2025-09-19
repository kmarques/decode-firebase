# Firebase — Aperçu rapide

Firebase est une plateforme mobile et web développée par Google qui fournit des services backend prêts à l'emploi pour créer, tester et faire évoluer des applications. Elle regroupe une suite de produits (base de données en temps réel, Firestore, authentification, stockage, fonctions serverless, hébergement, analytics, etc.) conçus pour accélérer le développement et réduire la maintenance d'infrastructure.

Principaux services
- **Authentication**: gestion des utilisateurs (email/mot de passe, providers OAuth, comptes anonymes).
- **Cloud Firestore**: base de données NoSQL scalable, orientée documents, adaptée aux applications web et mobiles.
- **Realtime Database**: base de données JSON en temps réel (pour des cas nécessitant une synchronisation instantanée simple).
- **Cloud Storage**: stockage d'objets (images, fichiers) avec règles de sécurité.
- **Cloud Functions**: fonctions serverless exécutées en réponse à des événements (auth, base de données, HTTP, etc.).
- **Hosting**: hébergement de sites statiques et single-page apps, distribution via CDN.
- **Remote Config & Analytics**: outils pour personnaliser le comportement des apps et analyser l'usage.

Cas d'utilisation typiques
- Prototypage rapide d'une application web ou mobile.
- Applications nécessitant synchronisation en temps réel ou mise à l'échelle automatique.
- Déchargement de la logique backend vers des fonctions serverless gérées.

Rapide démarrage (web)

1. Installer le SDK JavaScript (exemple avec npm):

```bash
npm install firebase
```

2. Initialiser Firebase dans votre app (exemple minimal):

```js
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJET.firebaseapp.com",
  projectId: "VOTRE_PROJET",
}

const app = initializeApp(firebaseConfig)
```

3. Pour déployer (exigences: `firebase-tools` et projet Firebase configuré) :

```bash
npm install -g firebase-tools
firebase login
firebase init    # choisir Hosting / Functions / Firestore selon le besoin
firebase deploy
```

Notes spécifiques à ce dépôt
- Ce projet contient un dossier `functions/` pour les fonctions Cloud et un dossier `public/` pour les fichiers destinés à l'hébergement. Le code source front se trouve dans `src/`.
- Vérifiez `config/firebase.js` pour la configuration d'initialisation utilisée par l'application.

Ressources
- Documentation officielle : https://firebase.google.com
- Guide pour démarrer (Web) : https://firebase.google.com/docs/web/setup

Licence et contributions
- Ce fichier README est une synthèse informative. Pour les contributions au projet, suivez les instructions et conventions propres au dépôt.

Exemples — Authentication (JavaScript)

Voici quelques exemples courants d'utilisation de Firebase Authentication avec le SDK JavaScript modulaires (v9+). On suppose que l'application `app` est déjà initialisée avec `initializeApp`.

1) Initialisation de l'authentification

```js
import { getAuth } from 'firebase/auth'

const auth = getAuth(app)
```

2) Créer un compte (email / mot de passe)

```js
import { createUserWithEmailAndPassword } from 'firebase/auth'

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user
    // utilisateur créé
  })
  .catch((error) => {
    console.error(error.code, error.message)
  })
```

3) Connexion (email / mot de passe)

```js
import { signInWithEmailAndPassword } from 'firebase/auth'

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user
    // connecté
  })
  .catch((error) => {
    console.error(error.code, error.message)
  })
```

4) Déconnexion

```js
import { signOut } from 'firebase/auth'

signOut(auth).then(() => {
  // utilisateur déconnecté
})
.catch((error) => {
  console.error(error)
})
```

5) Connexion via Google (popup)

```js
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const provider = new GoogleAuthProvider()
signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user
    // informations du compte Google
  })
  .catch((error) => {
    console.error(error)
  })
```

6) Observer l'état d'authentification (utile pour UI)

```js
import { onAuthStateChanged } from 'firebase/auth'

onAuthStateChanged(auth, (user) => {
  if (user) {
    // utilisateur connecté
  } else {
    // utilisateur déconnecté
  }
})
```

7) Réinitialisation du mot de passe

```js
import { sendPasswordResetEmail } from 'firebase/auth'

sendPasswordResetEmail(auth, email)
  .then(() => {
    // email de réinitialisation envoyé
  })
  .catch((error) => {
    console.error(error)
  })
```

Pour des cas avancés (gestion d'erreurs fines, vérification d'email, liens de connexion, accounts linking), référez-vous à la documentation officielle `https://firebase.google.com/docs/auth`.
