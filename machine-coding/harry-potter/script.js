const main = document.getElementById('main');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const cardCharacters = [];

const fetchCharacters = async () => {
  const response = await fetch('https://hp-api.herokuapp.com/api/characters');
  const data = await response.json();
  return data.slice(0, 10);
};

const createCards = (characters) => {
  const mainDocumentFragment = document.createDocumentFragment();
  characters.forEach((character) => {
    // card
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.backgroundImage = `url(${character.image})`;

    //card header
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    // card title
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = character.name;
    cardHeader.appendChild(cardTitle);

    // dateOfBirth
    const [date, month, year] = character.dateOfBirth.split('-');
    const dateOfBirth = new Date(year || character.yearOfBirth, month || 0, date || 1);
    const formattedDateOfBirth = `${dateOfBirth.getDate() < 10 ? '0' + dateOfBirth.getDate() : dateOfBirth.getDate()} 
                                  ${months[dateOfBirth.getMonth()]} 
                                  ${dateOfBirth.getFullYear()}`;
    const cardDateOfBirth = document.createElement('p');
    cardDateOfBirth.textContent = formattedDateOfBirth;
    cardHeader.appendChild(cardDateOfBirth);

    // house
    const cardHouse = document.createElement('p');
    cardHouse.textContent = character.house;
    cardHeader.appendChild(cardHouse);

    card.appendChild(cardHeader);
    mainDocumentFragment.appendChild(card);
  });
  main.appendChild(mainDocumentFragment);
};

fetchCharacters()
  .then((characters) => {
    cardCharacters.push(...characters);
    createCards(cardCharacters);
  })
  .catch((error) => {
    console.log(error);
  });

const searchInput = document.getElementById('searchInput');
