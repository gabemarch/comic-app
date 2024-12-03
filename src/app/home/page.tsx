"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Comic } from "@typings/comics/comics";
import ComicItem from "@components/ComicItem/ComicItem";

const Home = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/comics");
        setComics(res.data);
      } catch (error) {
        console.error("Hiba történt a képregények betöltésekor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Képregények betöltése...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Képregények</h1>
      {comics.length === 0 ? (
        <p className="text-gray-600">Jelenleg nincsenek képregények az adatbázisban.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comics.map((comic) => (
            <ComicItem
              key={comic._id}
              _id={comic._id}
              originalTitle={comic.originalTitle}
              coverImage={comic.coverImage}
              translatedTitle={comic.translatedTitle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
