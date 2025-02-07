document.addEventListener('DOMContentLoaded', loadSpells);

async function loadSpells() {
  const spellContainer = document.getElementById('spell-container');
  spellContainer.innerHTML = ''; // Clear previous content

  const apiUrl = 'https://potterapi-fedeperin.vercel.app/en/spells';

  try {
    const response = await fetch(apiUrl);
    const spells = await response.json();

    spells.forEach(spell => {
      const spellElement = document.createElement('article');
      spellElement.classList.add('p-6', 'bg-white', 'rounded-lg', 'shadow-lg', 'space-y-4');

      // Spell Name
      const spellTitle = document.createElement('h2');
      spellTitle.classList.add('text-2xl', 'font-semibold');
      spellTitle.textContent = spell.spell;

      // Spell Use
      const useElement = document.createElement('p');
      useElement.classList.add('text-gray-700');
      useElement.innerHTML = `<strong>Use:</strong> ${spell.use}`;

      // Append all elements to the spell section
      spellElement.appendChild(spellTitle);
      spellElement.appendChild(useElement);

      // Append to the container
      spellContainer.appendChild(spellElement);
    });
  } catch (error) {
    console.error('Error fetching spells:', error);
  }
}
