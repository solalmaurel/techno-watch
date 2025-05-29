import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Brief } from "@/types";

export async function saveBrief(article: Brief) {
  const docRef = await addDoc(collection(db, "briefs"), {
    ...article,
    savedAt: new Date().toISOString(),
  });

  return docRef.id;
}
