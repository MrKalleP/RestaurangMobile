const listCart = document.querySelector('.listCart');
let sum = 0;

let cart = [];
// cart.push(
//     { img: cardData.img, name: cardData.name, price: cardData.price, amount: 1 },
//     { img: cardData.img, name: cardData.name, price: cardData.price, amount: 1 },
//     { img: cardData.img, name: cardData.name, price: cardData.price, amount: 3 },
//     42
// );
const createItem = (cartItem) => {
    // Create main div
    let itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    // Create image
    let img = document.createElement('img');
    img.src = cartItem.img;
    img.alt = cartItem.name;
    itemDiv.appendChild(img);

    // Create name paragraph
    let nameP = document.createElement('p');
    nameP.className = 'name';
    nameP.textContent = cartItem.name;
    itemDiv.appendChild(nameP);

    // Create total price paragraph
    let totalPriceP = document.createElement('p');
    totalPriceP.className = 'totalPrice';
    totalPriceP.textContent = cartItem.price;
    itemDiv.appendChild(totalPriceP);

    // Create amount div
    let amountDiv = document.createElement('div');
    amountDiv.className = 'amount';
    itemDiv.appendChild(amountDiv);

    // Create minus span
    let minusSpan = document.createElement('span');
    minusSpan.className = 'minus';
    minusSpan.textContent = '<';
    amountDiv.appendChild(minusSpan);

    // Create counter span
    let counterSpan = document.createElement('span');
    counterSpan.className = 'counter';
    counterSpan.textContent = cartItem.amount;
    amountDiv.appendChild(counterSpan);

    // Create plus span
    let plusSpan = document.createElement('span');
    plusSpan.className = 'plus';
    plusSpan.textContent = '>';
    amountDiv.appendChild(plusSpan);

    return itemDiv;
};

const cartHandler = (cardData) => {
    return {
        img: cardData.img,
        name: cardData.name,
        price: cardData.price,
        amount: 1,
    };
};

export const addToCartListener = (pageData) => {
    const addToCartButton = document.querySelectorAll('.btn-add-to-cart');
    for (let i = 0; i < addToCartButton.length; i++) {
        addToCartButton[i].addEventListener('click', () => {
            const cartItem = cartHandler(pageData[i]);
            addItem(cartItem);
            updateCart();
            amountCartUpdate();
        });
    }
};
const totalsum = document.querySelector('.cartTab-totalsum');

const updateCart = () => {
    listCart.innerHTML = '';
    for (let item of cart) {
        const card = createItem(item);
        listCart.appendChild(card);
        adjustCartContent(card);
    }
    totalsum.textContent = `Totalsumma: ${sum.toFixed(2)} kr`;
};

const increaseCartBtn = (itemIndex) => {
    sum += cart[itemIndex].price;
    cart[itemIndex].amount++;
};
const adjustCartContent = (card) => {
    const itemName = card.querySelector(`.name`).textContent;
    const minus = card.querySelector(`.minus`);
    const plus = card.querySelector(`.plus`);
    const itemIndex = cart.findIndex((e) => e.name === itemName);
    plus.addEventListener(`click`, () => {
        increaseCartBtn(itemIndex);
        updateCart();
        amountCartUpdate();
    });
    minus.addEventListener(`click`, () => {
        deleteItem(itemIndex);
        updateCart();
        amountCartUpdateMinus();
    });
};

const deleteItem = (itemIndex) => {
    sum -= cart[itemIndex].price;
    cart[itemIndex].amount--;
    if (cart[itemIndex].amount < 1) {
        cart.splice(itemIndex, 1);
    }
};

const addItem = (cartItem) => {
    const existingItem = cart.find((e) => e.name === cartItem.name);
    if (existingItem) {
        // If item exists in the cart, the items amount gets incremented
        existingItem.amount++;
    } else {
        //else we add the item to the cart
        cart.push(cartItem);
    }
    sum += cartItem.price;
};

let countCart = 0;
const amountCart = document.querySelector('.amount-cart');
const amountCartUpdate = () => {
    countCart++;
    amountCart.textContent = countCart;
};

const amountCartUpdateMinus = () => {
    countCart--;
    amountCart.textContent = countCart;
};
