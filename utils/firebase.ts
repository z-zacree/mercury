// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, AuthErrorCodes } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgdJ_xfTyVXQ0pTizcTJFMXJ7GkyjHzgc",
  authDomain: "m-ercury.firebaseapp.com",
  projectId: "m-ercury",
  storageBucket: "m-ercury.appspot.com",
  messagingSenderId: "713221396315",
  appId: "1:713221396315:web:f0a74217c0d8288c246c7e",
  measurementId: "G-2BKJ5GN2QV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const fs = getFirestore(app);
export const auth = getAuth(app);

export enum AuthErrorResponse {
  Default = "Attempt was unsuccessful. Please check your credentials and try again.",
  CredentialAlreadyInUse = "This email is connected to another service",
  EmailExists = "The email is already in use",
  UserDisabled = "Email has been disabled",
  NeedConfirmation = "This email is connected to another service",
}

export type AuthErrorCode = typeof AuthErrorCodes[keyof typeof AuthErrorCodes];
