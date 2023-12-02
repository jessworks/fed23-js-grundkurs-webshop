const productsContainerHtml = document.querySelector('#productsContainer');
const cartContainerHtml = document.querySelector('#cartContainer');
const today = new Date(); //lyft in i funktionerna --> Jenni: vanliga fel

const isFriday = today.getDay() === 5;
const isSaturday = today.getDay() === 6;
const isSunday = today.getDay() === 0;
const isMonday = today.getDay() === 1;
const currentHour = today.getHours();

let slownessTimeout = setTimeout(resetOrderForm, 1000 * 60 * 15);

const products = [
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
            },
        ],
        name: 'Cherry Pie',
        price: 67,
        rating: 5,
        category: 'special agent',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
            },
        ],
        name: 'Apple Pie',
        price: 67,
        rating: 4,
        category: 'state trooper',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
            },
        ],
        name: 'Flat White',
        price: 47,
        rating: 4,
        category: 'state trooper',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
            },
        ],
        name: 'Cofee, Black',
        price: 42,
        rating: 4,
        category: 'special agent',
        amount: 0,
    },
    {
        image: [
        {
            src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
            alt: 'placeholder',
        },
    ],
        name: 'Cherry Glazed Donut',
        price: 54,
        rating: 3,
        category: 'log lady',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
            },
        ],
        name: 'Chocolate Glazed Donut',
        price: 54,
        rating: 4,
        category: 'special agent',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
            },
        ],
        name: 'Donut, plain',
        price: 49,
        rating: 3,
        category: 'special agent',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
            },
        ],
        name: 'Truffle Chip Cookie',
        price: 47,
        rating: 4.5,
        category: 'log lady',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
            },
        ],
        name: 'Ham on Rye',
        price: 67,
        rating: 4,
        category: 'special agent',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
            },
        ],
        name: 'Grilled Cheese',
        price: 59,
        rating: 3.5,
        category: 'state trooper',
        amount: 0,
    }
];

function resetOrderForm() {
    alert('Too slow. Someone else is eating your donuts.')
    //reset hela sidan, anropa funktionen för detta (används för rensa-knapp också)
    //reset() för input, products[index].amount = 0 för added products
};

function decreaseAmount(e) {
    const index = e.currentTarget.dataset.id;
    if (products[index].amount >= 0) {
        products[index].amount = 0;
    } else {
        products[index].amount -= 1;
    }
    printProducts();
};

function increaseAmount(e) {
    const index = e.currentTarget.dataset.id;
    products[index].amount += 1;
    printProducts();
};

function getPriceMultiplier() {
    if ((isFriday && currentHour >= 15) || isSaturday || isSunday || (isMonday && currentHour > 3)) {
        return 1.15;
    } else {
        return 1;
    };
}

//Print products
function printProducts() {
    productsContainerHtml.innerHTML = '';

    let priceIncrease = getPriceMultiplier();

    products.forEach((products, index) => {
        productsContainerHtml.innerHTML += 
        `
            <li>
                <img>${products.image}
                <h2>${products.name}</h2>
                <div>Price: <span>${Math.round(products.price * priceIncrease)}</span> kr</div>
                <div>Rating: <span>${products.rating}</span></div>
                <div>Category: <span>${products.category}</span></div>
                <button class="decrease" data-id="${index}">-</button>
                <button class="increase" data-id="${index}">+</button>
                <div>Amount: <span>${products.amount}</span></div>
            </li>
        `; //Math.round för Price?
    });

    const btnDecrease = document.querySelectorAll('button.decrease');
    const btnIncrease = document.querySelectorAll('button.increase');

    btnDecrease.forEach(btn => {
        btn.addEventListener('click', decreaseAmount);
    });

    btnIncrease.forEach(btn => {
        btn.addEventListener('click', increaseAmount);
    });

    printProductsCart();
};

//Print cart
function printProductsCart() {
    cartContainerHtml.innerHTML = '';

    let sum = 0;
    let productsAmountOrdered = 0;
    let msg = '';
    let priceIncrease = getPriceMultiplier();

    //Cart
    products.forEach(products => {
        productsAmountOrdered += products.amount;

        //10 or more of same product, 10 % discount
        if (products.amount > 0) {
            let productsPrice = products.price;
            if (products.amount >= 10) { //varför börjar den på 11
                products.price *= 0.9; //exponentiell rabatt för varje klick på + knapp, hur stoppa detta
            };

            const adjustedProductsPrice = productsPrice * priceIncrease;

            sum += products.amount * adjustedProductsPrice;

            cartContainerHtml.innerHTML += 
            `
                <article>
                    <span>${products.name}</span>
                    <div>Amount: <span>${products.amount}</span></div>
                    <div>Total: <span>${products.amount * adjustedProductsPrice}</span> kr</div>
                    
                </article>
            `; //Math.round för Total?
        };
    });

    if (sum <= 0) {
        return;
    }

    //Monday discount
    if (isMonday && currentHour > 3) {
        sum *= 0.9; //Math.round?
        msg += `<p>Happy Monday! You get 10 % off your order.</p>`;
    };

    cartContainerHtml.innerHTML += `<p>Total sum: ${sum} kr</p>`; //Math.round för Total sum??
    cartContainerHtml.innerHTML += `<div>${msg}</div>`;

    //15+ products, free delivery
    if (productsAmountOrdered > 15) {
        cartContainerHtml.innerHTML += '<p>Shipping: 0 kr</p>';
    } else {
        cartContainerHtml.innerHTML += `<p>Shipping: ${Math.round(25 + (0.1 * sum))}`
    };
};

printProducts();

 