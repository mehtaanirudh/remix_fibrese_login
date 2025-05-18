import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type { App } from "firebase-admin/app";

const serviceAccount = JSON.parse(process.env.FIREBASE_CONNECT_SERVICE_ACCOUNT!);

let app: App;

if (!getApps().some(app => app.name === "connect")) {
  app = initializeApp(
    {
      credential: cert(serviceAccount),
    },
    "connect" // unique name for the second app
  );
} else {
  app = getApps().find(app => app.name === "connect")!;
}

export const connectFirestore = getFirestore(app);
