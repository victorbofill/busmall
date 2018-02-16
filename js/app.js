'use strict';

const game = {
    products: [],
    activeObjects: [],
    activeImage: [],
    Settings: {prodShown: 3, rounds: 25},
    clickCounter: 0,
    button: document.getElementById('button'),
    productInfo: ['R2-D2 Bag', 'bag.jpg',
        'Banana Slicer', 'banana.jpg',
        'TP Tablet Stand', 'bathroom.jpg',
        'Boots', 'boots.jpg',
        'Breakfast Machine', 'breakfast.jpg',
        'Meatball Bubblegum', 'bubblegum.jpg',
        'Silly Chair', 'chair.jpg',
        'Cthulhu', 'cthulhu.jpg',
        'Dog Duck Lips', 'dog-duck.jpg',
        'Dragon Meat', 'dragon.jpg',
        'Utensil Pen', 'pen.jpg',
        'Pet Sweeping Shoes', 'pet-sweep.jpg',
        'Pizza Scissors', 'scissors.jpg',
        'Shark Sleeping Bag', 'shark.jpg',
        'Baby Sweeping Suit', 'sweep.png',
        'Tauntuan Sleeping Bag', 'tauntaun.jpg',
        'Unicorn Meat', 'unicorn.jpg',
        'Tentacle USB Stick', 'usb.gif',
        'Silly Wattering Can', 'water-can.jpg',
        'Drunk Proof Wineglass', 'wine-glass.jpg'
    ],
    start: function() {
        if (localStorage.getItem('Settings')) {
            this.Settings = JSON.parse(localStorage.getItem('Settings'));
        } else {
            this.createProducts();
        }
        this.renderTable();
        this.renderImages();
        this.activateListener();
    },
    createProducts: function() {
        for (let i = 0; i < this.productInfo.length; i = i + 2) {
            const object = new Product(this.productInfo[i], this.productInfo[i + 1]); // eslint-disable-line
            this.products.push(object);
        }
    },
    renderTable: function() {
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

        for (let i = 0; i < JSON.parse(this.Settings.prodShown); i++) {
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
    },
    renderImages: function() {
        let i = 0;
        while (this.activeObjects.length < (this.Settings.prodShown)) {
            const randomNumber = Math.floor(Math.random() * (this.products.length));
            const randomProduct = (this.products[randomNumber]);

            randomProduct.prodRendered += 1;

            if (this.activeObjects.includes(randomProduct)) continue;

            this.activeObjects.push(randomProduct);

            const img = document.getElementById((i));
            img.setAttribute('src', 'img/' + this.activeObjects[i].prodImage);
            this.activeImage.push(img);
            i++;
        }
    },
    activateListener: function () {
        const table = document.getElementById('vote-table');

        table.addEventListener('click', function () {
            const clickedImage = event.target;

            const footerCounter = document.getElementById('footer-counter');

            const clickProcess = function(x) {
                game.activeObjects[x].prodVotes += 1;
                game.activeObjects = [];
                game.activeImage = [];
                game.clickCounter++;
                footerCounter.textContent = 'Choices: ' + game.clickCounter + ' out of ' + game.Settings.rounds;

                game.renderImages();
            };

            if (clickedImage === game.activeImage[0]) {
                clickProcess(0);
            };

            if (clickedImage === game.activeImage[1]) {
                clickProcess(1);
            };

            if (clickedImage === game.activeImage[2]) {
                clickProcess(2);
            };

            if (game.clickCounter === JSON.parse(game.Settings.rounds)) {

                for (let i = 0; i < game.products.length; i++) {
                    const object = game.products[i];

                    if (object.prodVotes > 0) {
                        object.prodPercent = (((object.prodVotes) / (object.prodRendered)) * 100);
                    }
                }

                localStorage.setItem('products', JSON.stringify(game.products));

                game.renderGraphs();
            }
        });
    },
    renderGraphs: function() {

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
            labels: [game.products[0].prodName, game.products[1].prodName, game.products[2].prodName, game.products[3].prodName,
                game.products[4].prodName, game.products[5].prodName, game.products[6].prodName, game.products[7].prodName,
                game.products[8].prodName, game.products[9].prodName, game.products[10].prodName, game.products[11].prodName,
                game.products[12].prodName, game.products[13].prodName, game.products[14].prodName, game.products[15].prodName,
                game.products[16].prodName, game.products[17].prodName, game.products[18].prodName, game.products[19].prodName
            ],
            datasets: [{
                label:'Times Rendered',
                backgroundColor: 'rgb(225, 0, 0)',
                stack: 'Stack 0',
                data: [
                    game.products[0].prodRendered,
                    game.products[1].prodRendered,
                    game.products[2].prodRendered,
                    game.products[3].prodRendered,
                    game.products[4].prodRendered,
                    game.products[5].prodRendered,
                    game.products[6].prodRendered,
                    game.products[7].prodRendered,
                    game.products[8].prodRendered,
                    game.products[9].prodRendered,
                    game.products[10].prodRendered,
                    game.products[11].prodRendered,
                    game.products[12].prodRendered,
                    game.products[13].prodRendered,
                    game.products[14].prodRendered,
                    game.products[15].prodRendered,
                    game.products[16].prodRendered,
                    game.products[17].prodRendered,
                    game.products[18].prodRendered,
                    game.products[19].prodRendered
                ]},
            {label: 'Times Selected',
                backgroundColor: 'rgb(0, 225, 0)',
                stack: 'Stack 0',
                data: [
                    game.products[0].prodVotes,
                    game.products[1].prodVotes,
                    game.products[2].prodVotes,
                    game.products[3].prodVotes,
                    game.products[4].prodVotes,
                    game.products[5].prodVotes,
                    game.products[6].prodVotes,
                    game.products[7].prodVotes,
                    game.products[8].prodVotes,
                    game.products[9].prodVotes,
                    game.products[10].prodVotes,
                    game.products[11].prodVotes,
                    game.products[12].prodVotes,
                    game.products[13].prodVotes,
                    game.products[14].prodVotes,
                    game.products[15].prodVotes,
                    game.products[16].prodVotes,
                    game.products[17].prodVotes,
                    game.products[18].prodVotes,
                    game.products[19].prodVotes
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
            labels: [game.products[0].prodName, game.products[1].prodName, game.products[2].prodName, game.products[3].prodName,
                game.products[4].prodName, game.products[5].prodName, game.products[6].prodName, game.products[7].prodName,
                game.products[8].prodName, game.products[9].prodName, game.products[10].prodName, game.products[11].prodName,
                game.products[12].prodName, game.products[13].prodName, game.products[14].prodName, game.products[15].prodName,
                game.products[16].prodName, game.products[17].prodName, game.products[18].prodName, game.products[19].prodName
            ],
            datasets: [{
                label:'Percent Selected',
                backgroundColor: 'rgb(0, 0, 255)',
                stack: 'Stack 0',
                data: [
                    game.products[0].prodPercent,
                    game.products[1].prodPercent,
                    game.products[2].prodPercent,
                    game.products[3].prodPercent,
                    game.products[4].prodPercent,
                    game.products[5].prodPercent,
                    game.products[6].prodPercent,
                    game.products[7].prodPercent,
                    game.products[8].prodPercent,
                    game.products[9].prodPercent,
                    game.products[10].prodPercent,
                    game.products[11].prodPercent,
                    game.products[12].prodPercent,
                    game.products[13].prodPercent,
                    game.products[14].prodPercent,
                    game.products[15].prodPercent,
                    game.products[16].prodPercent,
                    game.products[17].prodPercent,
                    game.products[18].prodPercent,
                    game.products[19].prodPercent
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

        game.button.addEventListener('click', function () {
            game.activeObjects = [];
            game.activeImage = [];
            game.clickCounter = 0;

            const votesCanvas = document.getElementById('votes-canvas');
            votesCanvas.remove();

            const percentCanvas = document.getElementById('percent-canvas');
            percentCanvas.remove();

            const chartDiv = document.getElementById('chart-div');
            chartDiv.setAttribute('class', 'hidden');

            game.renderTable();
            game.renderImages();
            game.activateListener();
        });
    }
};

game.start();