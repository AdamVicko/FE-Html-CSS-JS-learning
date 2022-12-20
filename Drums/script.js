

let crashRide = document.querySelector('#crash-ride'); //spremi sliku u crashRIde
let HiHatTop = document.querySelector('#hihat-top');// spremi sliku u HiHatTop

const animateCrashOrRide = () => { //Funkcija za malo pomjeranje elemenata
    crashRide.style.transform = 'rotate(0deg) scale(1.5)'; //Znanje css ulazi u igru mogucnost ubacivanja u JS
}

const animateHiHatClosed = () => { //Funkcija za malo pomjeranje elemenata
    HiHatTop.style.top = '171px';//Znanje css ulazi u igru mogucnost ubacivanja u JS
}



window.addEventListener("keydown",(event) => 
{ //window jer zelim da mi keydown bude aktivan na cijelom prozoru
    let code = event.keyCode; //varijabla code je broj gumba keya  66
    let keyElement = document.querySelector(`div[data-key="${code}"]`); // selektriamo div data-key

    if(!keyElement) return; //If ne postoji keyElement ne radi nista odnosno samo se vrati znaci ne pisi errore niti ista

    let audio = document.querySelector(`audio[data-key="${code}"]`); //audio je odreden na data-key gumba koji je stisnut
    audio.currentTime = 0; //Vrijeme trajanja audia na 0 znaci moguce stalno stiskat i dobivat zvuk
    audio.play();  // plai audio

    switch(code){ //Uslucaju da je Code 69 ili 82 napravi ovu funkciju
        case 69:
        case 82:
            animateCrashOrRide(); //funkcija
            break; // zavrsi kad se izvrsi
        case 75:
        case 73:
            animateHiHatClosed();//funkcija
            break;  // zavrsi kad se izvrsi
    }
    keyElement.classList.add('playing'); //dodaj klassu playing 
});


const removeCrashRideTransition = e => { // e je kao varijabla
    if(e.propertyName !== 'transform') return; //Ako se desi nesto sto nije transform prekidaj 

    e.target.style.transform = 'rotate(-7.2deg) scale(1.5)'; //Unaprijed izracunat pomak
}

const removeHiHatTopTransition = e => {// e je kao varijabla
    if(e.propertyName !== 'top') return; //Ako nije top prekidaj

    e.target.style.top = '166px'; //pomakni ga za 166pixela
}

const removeKeyTransition = e =>{ // e je kao varijabla 
    if(e.propertyName !== 'transform') return;//Ako se desi nesto sto nije transform prekidaj 
    e.target.classList.remove('playing') //ukini mu klasu playing
}

let drumKeys = document.querySelectorAll('key'); //svi koji imaju klasu key

drumKeys.forEach(key => {  
    key.addEventListener("transitionend", removeKeyTransition)
})
crashRide.addEventListener("transitionend", removeCrashRideTransition);
HiHatTop.addEventListener("transitionend", removeHiHatTopTransition);
