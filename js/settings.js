'use strict';
const form = document.getElementById('settings-form');

form.addEventListener('submit', function() {
    event.preventDefault();

    const prodShown = this['prod-shown'].value;
    const rounds = this.rounds.value;
});