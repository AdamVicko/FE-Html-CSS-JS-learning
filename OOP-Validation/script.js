//SAMO PROMJENJIVI KOD CIJE CEMO DIJELOVE PROSLIJEDITI VALIDATORU
let config = {
    'ime_prezime': {
        required: true,
        minlength: 3,
        maxlength: 50
    },
    'korisnicko_ime': {
        required: true,
        minlength: 5,
        maxlength: 50
    },
    'drzava': {
		required: true,
        minlength: 3,
        maxlength:30,
        drzava: true
    },
    'email': {
        required: true,
        email: true,
        minlength: 5,
        maxlength: 50
    },
    'broj_telefona': {
        minlength: 9,
        maxlength: 33
    },
    'lozinka': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'ponovi_lozinku'
    },
    'ponovi_lozinku': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'lozinka'
    }
};

let validator = new Validator(config); // proslijedivanje u klasu validator