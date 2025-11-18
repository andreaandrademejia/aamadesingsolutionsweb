// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	// ... Tus credenciales
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Exporta el módulo de autenticación (getAuth) si lo necesitas.
