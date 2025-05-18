import { cert, initializeApp } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";

const serviceAccount = JSON.parse(process.env.FIREBASE_AUTH_SERVICE_ACCOUNT!);

initializeApp({
  credential: cert(serviceAccount),
});

export const getAuth = getAdminAuth;
