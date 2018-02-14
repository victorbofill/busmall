'use strict';

let products = [];
let activeObjects = [];
let activeImage = [];
let clickCounter = 0;
const button = document.getElementById('button');

function Product (prodName, prodImage) {
    this.prodName = prodName,
    this.prodImage = prodImage,
    this.prodVotes = 0,
    this.prodRendered = 0;
    this.prodPercent = 0;
};

const createProducts = function() {
    const prodR2Bag = new Product('R2-D2 Bag', 'bag.jpg');
    products.push(prodR2Bag);

    const prodBanana = new Product('Banana Slicer', 'banana.jpg');
    products.push(prodBanana);

    const prodTPStand = new Product('TP Tablet Stand', 'bathroom.jpg');
    products.push(prodTPStand);

    const prodBoots = new Product('Boots', 'boots.jpg');
    products.push(prodBoots);

    const prodBFast = new Product('Breakfast Machine', 'breakfast.jpg');
    products.push(prodBFast);

    const prodMeatGum = new Product('Meatball Bubblegum', 'bubblegum.jpg');
    products.push(prodMeatGum);

    const prodChair = new Product('Silly Chair', 'chair.jpg');
    products.push(prodChair);

    const prodCthulu = new Product('Cthulhu', 'cthulhu.jpg');
    products.push(prodCthulu);

    const prodDuckLips = new Product('Dog Duck Lips', 'dog-duck.jpg');
    products.push(prodDuckLips);

    const prodDragon = new Product('Dragon Meat', 'dragon.jpg');
    products.push(prodDragon);

    const prodPen = new Product('Utensil Pen', 'pen.jpg');
    products.push(prodPen);

    const prodPetSweep = new Product('Pet Sweeping Shoes', 'pet-sweep.jpg');
    products.push(prodPetSweep);

    const prodScissors = new Product('Pizza Scissors', 'scissors.jpg');
    products.push(prodScissors);
    prodScissors.index = (products.length - 1);

    const prodShark = new Product('Shark Sleeping Bag', 'shark.jpg');
    products.push(prodShark);

    const prodBabySweep = new Product('Baby Sweeping Suit', 'sweep.png');
    products.push(prodBabySweep);

    const prodTaunTaun = new Product('Tauntuan Sleeping Bag', 'tauntaun.jpg');
    products.push(prodTaunTaun);

    const prodUnicorn = new Product('Unicorn Meat', 'unicorn.jpg');
    products.push(prodUnicorn);

    const prodUSB = new Product('Tentacle USB Stick', 'usb.gif');
    products.push(prodUSB);

    const prodWaterCan = new Product('Silly Wattering Can', 'water-can.jpg');
    products.push(prodWaterCan);

    const prodWineGlass = new Product('Drunk Proof Wineglass', 'wine-glass.jpg');
    products.push(prodWineGlass);
};

const renderTable = function() {
    const header = document.getElementById('header');
    let h3 = document.createElement('h3');
    header.appendChild(h3);
    h3.textContent = 'Click on the image of the product you would most likely purchase';
    h3.setAttribute('id', 'header-message');

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

    const footer = document.getElementById('footer');
    h3 = document.createElement('h3');
    footer.appendChild(h3);
    h3.setAttribute('id', 'footer-counter');
};

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

const activateListener = function() {

    const table = document.getElementById('vote-table');

    table.addEventListener('click', function () {
        const clickedImage = event.target;

        const footerCounter = document.getElementById('footer-counter');

        const clickProcess = function(x) {
            activeObjects[x].prodVotes += 1;
            activeObjects = [];
            activeImage = [];
            clickCounter++;
            footerCounter.textContent = 'Choices: ' + clickCounter + ' out of 25';

            renderImages();
        };

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

            for (let i = 0; i < products.length; i++) {
                const object = products[i];

                if (object.prodVotes > 0) {
                    object.prodPercent = (((object.prodVotes) / (object.prodRendered)) * 100);
                }
            }

            localStorage.setItem('products', JSON.stringify(products));

            renderGraphs();
        }
    });
};

const renderGraphs = function() {

    const header = document.getElementById('header-message');
    header.remove();

    const footerCounter = document.getElementById('footer-counter');
    footerCounter.remove();

    const table = document.getElementById('vote-table');
    table.remove();

    const chartDiv = document.getElementById('chart-div');
    chartDiv.removeAttribute('class', 'hidden');

    const votesCanvas = document.createElement('canvas');
    chartDiv.appendChild(votesCanvas);
    votesCanvas.setAttribute('height', '100px');
    votesCanvas.setAttribute('width', '200px');
    votesCanvas.setAttribute('id', 'votes-canvas');
    const ctx = votesCanvas.getContext('2d');

    const percentCanvas = document.createElement('canvas');
    chartDiv.appendChild(percentCanvas);
    percentCanvas.setAttribute('height', '100px');
    percentCanvas.setAttribute('width', '200px');
    percentCanvas.setAttribute('id', 'percent-canvas');
    const ctxPerc = percentCanvas.getContext('2d');

    const voteData = {
        labels: [products[0].prodName, products[1].prodName, products[2].prodName, products[3].prodName,
            products[4].prodName, products[5].prodName, products[6].prodName, products[7].prodName,
            products[8].prodName, products[9].prodName, products[10].prodName, products[11].prodName,
            products[12].prodName, products[13].prodName, products[14].prodName, products[15].prodName,
            products[16].prodName, products[17].prodName, products[18].prodName, products[19].prodName
        ],
        datasets: [{
            label:'Times Rendered',
            backgroundColor: 'rgb(225, 0, 0)',
            stack: 'Stack 0',
            data: [
                products[0].prodRendered,
                products[1].prodRendered,
                products[2].prodRendered,
                products[3].prodRendered,
                products[4].prodRendered,
                products[5].prodRendered,
                products[6].prodRendered,
                products[7].prodRendered,
                products[8].prodRendered,
                products[9].prodRendered,
                products[10].prodRendered,
                products[11].prodRendered,
                products[12].prodRendered,
                products[13].prodRendered,
                products[14].prodRendered,
                products[15].prodRendered,
                products[16].prodRendered,
                products[17].prodRendered,
                products[18].prodRendered,
                products[19].prodRendered
            ]},
        {label: 'Times Selected',
            backgroundColor: 'rgb(0, 225, 0)',
            stack: 'Stack 0',
            data: [
                products[0].prodVotes,
                products[1].prodVotes,
                products[2].prodVotes,
                products[3].prodVotes,
                products[4].prodVotes,
                products[5].prodVotes,
                products[6].prodVotes,
                products[7].prodVotes,
                products[8].prodVotes,
                products[9].prodVotes,
                products[10].prodVotes,
                products[11].prodVotes,
                products[12].prodVotes,
                products[13].prodVotes,
                products[14].prodVotes,
                products[15].prodVotes,
                products[16].prodVotes,
                products[17].prodVotes,
                products[18].prodVotes,
                products[19].prodVotes
            ]
        }],
    };

    const voteChart = new Chart (ctx, { // eslint-disable-line
        type: 'bar',
        data: voteData,
        options: {
            title: {
                display: true,
                text: 'Results of Your Survey'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false
                    },

                    yAxes: [{
                        stacked: true
                    }]
                }]
            }
        }
    });

    const percentData = {
        labels: [products[0].prodName, products[1].prodName, products[2].prodName, products[3].prodName,
            products[4].prodName, products[5].prodName, products[6].prodName, products[7].prodName,
            products[8].prodName, products[9].prodName, products[10].prodName, products[11].prodName,
            products[12].prodName, products[13].prodName, products[14].prodName, products[15].prodName,
            products[16].prodName, products[17].prodName, products[18].prodName, products[19].prodName
        ],
        datasets: [{
            label:'Percent Selected',
            backgroundColor: 'rgb(0, 0, 255)',
            stack: 'Stack 0',
            data: [
                products[0].prodPercent,
                products[1].prodPercent,
                products[2].prodPercent,
                products[3].prodPercent,
                products[4].prodPercent,
                products[5].prodPercent,
                products[6].prodPercent,
                products[7].prodPercent,
                products[8].prodPercent,
                products[9].prodPercent,
                products[10].prodPercent,
                products[11].prodPercent,
                products[12].prodPercent,
                products[13].prodPercent,
                products[14].prodPercent,
                products[15].prodPercent,
                products[16].prodPercent,
                products[17].prodPercent,
                products[18].prodPercent,
                products[19].prodPercent
            ]},
        ],
    };

    const percentChart = new Chart (ctxPerc, { // eslint-disable-line
        type: 'bar',
        data: percentData,
        options: {
            title: {
                display: true,
                text: 'Results of Your Survey'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false
                    },

                    yAxes: [{
                        stacked: true
                    }]
                }]
            }
        }
    });

    voteChart.update();
    percentChart.update();
};

button.addEventListener('click', function () {
    activeObjects = [];
    activeImage = [];
    clickCounter = 0;

    const votesCanvas = document.getElementById('votes-canvas');
    votesCanvas.remove();

    const percentCanvas = document.getElementById('percent-canvas');
    percentCanvas.remove();

    const chartDiv = document.getElementById('chart-div');
    chartDiv.setAttribute('class', 'hidden');

    renderTable();
    renderImages();
    activateListener();
});

if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'));
} else {
    createProducts();
}

renderTable();
renderImages();
activateListener();