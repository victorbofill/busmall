'use strict';

const form = document.getElementById('settings-form');

let Settings = {prodShown: 3, rounds: 25};

if (localStorage.getItem('Settings')) {
    Settings = JSON.parse(localStorage.getItem('Settings'));
    form['prod-shown'].value = Settings.prodShown;
    form.rounds.value = Settings.rounds;
}

localStorage.setItem('Settings', JSON.stringify(Settings));

form.addEventListener('submit', function() {
    event.preventDefault();

    const Settings = JSON.parse(localStorage.getItem('Settings'));

    const newProdShown = this['prod-shown'].value;
    const newRounds = this.rounds.value;

    Settings.prodShown = newProdShown;
    Settings.rounds = newRounds;

    localStorage.setItem('Settings', (JSON.stringify(Settings)));

    location.reload();
});
