"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Temario() {
  const [books, setBooks] = useState<{ name: string; url: string; imageUrl: string }[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("/api/books?bucket=temarioponte100");
      const data = await res.json();

      const booksWithImages = await Promise.all(
        data.books.map(async (book: { name: string; url: string }) => {

          const localImagePath = `/images/covers/${book.name.replace(".pdf", "")}.jpg`;
          console.log("imagen existe", book.name)
          // Verifica si la imagen existe localmente
          const imageExists = await fetch(localImagePath, { method: "HEAD" })
            .then((res) => res.ok)
            .catch(() => false);

          if (imageExists) {
            return { ...book, imageUrl: localImagePath };
          }

          const imageRes = await fetch(`/api/covers?bucket=coversponte100&file=${book.name}.jpg`);
          const imageData = await imageRes.json();
          return {
            ...book,
            imageUrl: imageData.filePath || "/images/librodefault.jpg", // Usa una imagen por defecto si falla
          };
        })
      );

      setBooks(booksWithImages);
    }

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-6 pt-16">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">📂 Temario</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {books.map((book, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-center">
              <a className="h-1/2 w-3/4 pt-3" href={`${book.url}`} target="_blank">
                <Image
                  // src={`/images/libros/libro${i + 1}.jpg`}
                  src={book.imageUrl}
                  alt={book.name}
                  width={400}
                  height={600}
                  className="object-cover"
                />
              </a>
            </div>

            <div className="p-4 items-center text-center">
              <h3 className="text-lg font-bold">{book.name}</h3>
              <button
                onClick={() => window.open(book.url, "_blank")}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
              >
                Leer ahora
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* {isPdfViewerOpen  && (
        <PDFViewer 
        fileUrl={selectedBook} 
        onClose={() => setIsPdfViewerOpen(false)} />
        )} */}
    </div>
  );
}
