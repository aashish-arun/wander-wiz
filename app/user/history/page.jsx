"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useUser } from "../../context/userContext";
import HistoryCard from "../../components/historyCard";

export default function HistoryPage() {
  const { authUser, loading } = useUser();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!authUser) return;

    const loadHistory = async () => {
      const q = query(
        collection(db, "users", authUser.uid, "history"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);
      setHistory(
        snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    loadHistory();
  }, [authUser]);

  if (loading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Search History
      </h1>

      {history.length === 0 && (
        <p className="text-gray-400">No previous searches.</p>
      )}

      <div className="space-y-4">
        {history.map(item => (
          <HistoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
