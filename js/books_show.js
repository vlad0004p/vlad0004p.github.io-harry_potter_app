document.addEventListener('DOMContentLoaded', loadBookDetails);

async function loadBookDetails() {
  const params = new URLSearchParams(window.location.search);
  const bookIndex = params.get('index');

  if (!bookIndex) {
    document.getElementById('book-details').innerHTML = "<p class='text-red-500'>No book found.</p>";
    return;
  }

  const apiUrl = 'https://potterapi-fedeperin.vercel.app/en/books';

  try {
    const response = await fetch(apiUrl);
    const books = await response.json();
    
    // Find the correct book using the index
    const book = books.find(b => b.index == bookIndex);
    
    if (!book) {
      document.getElementById('book-details').innerHTML = "<p class='text-red-500'>Book not found.</p>";
      return;
    }

    // Generate the book details content
    document.getElementById('book-details').innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="w-64 mx-auto rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mt-4">${book.title}</h1>
      <h2 class="text-xl text-gray-600 italic">${book.originalTitle}</h2>
      <p class="mt-2 text-gray-700"><strong>Release Date:</strong> ${book.releaseDate}</p>
      <p class="mt-2 text-gray-700"><strong>Pages:</strong> ${book.pages}</p>
      <p class="mt-4 text-gray-800">${book.description}</p>
    `;
  } catch (error) {
    console.error('Error fetching book details:', error);
    document.getElementById('book-details').innerHTML = "<p class='text-red-500'>Error loading book details.</p>";
  }
}
