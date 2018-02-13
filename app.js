'use strict';

const products = [];

function Product (prodName, prodImage) {
    this.prodName = prodName,
    this.prodImage = prodImage,
    this.prodVotes = 0,
    this.prodDisplayed = false,
    this.index
};

// creates all of the products and populates the products array with them as objects
function createProducts () {
    const prodR2Bag = new Product('R2-D2 Bag', 'bag.jpg');
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

    const prodChair = new Product('Shitty Chair', 'chair.jpg');
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

    const prodWaterCan = new Product('Shitty Wattering Can', 'water-can.jpg');
    products.push(prodWaterCan);
    prodWaterCan.index = (products.length - 1);

    const prodWineGlass = new Product('Drunk Proof Wineglass', 'wine-glass.jpg');
    products.push(prodWineGlass);
    prodWineGlass.index = (products.length - 1);
}

createProducts();

// creates the tabe and names the cells td0, td1, and td2
const section = document.getElementById('test-section');
const table = document.createElement('table');
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

    const clickProcess = function(x) {
        activeObjects[x].prodVotes += 1;
        activeObjects = [];
        activeImage = [];
        clickCounter++;
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

// renders the list with the results
const renderResultsTable = function() {
    const table = document.getElementById('vote-table');
    table.remove();

    const section = document.getElementById('test-section');
    const list = document.createElement('ul');
    section.appendChild(list);

    for(let i = 0; i < products.length; i++) {
        const li = document.createElement('li');
        list.appendChild(li);
        li.textContent = products[i].prodVotes + ' for ' + products[i].prodName;

    }
}