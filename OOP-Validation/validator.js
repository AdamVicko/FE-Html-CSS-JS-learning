//SAMO KOD KOJI JE VEZAN ZA KLASU

class Validator {
    constructor(config) { // ubacujemo config 
        this.elementsConfig = config;
        this.errors = {}; // errors kao prazan niz

        this.inputListener();
        this.generateErrorsObject();   
    }



//Funkcije
    generateErrorsObject() { //kod klase nemoramo pisati function prije funkcije
        for(let field in this.elementsConfig) { // field je elementi u configu (this ce bit onaj u koji trenutno pisemo)
            this.errors[field] = [];  //za svako polje u objektu pravimo prazan niz u koji cemo smjestiti greske
        }

    }

    inputListener() {
        let inputSelector = this.elementsConfig;
        for(let field in inputSelector) {

            let el = document.querySelector(`input[name="${field}"]`); // spremi sto pise u htmlu pod input name

            el.addEventListener('input', this.validate.bind(this));// za svaki (input) svako slovo upisano, upotrijebi funkciju validate 
        }                                                           // bind this ide da mozemo dobit koje je to polje u koje smo pisali
    }

    validate(e) { // e nam je za onaj element u koji smo pisali (preko bind this) dobili smo koje je to polje
        let elFields = this.elementsConfig; // uzeli smo sva polja opet
        
        let field = e.target; //trenutno polje 
        let fieldName = field.getAttribute('name'); //od trenutnog polje uzmi sta pise pod name
        let fieldValue = field.value;//ono sta pise u polju fieldu
    
        this.errors[fieldName] = []; // upisat cemo error za svaki field name

        if(elFields[fieldName].required) { //ako field name ima u sebi key required
            if(fieldValue === ' ') { //prazno ne razmak
                this.errors[fieldName].push('Polje je prazno'); //upisi u prazno polje za error poruku uglate zagrade []
            }
        }
    
        if(elFields[fieldName].drzava) {
            if(!this.validateLetters(fieldValue)) {
                this.errors[fieldName].push('Mozes koristiti samo slova!');
            }
        }

        if(elFields[fieldName].email) { //
            if(!this.validateEmail(fieldValue)) { // ako NIJE!! proslijedi funkciji validateEmail fieldValue
                this.errors[fieldName].push('Neispravna email adresa!');//ako NIJE error push
            }
        }

        if(fieldValue.length < elFields[fieldName].minlength || fieldValue.length > elFields[fieldName].maxlength) { // ili
            this.errors[fieldName].push(`Polje mora imati minimalno ${elFields[fieldName].minlength} i maksimalno ${elFields[fieldName].maxlength} karaktera!`);    
        }

        if(elFields[fieldName].matching) { // matching lozinke
            let matchingEl = document.querySelector(`input[name="${elFields[fieldName].matching}"]`);
            
            if(fieldValue !== matchingEl.value) {
                this.errors[fieldName].push("Lozinke se ne poklapaju!");
            }

            if(this.errors[fieldName].length === 0) { 
                this.errors[fieldName] = [];
                this.errors[elFields[fieldName].matching] = [];            
            }
        }

        this.populateErrors(this.errors);
    }

    populateErrors(errors) { // proslijedili smo joj this.errors
        for(const elem of document.querySelectorAll('ul')) {
            elem.remove();
        }

        for(let key of Object.keys(errors)) {
            let parentElement = document.querySelector(`input[name="${key}"]`).parentElement;
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement); //kreirNJE ul

            errors[key].forEach(error => {
                let li = document.createElement('li');
                li.innerText = error;

                errorsElement.appendChild(li); //popuni poruku sa error porukom
            });
        }
    }

    validateEmail(email) {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
        }
        return false;
    }

    validateLetters(drzava) {
        if(!/^[a-zA-Z]*$/g.test(drzava)) {
            return false;
        }
        return true;
    }
}

