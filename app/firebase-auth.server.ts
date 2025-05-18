import { cert, initializeApp } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import path from "path";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync(path.resolve("app/secrets/zkootie-auth-services-dev.json"), "utf8")
);

initializeApp({
  credential: cert(serviceAccount),
});

export const getAuth = getAdminAuth;
