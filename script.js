const productsContainerHtml = document.querySelector('#productsContainer');

const products = [
    {
        image: [
            {
                src: 'images/images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
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
                src: 'images/images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
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
                src: 'images/images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
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
                src: 'images/images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
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
            src: 'images/images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
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
                src: 'images/images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
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
                src: 'images/images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
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
                src: 'images/images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
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
                src: 'images/images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
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
                src: 'images/images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
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

function printProducts() {
    productsContainerHtml.innerHTML = '';

    products.forEach((products, index) => {
        productsContainerHtml.innerHTML += 
        `
            <li>
                <img>${products.image}
                <h2>${products.name}</h2>
                <div>Price: <span>${products.price}</span> kr</div>
                <div>Rating: <span>${products.rating}</span></div>
                <div>Category: <span>${products.category}</span></div>
                <button class="decrease" data-id="${index}">-</button>
                <div>Amount: <span>${products.amount}</span></div>
                <button class="increase" data-id="${index}">+</button>
            </li>
        `;
    });

    const btnDecrease = document.querySelectorAll('button.decrease');
    const btnIncrease = document.querySelectorAll('button.increase');

    btnDecrease.forEach(btn => {
        btn.addEventListener('click', decreaseAmount);
    });

    btnIncrease.forEach(btn => {
        btn.addEventListener('click', increaseAmount);
    });
};

printProducts();