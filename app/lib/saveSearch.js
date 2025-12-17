import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function saveSearch(uid, destination, interest, results) {
  if (!uid) return;

  await addDoc(collection(db, "users", uid, "history"), {
    destination,
    interest,
    createdAt: serverTimestamp(),
    results: results.slice(0, 3),
  });
}
