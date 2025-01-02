import React from "react";


interface Book {
  id: number;
  name: string;
  type: string;
  available: string;
}

// Async function to fetch data (Server Component)
const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch("https://simple-books-api.glitch.me/books/", {
    cache: "no-store", // Ensures fresh data on each request
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const ServerSide = async () => {
  const books = await fetchBooks();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Server Side Rendering Data Fetching - Books
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                {book.name}
              </h2>
              <p className="text-gray-500">{book.type}</p>
              <p className="text-gray-500">
                Availability: {book.available ? "true" : "false"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServerSide;
