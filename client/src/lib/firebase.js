import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";


const app = initializeApp({
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
});

export const auth = getAuth(app);

if (import.meta.env.VITE_DEV) {
    connectAuthEmulator(auth, import.meta.env.VITE_DEV_AUTH_EMULATOR_URL);
}