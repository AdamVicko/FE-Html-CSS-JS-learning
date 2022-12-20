function inflationCalculator() {

let stopainflacije = document.querySelector('#inflationRate');
let money = document.querySelector('#money')
let years = document.querySelector('#years').value;  //Ovdje odma uzimamo vrijednost na mjestu varijable


stopainflacije = parseFloat(stopainflacije.value);
money = parseFloat(money.value);
years = parseFloat(years);  //Ne pisemo value


//Formula za izracunavanje inflacije.ZA JEDNU GODINU
let worth = money + (money * (stopainflacije / 100));
//Sad ubacujemo petlju za zeljeni broj godina
for (let i = 1; i < years; i++){  // i je 1 jer smo vec izracunali za prvu godinu
    worth += worth * (stopainflacije / 100)
}

worth = worth.toFixed(2); //Broj decimala stvaljamo na 2

let newElement = document.createElement('div'); //Stvaramo novi Element tipa DIV u Html-u 
    newElement.className = 'new-value'; //Dodajemo classu tom divu
    newElement.innerText = `Danasnjih ${money}eura vrijedi isto kao ${worth}eura za ${years}godina.` // Pisemo inner text u tay div (p)

document.querySelector('.container').appendChild(newElement); //Nas newElement ubacujemo na dno containera

}