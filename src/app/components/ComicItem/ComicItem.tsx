"use client";

import Button from "@components/Button";
import { Comic } from "@typings/comics/comics";
import React from "react";

const ComicItem = (comic: Comic) => {
  return (
    <div key={comic._id} className="border rounded-lg overflow-hidden shadow-lg bg-white">
    {comic.coverImage && (
      <img
        src={`http://localhost:5000/api/images/cover/${comic.coverImage}`}
        alt={comic.originalTitle}
        className="w-full h-48 object-cover"
      />
    )}
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{comic.originalTitle}</h2>
      {comic.translatedTitle && (
        <p className="text-gray-600 mb-2">{comic.translatedTitle}</p>
      )}
    </div>
    <Button buttonText="Bővebben" onClick={function (): void {
        throw new Error("Function not implemented.");
      } } />
  </div>
  )
}

export default ComicItem;