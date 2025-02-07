document.addEventListener('DOMContentLoaded', loadCharacterDetails);

async function loadCharacterDetails() {
  const params = new URLSearchParams(window.location.search);
  const characterIndex = params.get('index');

  if (!characterIndex) {
    document.getElementById('character-details').innerHTML = "<p class='text-red-500'>No character found.</p>";
    return;
  }

  const apiUrl = 'https://potterapi-fedeperin.vercel.app/en/characters';

  try {
    const response = await fetch(apiUrl);
    const characters = await response.json();
    
    const character = characters.find(c => c.index == characterIndex);
    
    if (!character) {
      document.getElementById('character-details').innerHTML = "<p class='text-red-500'>Character not found.</p>";
      return;
    }

    // Generate the character details content
    document.getElementById('character-details').innerHTML = `
      <img src="${character.image}" alt="${character.fullName}" class="w-64 mx-auto rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mt-4">${character.fullName}</h1>
      <h2 class="text-xl text-gray-600 italic">${character.nickname}</h2>
      <p class="mt-2 text-gray-700"><strong>Hogwarts House:</strong> ${character.hogwartsHouse}</p>
      <p class="mt-2 text-gray-700"><strong>Interpreted by:</strong> ${character.interpretedBy}</p>
      <p class="mt-2 text-gray-700"><strong>Birthdate:</strong> ${character.birthdate}</p>
      <p class="mt-4 text-gray-700"><strong>Children:</strong> ${character.children.join(', ')}</p>
    `;
  } catch (error) {
    console.error('Error fetching character details:', error);
    document.getElementById('character-details').innerHTML = "<p class='text-red-500'>Error loading character details.</p>";
  }
}
