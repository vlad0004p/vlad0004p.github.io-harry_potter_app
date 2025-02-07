document.addEventListener('DOMContentLoaded', loadCharacters);

async function loadCharacters() {
  const characterContainer = document.getElementById('character-container');
  characterContainer.innerHTML = ''; // Clear previous characters

  const apiUrl = 'https://potterapi-fedeperin.vercel.app/en/characters';

  try {
    const response = await fetch(apiUrl);
    const characters = await response.json();

    characters.forEach(character => {
      const characterElement = document.createElement('div');
      characterElement.classList.add('character-item', 'p-4', 'bg-white', 'rounded-lg', 'shadow-lg', 'text-center', 'cursor-pointer');

      // Create and append the character image
      const imgElement = document.createElement('img');
      imgElement.src = character.image;
      imgElement.alt = character.nickname;
      imgElement.classList.add('w-full', 'h-auto', 'rounded-md');

      // Create and append the character's nickname
      const nicknameElement = document.createElement('h3');
      nicknameElement.textContent = character.nickname;
      nicknameElement.classList.add('mt-4', 'text-lg', 'font-semibold');

      // Click event to navigate to the character's details page with the index
      characterElement.addEventListener('click', () => {
        window.location.href = `character_show.html?index=${character.index}`;
      });

      // Append elements to the character item container
      characterElement.appendChild(imgElement);
      characterElement.appendChild(nicknameElement);
      characterContainer.appendChild(characterElement);
    });
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
}
