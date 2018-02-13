'use strict';

const products = [];

function Product (prodName, prodImage) {
    this.prodName = prodName,
    this.prodImage = prodImage,
    this.prodVotes = 0,
    this.prodRendered = 0;
    this.prodPercent = 0;
    this.prodDisplayed = false,
    this.index
};

// creates all of the products and populates the products array with them as objects
function createProducts () {
    const prodR2Bag = new 
    Product('R2-D2 Bag', 'bag.jpg');
    products.push(prodR2Bag);
    prodR2Bag.index = (products.length - 1);

    const prodBanana = new Product('Banana Slicer', 'banana.jpg');
    products.push(prodBanana);
    prodBanana.index = (products.length - 1);

    const prodTPStand = new Product('TP Tablet Stand', 'bathroom.jpg');
    products.push(prodTPStand);
    prodTPStand.index = (products.length - 1);

    const prodBoots = new Product('Boots', 'boots.jpg');
    products.push(prodBoots);
    prodBoots.index = (products.length - 1);

    const prodBFast = new Product('Breakfast Machine', 'breakfast.jpg');
    products.push(prodBFast);
    prodBFast.index = (products.length - 1);

    const prodMeatGum = new Product('Meatball Bubblegum', 'bubblegum.jpg');
    products.push(prodMeatGum);
    prodMeatGum.index = (products.length - 1);

    const prodChair = new Product('Silly Chair', 'chair.jpg');
    products.push(prodChair);
    prodChair.index = (products.length - 1);

    const prodCthulu = new Product('Cthulhu', 'cthulhu.jpg');
    products.push(prodCthulu);
    prodCthulu.index = (products.length - 1);

    const prodDuckLips = new Product('Dog Duck Lips', 'dog-duck.jpg');
    products.push(prodDuckLips);
    prodDuckLips.index = (products.length - 1);

    const prodDragon = new Product('Dragon Meat', 'dragon.jpg');
    products.push(prodDragon);
    prodDragon.index = (products.length - 1);

    const prodPen = new Product('Utensil Pen', 'pen.jpg');
    products.push(prodPen);
    prodPen.index = (products.length - 1);

    const prodPetSweep = new Product('Pet Sweeping Shoes', 'pet-sweep.jpg');
    products.push(prodPetSweep);
    prodPetSweep.index = (products.length - 1);

    const prodScissors = new Product('Pizza Scissors', 'scissors.jpg');
    products.push(prodScissors);
    prodScissors.index = (products.length - 1);

    const prodShark = new Product('Shark Sleeping Bag', 'shark.jpg');
    products.push(prodShark);
    prodShark.index = (products.length - 1);

    const prodBabySweep = new Product('Baby Sweeping Suit', 'sweep.png');
    products.push(prodBabySweep);
    prodBabySweep.index = (products.length - 1);

    const prodTaunTaun = new Product('Tauntuan Sleeping Bag', 'tauntaun.jpg');
    products.push(prodTaunTaun);
    prodTaunTaun.index = (products.length - 1);

    const prodUnicorn = new Product('Unicorn Meat', 'unicorn.jpg');
    products.push(prodUnicorn);
    prodUnicorn.index = (products.length - 1);

    const prodUSB = new Product('Tentacle USB Stick', 'usb.gif');
    products.push(prodUSB);
    prodUSB.index = (products.length - 1);

    const prodWaterCan = new Product('Silly Wattering Can', 'water-can.jpg');
    products.push(prodWaterCan);
    prodWaterCan.index = (products.length - 1);

    const prodWineGlass = new Product('Drunk Proof Wineglass', 'wine-glass.jpg');
    products.push(prodWineGlass);
    prodWineGlass.index = (products.length - 1);
}

createProducts();

// creates the table and names the cells td0, td1, and td2
const section = document.getElementById('test-section');
let table = document.createElement('table');
table.setAttribute('id', 'vote-table');
section.appendChild(table);

const tr = document.createElement('tr');
table.appendChild(tr);

for (let i = 0; i < 3; i++) {
    const td = document.createElement('td');
    tr.appendChild(td);

    const img = document.createElement('img');
    td.appendChild(img);
    img.setAttribute('id', (i));
};

// renders three images on the table and stores which ones are active in an array
let activeObjects = [];
let activeImage = [];

const renderImages = function() {
    let i = 0;
    while (activeObjects.length < 3) {
        const randomNumber = Math.floor(Math.random() * (products.length));
        const randomProduct = (products[randomNumber]);

        randomProduct.prodRendered += 1;

        if (activeObjects.includes(randomProduct)) continue;

        activeObjects.push(randomProduct);

        const img = document.getElementById((i));
        img.setAttribute('src', 'img/' + activeObjects[i].prodImage);
        activeImage.push(img);   
        i++;
    }
};

renderImages();

let clickCounter = 0;

table.addEventListener('click', function () {
    const clickedImage = event.target;

    const footerCounter = document.getElementById('footer-counter');

    const clickProcess = function(x) {
        activeObjects[x].prodVotes += 1;
        activeObjects = [];
        activeImage = [];
        clickCounter++;
        footerCounter.textContent = 'Choices: ' + clickCounter + ' out of 25'
        renderImages();
        console.log(clickCounter);
    }

    if (clickedImage === activeImage[0]) {
        clickProcess(0);
    };

    if (clickedImage === activeImage[1]) {
        clickProcess(1);
    };

    if (clickedImage === activeImage[2]) {
        clickProcess(2);
    };

    if (clickCounter === 25) {
        renderResultsTable();
    }

});

// renders the final data table with the results
const renderResultsTable = function() {
    const header = document.getElementById('header');
    header.remove();

    const footerCounter = document.getElementById('footer-counter');
    footerCounter.remove();

    table = document.getElementById('vote-table');
    table.remove();

    const section = document.getElementById('test-section');
    table = document.createElement('table');
    section.appendChild(table);

    const thead = document.createElement('thead');
    table.appendChild(thead);

    const tr = document.createElement('tr');
    thead.appendChild(tr);

    const thOne = document.createElement('th');
    tr.appendChild(thOne);
    thOne.textContent = 'Product';
    
    const thTwo = document.createElement('th');
    tr.appendChild(thTwo);
    thTwo.textContent = 'Times Displayed';

    const thThree = document.createElement('th');
    tr.appendChild(thThree);
    thThree.textContent = 'Times Selected';
    
    const thFour = document.createElement('th');
    tr.appendChild(thFour);
    thFour.textContent = 'Percentage Selected';

    for(let i = 0; i < products.length; i++) {
        const tr = document.createElement('tr');
        table.appendChild(tr);

        let td = document.createElement('td');
        tr.appendChild(td);
        td.textContent = products[i].prodName;

        td = document.createElement('td');
        tr.appendChild(td);
        td.textContent = products[i].prodRendered;

        td = document.createElement('td');
        tr.appendChild(td);
        td.textContent = products[i].prodVotes;

        td = document.createElement('td');
        tr.appendChild(td);

        if (products[i].prodVotes > 0) {
            products[i].prodPercent = (((products[i].prodVotes)/(products[i].prodRendered)) * 100);
            td.textContent = (Math.floor(products[i].prodPercent)) + '%';
        }
    }
}