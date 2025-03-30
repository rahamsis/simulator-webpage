"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PDFViewer from "../components/pdfViewer";

export default function Library() {
  const [books, setBooks] = useState<{ name: string; url: string; imageUrl: string }[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("/api/books?bucket=archivosponte100");
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">📚 Biblioteca Digital</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-center">
              <div className="h-1/2 w-1/2 pt-3">
                <Image
                src={book.imageUrl}
                alt={book.name}
                width={400}
                height={600}
                className="object-cover"
              />
              </div>              
            </div>

            <div className="p-4 items-center text-center">
              <h3 className="text-lg font-bold">{book.name}</h3>
              <button
                onClick={() => {
                  setSelectedBook(book.url);
                  setIsPdfViewerOpen(true);
                }}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
              >
                Leer ahora
              </button>
            </div>
          </div>
        ))}
      </div>

      {isPdfViewerOpen && (
        <PDFViewer
          fileUrl={selectedBook}
          onClose={() => setIsPdfViewerOpen(false)} />
      )}
    </div>
  );
}
