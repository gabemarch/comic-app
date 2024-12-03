'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ComicSchema = Yup.object().shape({
  originalTitle: Yup.string().required('Az eredeti cím megadása kötelező.'),
  translatedTitle: Yup.string(),
  publisher: Yup.string().required('A kiadó megadása kötelező.'),
  hunPublisher: Yup.string(),
  language: Yup.string().required('A nyelv megadása kötelező.'),
  pageNumber: Yup.number().required('Az oldalszám megadása kötelező.'),
  genre: Yup.array()
    .of(Yup.string().required())
    .required('Legalább egy műfaj megadása kötelező.'),
  releaseYear: Yup.number(),
  writer: Yup.array()
    .of(Yup.string().required())
    .required('Legalább egy író megadása kötelező.'),
  illustrations: Yup.array()
    .of(Yup.string().required())
    .required('Legalább egy rajzoló megadása kötelező.'),
  colorist: Yup.array().of(Yup.string()),
  translator: Yup.array().of(Yup.string()),
  coverImage: Yup.mixed().required('A borítókép feltöltése kötelező.'),
  series: Yup.string()
});

const ComicForm = () => {
  const initialValues = {
    originalTitle: '',
    translatedTitle: '',
    publisher: '',
    hunPublisher: '',
    language: '',
    pageNumber: 0,
    genre: [],
    releaseYear: '',
    writer: [],
    illustrations: [],
    colorist: [],
    translator: [],
    series: '',
    hunEditor: '',
    originalReleaseYear: 0,
    coverImage: null,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        const value = (values as any)[key];
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else {
          formData.append(key, value);
        }

      });

      const response = await fetch('http://localhost:5000/api/comics', {
        mode: 'cors',
        method: 'POST',
        body: formData,
      });

      console.log(response)

      if (response.ok) {
        alert('A képregény sikeresen feltöltve!');
      } else {
        alert('Hiba történt a feltöltés során.');
      }
    } catch {
      alert('Hálózati hiba történt.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={ComicSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="space-y-4">
          {/* Eredeti cím */}
          <div>
            <label htmlFor="originalTitle" className="block text-sm font-medium text-gray-700">
              Eredeti cím*
            </label>
            <Field
              type="text"
              name="originalTitle"
              id="originalTitle"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage name="originalTitle" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="translatedTitle" className="block text-sm font-medium text-gray-700">
              Magyar cím
            </label>
            <Field
              type="text"
              name="translatedTitle"
              id="translatedTitle"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label htmlFor="series" className="block text-sm font-medium text-gray-700">
              Sorozat
            </label>
            <Field
              type="text"
              name="series"
              id="series"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage name="series" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">
              Eredeti Kiadó*
            </label>
            <Field
              type="text"
              name="publisher"
              id="publisher"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage name="publisher" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          
          <div>
            <label htmlFor="editor" className="block text-sm font-medium text-gray-700">
              Magyar kiadás szerkesztője
            </label>
            <Field
              type="text"
              name="editor"
              id="editor"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage name="editor" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* További mezők */}
          {[
            { name: 'hunPublisher', label: 'Magyar kiadó' },
            { name: 'language', label: 'Nyelv' },
            { name: 'pageNumber', label: 'Oldalszám', type: 'number' },
            { name: 'originalReleaseYear', label: 'Első Megjelenés', type: 'number' },
            { name: 'releaseYear', label: 'Megjelenési év', type: 'number' },
          ].map(({ name, label, type = 'text' }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <Field
                type={type}
                name={name}
                id={name}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}

          {/* Többértékű mezők */}
          {[
            { name: 'genre', label: 'Műfajok*' },
            { name: 'writer', label: 'Író(k)*' },
            { name: 'illustrations', label: 'Rajzoló(k)*' },
            { name: 'colorist', label: 'Színező(k)' },
            { name: 'translator', label: 'Fordító(k)' },
          ].map(({ name, label }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <Field
                type="text"
                name={name}
                id={name}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <p className="text-sm text-gray-500 mt-1">Vesszővel elválasztva (pl. &quot;Akció, Sci-Fi&quot;)</p>
            </div>
          ))}

          {/* Borítókép */}
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
              Borítókép
            </label>
            <input
              type="file"
              name="coverImage"
              id="coverImage"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                setFieldValue('coverImage', file);
              }}
              className="mt-1 block w-full"
            />
            <ErrorMessage name="coverImage" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Submit gomb */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isSubmitting ? 'Feltöltés...' : 'Feltöltés'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ComicForm;
