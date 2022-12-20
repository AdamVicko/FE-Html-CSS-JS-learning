


document.querySelector("#setCookie").addEventListener('click', e =>{ //UBACIVANJE COOKIA NA PRITISAK GUMBA RADI PRACENJA ISTEKA VREMENA
    e.preventDefault();

document.cookie = "name=ivo"; //ubacivanje cookia NEMA EXPIRE DATE

const date = new Date(); //date , novi date

let today = date.getTime(); //danasnje vrijeme 
let expires = 30 * 1000; //30 sekundi
//let expires = 2 * 24 * 60 * 60 * 1000; // da bi mogli stavit za kolko da istekne cookie moramo prebacit vrijeme(2 dana (48h)) u milisekunde (dodaje na trenutno vrijeme)
                                        //za kolko istice cookie u milisekundama (2 DANA TOCNO)

date.setTime(today + expires); //postavi vrijeme u date danasnje vrijeme

let new_date = date.toUTCString();// prevedeno u nas jezik UTC


document.cookie = `login=1; expires=${new_date}`; //obavezno back ticks kad ubacujes vrijednost varijable

console.log(document.cookie);
});