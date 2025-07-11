import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Firebaseの設定情報(環境変数を使って値を保存する）
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Firebase Emulatorに接続
// if (process.env.NODE_ENV !== "production") {
//   try {
//     // Firestoreエミュレータに接続（ホストマシンのIPアドレスとポート）
//     connectFirestoreEmulator(db, "localhost", 3000);

//     connectAuthEmulator(auth, "http://localhost:3000", {
//       disableWarnings: true,
//     });

//     console.log("Firebase Emulatorに接続しました");
//   } catch (error) {
//     console.error("Firebase Emulatorへの接続に失敗しました:", error);
//   }
// }

export { db, auth };
