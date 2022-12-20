
//COOKIE redirect to web page
let session = new Session(); // u sesiju mi spremi novu klasu Sesija
    session = session.getSession(); //DOHVATI TRENUTNU SESSIJU OD COOKIA

    if(session !== "") { // ako je cookie popunjen redirect na pocetnu 
        window.location.href = "hexa.html";
    }

//Kraca verzija koda

document.querySelector(`#registracija`).addEventListener(`click`, () => {
    document.querySelector(`.custom-modal`).style.display = `block`
});

document.querySelector(`#closeModal`).addEventListener(`click`, () => {
    document.querySelector(`.custom-modal`).style.display = `none`
});

/* Duza verzija koda

let btnmodalpopup = document.querySelector(`#registracija`);
btnmodalpopup.addEventListener(`click`, () => {
    let customodal = document.querySelector(`.custom-modal`);
    customodal.style.display = `block`;
});


let closemodalpopup = document.querySelector(`#closeModal`);
closemodalpopup.addEventListener(`click`, () => {
    let custommodal = document.querySelector(`.custom-modal`);
    custommodal.style.display = `none`;
})

*/

//SAMO PROMJENJIVI KOD CIJE CEMO DIJELOVE PROSLIJEDITI VALIDATORU ************************
let config = {
    'korisnicko_ime': { // ime fielda
        required: true,
        minlength: 5,
        maxlength: 50
    },
    'drzava': { // ime fielda
		required: true,
        minlength: 3,
        maxlength:30,
        drzava: true
    },
    'register_email': { //ime fielda...
        required: true,
        email: true,
        minlength: 5,
        maxlength: 50
    },
    'register_lozinka': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'ponovi_lozinku'
    },
    'ponovi_lozinku': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'register_lozinka'
    }
};
//********************************

//PROVJERA VALIDACIJA UNESENIH PODATAKA U HTML REGISTRACIJU
let validator = new Validator(config, '#registrationForm'); // proslijedivanje u klasu validator (registrationForm je formID u HTML-u)

document.querySelector(`#registrationForm`),addEventListener(`submit`, e => { // na button 
    e.preventDefault(); //SPRJECAVAMO REFRESH
    if(validator.validationPassed()) {
        
        let user = new User();
        user.username = document.querySelector('#korisnicko_ime').value; //uzimamo id iz htmla
        user.country = document.querySelector('#drzava').value
        user.email = document.querySelector('#email').value; // id iz htmla
        user.password = document.querySelector('#lozinka').value; // id iz htmla

        user.create(); // kreiraj

    } else {
        alert('Polja nisu dobro popunjena!')
    }
});


//LOGIN *******************
document.querySelector(`#loginform`).addEventListener(`submit`, e => {
    e.preventDefault;

    let lemail = document.querySelector('#login_email').value; //html login email id (input polja)
    let lpassword = document.querySelector('#login_lozinka').value; // html login lozinka id (input)

    let user = new User(); // objekt nazvan user, spremi upisano 
    user.email = lemail; //proslijedujemo funkciji email i password
    user.password = lpassword;
    user.login();
})


