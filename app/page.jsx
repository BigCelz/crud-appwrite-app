"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [interpretations, setInterpretations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterpretations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/interpretations");
        if (!response.ok) {
          throw new Error("Failed to fetch interpretations");
        }
        const data = await response.json();
        setInterpretations(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load interpretations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterpretations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/interpretations/${id}`, { method: "DELETE" });
      setInterpretations((prevInterpretations) =>
        prevInterpretations?.filter((i) => i.$id !== id)
      );
    } catch (error) {
      setError("Failed to delete interpretation");
    }
  };

  return (
    <div>
      {error && <p className="py-4 text-red-500">{error}</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : interpretations.length > 0 ? (
        interpretations.map((i) => (
          <div className="p-4 my-2 rounded-md border-b leading-8" key={i.$id}>
            <div className="font-bold">{i.term}</div>
            <div>{i.interpretation}</div>

            <div className="flex gap-4 mt-4 justify-end">
              <Link
                href={`/edit/${i.$id}`}
                className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest cursor-pointer"
              >
                Update
              </Link>

              <button
                onClick={() => handleDelete(i.$id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : null}
    </div>
  );
}
