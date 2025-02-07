document.addEventListener('DOMContentLoaded', loadHouses);

async function loadHouses() {
  const houseContainer = document.getElementById('house-container');
  houseContainer.innerHTML = ''; // Clear previous content

  const apiUrl = 'https://potterapi-fedeperin.vercel.app/en/houses';

  try {
    const response = await fetch(apiUrl);
    const houses = await response.json();

    houses.forEach(house => {
      const houseElement = document.createElement('article');
      houseElement.classList.add('p-6', 'bg-white', 'rounded-lg', 'shadow-lg', 'space-y-4');

      // House Name and Emoji
      const houseTitle = document.createElement('h2');
      houseTitle.classList.add('text-2xl', 'font-semibold');
      houseTitle.textContent = `${house.house} ${house.emoji}`;

      // House Founder
      const founderElement = document.createElement('p');
      founderElement.classList.add('text-gray-700');
      founderElement.innerHTML = `<strong>Founder:</strong> ${house.founder}`;

      // House Colors
      const colorsElement = document.createElement('p');
      colorsElement.classList.add('text-gray-700');
      colorsElement.innerHTML = `<strong>Colors:</strong> ${house.colors.join(', ')}`;

      // House Animal
      const animalElement = document.createElement('p');
      animalElement.classList.add('text-gray-700');
      animalElement.innerHTML = `<strong>Animal:</strong> ${house.animal}`;

      // Append all elements to the house section
      houseElement.appendChild(houseTitle);
      houseElement.appendChild(founderElement);
      houseElement.appendChild(colorsElement);
      houseElement.appendChild(animalElement);

      // Append to the container
      houseContainer.appendChild(houseElement);
    });
  } catch (error) {
    console.error('Error fetching houses:', error);
  }
}
