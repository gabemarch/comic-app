'use client';

import React from 'react';
import ComicForm from '@components/ComicForm/ComicForm';

const NewComicPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Új Képregény Feltöltése</h1>
      <ComicForm />
    </div>
  );
};

export default NewComicPage;
