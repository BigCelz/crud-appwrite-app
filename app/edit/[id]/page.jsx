"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditPage({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    term: "",
    interpretation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  // unwrap params
  useEffect(() => {
    (async () => {
      const resolvedParams = await params; // params is a Promise
      setId(resolvedParams.id);
    })();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/interpretations/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch entry");
        }
        const data = await response.json();
        setFormData({
          term: data.interpretation.term,
          interpretation: data.interpretation.interpretation,
        });
      } catch (error) {
        setError("Failed to load entry");
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.term || !formData.interpretation) {
      setError("Please fill in all the fields");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/interpretations/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update entry");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Something went wrong, please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Edit Clinical Entry</h2>

      <form className="flex gap-3 flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="term"
          placeholder="Quiz"
          className="py-1 px-4 border rounded-md"
          value={formData.term}
          onChange={handleInputChange}
        />

        <textarea
          name="interpretation"
          placeholder="Answer"
          className="py-1 px-4 border rounded-md resize-none h-60"
          value={formData.interpretation}
          onChange={handleInputChange}
        ></textarea>

        <button
          className="bg-black hover:bg-gray-900 text-white mt-5 px-4 py-1 rounded cursor-pointer whitespace-nowrap"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Updating" : "Update entry"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

