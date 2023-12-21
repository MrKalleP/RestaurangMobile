import { addToCartListener } from './cartHandler.js';

let currentPage = 1;
let currentCategory = 'bbqs';
const amountOfCards = 9;
let maxPageination = 0;

const title = document.querySelector('.menu-header');
const menuSelect = document.getElementById('Menu-select');

const paginate = (array, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return array.slice(startIndex, startIndex + pageSize);
};

// Adds div elements with information for all dishes
const createCard = (foodInfo) => {
    const menuCardDiv = document.createElement('div');
    menuCardDiv.classList.add('menu-card');

    const menuCardImg = document.createElement(`img`);
    // kolla ifall bilden finns eller inte?
    menuCardImg.src = foodInfo.img;
    menuCardImg.alt = foodInfo.name;

    const menuCardName = document.createElement(`h4`);
    menuCardName.textContent = foodInfo.name;

    const menuCardInfo = document.createElement(`p`);
    const strongInfo = document.createElement(`strong`);
    strongInfo.textContent = `Info: `;
    menuCardInfo.append(strongInfo, foodInfo.dsc);

    const menuCardPrice = document.createElement(`p`);
    const strongPrice = document.createElement(`strong`);
    strongPrice.textContent = `Pris: `;
    menuCardPrice.append(strongPrice, foodInfo.price, ` kr`);

    const menuCardCountry = document.createElement(`p`);
    const strongCountry = document.createElement(`strong`);
    strongCountry.textContent = `Country: `;
    menuCardCountry.append(strongCountry, foodInfo.country);

    const menuCardRate = document.createElement(`p`);
    const strongRate = document.createElement(`strong`);
    strongRate.textContent = `Betyg: `;
    menuCardRate.append(strongRate, foodInfo.rate);

    const btnAddToCart = document.createElement(`button`);
    btnAddToCart.textContent = 'Beställ';
    btnAddToCart.classList.add(`btn-add-to-cart`);

    menuCardDiv.append(
        menuCardImg,
        menuCardName,
        menuCardInfo,
        menuCardPrice,
        menuCardCountry,
        menuCardRate,
        btnAddToCart
    );
    return menuCardDiv;
};

const updatePage = () => {
    maxPageination = Math.ceil(db[`${currentCategory}`].length / amountOfCards);
    const pageData = paginate(
        db[`${currentCategory}`],
        currentPage,
        amountOfCards
    );
    const cardsContainer = document.querySelector('.menu-cards-container');
    cardsContainer.innerHTML = '';

    for (let food of pageData) {
        const card = createCard(food);
        cardsContainer.appendChild(card);
    }
    addToCartListener(pageData);
};

updatePage();

const nextPageButton = document.querySelector('.next-page');
nextPageButton.addEventListener('click', () => {
    if (currentPage < maxPageination) {
        currentPage++;
        document.getElementById('Menu-select').scrollIntoView(); //scroll to the top of the page
        updatePage();
    }
});

const prevPageButton = document.querySelector('.prev-page');
prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        document.getElementById('Menu-select').scrollIntoView(); //scroll to the top of the page
        updatePage();
    }
});

const allcatagorys = Object.keys(db.pagination);

for (let i = 0; i < allcatagorys.length; i++) {
    const option = document.createElement('option');
    option.label =
        allcatagorys[i].charAt(0).toUpperCase() +
        allcatagorys[i].slice(1).replace('-', ' ');
    option.value = allcatagorys[i];
    option.textContent =
        allcatagorys[i].charAt(0).toUpperCase() +
        allcatagorys[i].slice(1).replace('-', ' ');
    menuSelect.append(option);
}

menuSelect.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    currentPage = 1;
    updatePage();
});
