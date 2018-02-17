'use strict';

function Product (prodName, prodImage) {
    this.prodName = prodName;
    this.prodImage = prodImage;
    this.prodVotes = 0;
    this.prodRendered = 0;
    this.prodPercent = 0;
    this.prodIndividVotes = 0;
    this.prodIndividRendered = 0;
};

const game = {
    start: function() {
        game.products;
        game.activeObjects = [];
        game.activeImage = [];
        game.clickCounter = 0;
        game.previousImages = [];
        game.votingElement = document.getElementById('voting');
        game.graphElements = [
            document.getElementById('chart-container'),
            document.getElementById('individ-div'),
            document.getElementById('votes-div'),
            document.getElementById('percent-div')
        ];
        game.pElements = [
            document.getElementById('individ-p'),
            document.getElementById('votes-p'),
            document.getElementById('percent-p'),
        ];
        game.minimizeDivs = [];
        game.buttonElements = [
            document.getElementById('restart-button'),
            document.getElementById('clear-button')
        ];

        if (localStorage.getItem('Settings')) {
            game.Settings = JSON.parse(localStorage.getItem('Settings'));
        } else {
            game.Settings = {prodShown: 3, rounds: 25};
        }

        if (localStorage.getItem('products')) {
            game.products = JSON.parse(localStorage.getItem('products'));
        } else {
            game.createProducts();
        }

        for (let i = 0; i < game.products.length ; i++) {
            game.products[i].prodIndividVotes = 0;
            game.products[i].prodIndividRendered = 0;
        };

        for (let i = 0; i < game.pElements.length; i++ ) {
            game.pElements[i].addEventListener('click', game.minimizeChart);
        }

        if (game.votingElement.classList.contains('hidden')) {
            console.log(game.graphElements[0]);
            game.graphElements[0].classList.toggle('hidden');
            for (let i = 0; i < game.votingElement.length; i++ ) {
                game.votingElement[i].classList.toggle('hidden');
            }
        };

        game.createTable();
        game.renderImages();
        game.activateImageListeners();
    },

    reset: function () {
        game.activeObjects = [];
        game.activeImage = [];
        game.clickCounter = 0;
        game.previousImages = [];

        for (let i = 0; i < game.products.length ; i++) {
            game.products[i].prodIndividVotes = 0;
            game.products[i].prodIndividRendered = 0;
        };

        document.getElementById('footer').textContent = '';

        game.graphElements[0].classList.toggle('hidden');
        game.votingElement.classList.toggle('hidden');

        document.getElementById('individ-canvas').remove();
        document.getElementById('votes-canvas').remove();
        document.getElementById('percent-canvas').remove();

        game.renderImages();
    },

    createProducts: function() {
        game.products = [];
        game.products.push(new Product('R2-D2 Bag', 'bag.jpg'));
        game.products.push(new Product('Banana Slicer', 'banana.jpg'));
        game.products.push(new Product('TP Tablet Stand', 'bathroom.jpg'));
        game.products.push(new Product('Boots', 'boots.jpg'));
        game.products.push(new Product('Breakfast Machine', 'breakfast.jpg'));
        game.products.push(new Product('Meatball Bubblegum', 'bubblegum.jpg'));
        game.products.push(new Product('Silly Chair', 'chair.jpg'));
        game.products.push(new Product('Cthulhu', 'cthulhu.jpg'));
        game.products.push(new Product('Dog Duck Lips', 'dog-duck.jpg'));
        game.products.push(new Product('Dragon Meat', 'dragon.jpg'));
        game.products.push(new Product('Utensil Pen', 'pen.jpg'));
        game.products.push(new Product('Pet Sweeping Shoes', 'pet-sweep.jpg'));
        game.products.push(new Product('Pizza Scissors', 'scissors.jpg'));
        game.products.push(new Product('Shark Sleeping Bag', 'shark.jpg'));
        game.products.push(new Product('Baby Sweeping Suit', 'sweep.png'));
        game.products.push(new Product('Tauntuan Sleeping Bag', 'tauntaun.jpg'));
        game.products.push(new Product('Unicorn Meat', 'unicorn.jpg'));
        game.products.push(new Product('Tentacle USB Stick', 'usb.gif'));
        game.products.push(new Product('Silly Wattering Can', 'water-can.jpg'));
        game.products.push(new Product('Drunk Proof Wineglass', 'wine-glass.jpg'));
    },

    createTable: function() {
        const tr = document.getElementById('vote-table');

        for (let i = 0; i < JSON.parse(game.Settings.prodShown); i++) {
            const td = document.createElement('td');
            tr.appendChild(td);

            const img = document.createElement('img');
            td.appendChild(img);
            img.setAttribute('id', (i));
        };

    },

    renderImages: function() {
        let i = 0;
        while (game.activeObjects.length < (game.Settings.prodShown)) {
            const randomNumber = Math.floor(Math.random() * (game.products.length));
            const randomProduct = (game.products[randomNumber]);

            randomProduct.prodRendered += 1;
            randomProduct.prodIndividRendered += 1;

            if (game.activeObjects.includes(randomProduct)) continue;
            if (game.previousImages.includes(randomProduct)) continue;

            game.activeObjects.push(randomProduct);

            const img = document.getElementById((i));
            img.setAttribute('src', 'img/' + game.activeObjects[i].prodImage);
            game.activeImage.push(img);
            i++;
        }
    },

    activateImageListeners: function () {
        const table = document.getElementById('vote-table');

        table.addEventListener('click', function () {
            const clickedImage = event.target;

            const footer = document.getElementById('footer');

            const clickProcess = function(clickedImage) {
                game.activeObjects[clickedImage].prodVotes += 1;
                game.activeObjects[clickedImage].prodIndividVotes += 1;
                game.previousImages = game.activeObjects;
                game.activeObjects = [];

                game.activeImage = [];

                game.clickCounter++;
                footer.textContent = 'Choices: ' + game.clickCounter + ' out of ' + game.Settings.rounds;

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

            if (clickedImage === game.activeImage[3]) {
                clickProcess(3);
            };

            if (clickedImage === game.activeImage[4]) {
                clickProcess(4);
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
        game.votingElement.classList.toggle('hidden');

        game.graphElements[0].classList.toggle('hidden');

        let newCanvas = document.createElement('canvas');
        newCanvas.setAttribute('id', 'individ-canvas');
        newCanvas.setAttribute('width', '200px');
        newCanvas.setAttribute('height', '100px');
        game.graphElements[1].appendChild(newCanvas);
        const ctxIndivid = newCanvas.getContext('2d');

        newCanvas = document.createElement('canvas');
        newCanvas.setAttribute('id', 'votes-canvas');
        newCanvas.setAttribute('width', '200px');
        newCanvas.setAttribute('height', '100px');
        game.graphElements[2].appendChild(newCanvas);
        const ctxVotes = newCanvas.getContext('2d');

        newCanvas = document.createElement('canvas');
        newCanvas.setAttribute('id', 'percent-canvas');
        newCanvas.setAttribute('width', '200px');
        newCanvas.setAttribute('height', '100px');
        game.graphElements[3].appendChild(newCanvas);
        const ctxPerc = newCanvas.getContext('2d');

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

        const voteChart = new Chart (ctxVotes, { // eslint-disable-line
            type: 'bar',
            data: voteData,
            options: {
                title: {
                    display: true,
                    text: 'Total Times Appeared and Selected'
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
                    text: 'Percentage of Times Selected'
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

        const individVoteData = {
            labels: [game.products[0].prodName, game.products[1].prodName, game.products[2].prodName, game.products[3].prodName,
                game.products[4].prodName, game.products[5].prodName, game.products[6].prodName, game.products[7].prodName,
                game.products[8].prodName, game.products[9].prodName, game.products[10].prodName, game.products[11].prodName,
                game.products[12].prodName, game.products[13].prodName, game.products[14].prodName, game.products[15].prodName,
                game.products[16].prodName, game.products[17].prodName, game.products[18].prodName, game.products[19].prodName
            ],
            datasets: [{
                label:'Individual Times Rendered',
                backgroundColor: 'rgb(225, 0, 0)',
                stack: 'Stack 0',
                data: [
                    game.products[0].prodIndividRendered,
                    game.products[1].prodIndividRendered,
                    game.products[2].prodIndividRendered,
                    game.products[3].prodIndividRendered,
                    game.products[4].prodIndividRendered,
                    game.products[5].prodIndividRendered,
                    game.products[6].prodIndividRendered,
                    game.products[7].prodIndividRendered,
                    game.products[8].prodIndividRendered,
                    game.products[9].prodIndividRendered,
                    game.products[10].prodIndividRendered,
                    game.products[11].prodIndividRendered,
                    game.products[12].prodIndividRendered,
                    game.products[13].prodIndividRendered,
                    game.products[14].prodIndividRendered,
                    game.products[15].prodIndividRendered,
                    game.products[16].prodIndividRendered,
                    game.products[17].prodIndividRendered,
                    game.products[18].prodIndividRendered,
                    game.products[19].prodIndividRendered
                ]},
            {label: 'Individual Times Selected',
                backgroundColor: 'rgb(0, 225, 0)',
                stack: 'Stack 0',
                data: [
                    game.products[0].prodIndividVotes,
                    game.products[1].prodIndividVotes,
                    game.products[2].prodIndividVotes,
                    game.products[3].prodIndividVotes,
                    game.products[4].prodIndividVotes,
                    game.products[5].prodIndividVotes,
                    game.products[6].prodIndividVotes,
                    game.products[7].prodIndividVotes,
                    game.products[8].prodIndividVotes,
                    game.products[9].prodIndividVotes,
                    game.products[10].prodIndividVotes,
                    game.products[11].prodIndividVotes,
                    game.products[12].prodIndividVotes,
                    game.products[13].prodIndividVotes,
                    game.products[14].prodIndividVotes,
                    game.products[15].prodIndividVotes,
                    game.products[16].prodIndividVotes,
                    game.products[17].prodIndividVotes,
                    game.products[18].prodIndividVotes,
                    game.products[19].prodIndividVotes
                ]
            }],
        };

        const individVote = new Chart (ctxIndivid, { // eslint-disable-line
            type: 'bar',
            data: individVoteData,
            options: {
                title: {
                    display: true,
                    text: 'Individual Selections'
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
        individVote.update();

        game.buttonElements[0].addEventListener('click', game.reset);
        game.buttonElements[1].addEventListener('click', game.clearData);
    },

    minimizeChart: function () {
        const minimizer = event.target;

        if (minimizer === game.pElements[0]) {
            game.graphElements[1].classList.toggle('hidden');
        };

        if (minimizer === game.pElements[1]) {
            game.graphElements[2].classList.toggle('hidden');
        };

        if (minimizer === game.pElements[2]) {
            game.graphElements[3].classList.toggle('hidden');
        };
    },

    clearData: function () {
        const clear = confirm('This will PERMANENTLY delete all data! Are you sure that you want to do this?');
        if (clear === true) {
            localStorage.clear();
            alert('All local data has been cleared.');
            game.reset();
        }
    }
};

game.start();