document.addEventListener('DOMContentLoaded', loadImages);

async function loadImages() {
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = ''; // Clear previous images

  // API URL
  const apiUrl = 'https://potterapi-fedeperin.vercel.app/en/books';

  try {
    // Fetch the book data
    const response = await fetch(apiUrl);
    const books = await response.json();

    // Loop through books and create elements
    books.forEach(book => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book-item', 'p-4', 'bg-white', 'rounded-lg', 'shadow-lg', 'text-center', 'cursor-pointer');

      // Create and append the book cover
      const imgElement = document.createElement('img');
      imgElement.src = book.cover;
      imgElement.alt = book.title;
      imgElement.classList.add('w-full', 'h-auto', 'rounded-md');
      
      // Create and append the book title
      const titleElement = document.createElement('h3');
      titleElement.textContent = book.title;
      titleElement.classList.add('mt-4', 'text-lg', 'font-semibold');

      // Click event to navigate to the show page with book index
      bookElement.addEventListener('click', () => {
        window.location.href = `books_show.html?index=${book.index}`;
      });

      // Append elements to the book item container
      bookElement.appendChild(imgElement);
      bookElement.appendChild(titleElement);
      imageContainer.appendChild(bookElement);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}
