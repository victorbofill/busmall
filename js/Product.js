'use strict';

function Product (prodName, prodImage) { // eslint-disable-line
    this.prodName = prodName,
    this.prodImage = prodImage,
    this.prodVotes = 0,
    this.prodRendered = 0;
    this.prodPercent = 0;
};