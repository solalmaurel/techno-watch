import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function saveScript(script: { pubDate: string; summary: string }) {
  const docRef = await addDoc(collection(db, "scripts"), {
    ...script,
    savedAt: new Date().toISOString(),
  });

  return docRef.id;
}
