import { collection, getDocs, query, limit, where } from "firebase/firestore";
import { db } from "@/config/firebase";

// Récupère tous les briefs du jour (format YYYY-MM-DD)
// export async function getTodayBrief() {
//   const today = new Date().toISOString().slice(0, 10);
//   const briefsRef = collection(db, "briefs");
//   const q = query(
//     briefsRef,
//     where("savedAt", ">=", today),
//     where("savedAt", "<", today + "T23:59:59")
//   );
//   const snapshot = await getDocs(q);
//   if (!snapshot.empty) {
//     return snapshot.docs[0].data();
//   }
//   return null;
// }

// Récupère tous les articles du jour
export async function getTodayArticles() {
  const today = new Date().toISOString().slice(0, 10);
  const briefsRef = collection(db, "briefs");
  const q = query(
    briefsRef,
    where("savedAt", ">=", today),
    where("savedAt", "<", today + "T23:59:59")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}

// Récupère le dernier brief (pour l'affichage sur la home)
// export async function getLastBrief() {
//   const briefsRef = collection(db, "briefs");
//   const q = query(briefsRef, orderBy("pubDate", "desc"), limit(1));
//   const snapshot = await getDocs(q);
//   if (!snapshot.empty) {
//     return snapshot.docs[0].data();
//   }
//   return null;
// }

// Récupère le script de podcast du jour
export async function getTodayScript() {
  const today = new Date().toISOString().slice(0, 10);
  const scriptsRef = collection(db, "scripts");
  const q = query(
    scriptsRef,
    where("pubDate", ">=", today),
    where("pubDate", "<", today + "T23:59:59"),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return snapshot.docs[0].data();
  }
  return null;
}
