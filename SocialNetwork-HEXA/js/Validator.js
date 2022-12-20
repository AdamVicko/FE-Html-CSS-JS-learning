
//Kod koji je vezan za klasu
class Validator {
	constructor(config, formID) {  // ubacujemo config i #registrationForm iz app.js-a
		this.elementsConfig = config;
		this.formID = formID;
		this.errors = {}; // errors su prazan niz za sad
		
		this.generateErrorsObject();
		this.inputListener();
	}

//FUNKCIJE
	generateErrorsObject() {
		for(let field in this.elementsConfig) { // field je elementi u configu (this ce bit onaj u koji trenutno pisemo)
			this.errors[field] = []; //za svaki field u objektu pravimo prazan niz u koji cemo smjestiti greske
		}
	}

	inputListener() {
		let inputSelector = this.elementsConfig; //trenutni field u koji pisemo

		for(let field in inputSelector) {
			let el = document.querySelector(`${this.formID} input[name="${field}"]`); // spremi sto pise u htmlu pod input name, od #registrationForm

			el.addEventListener('input', this.validate.bind(this));  // za svaki (input) svako slovo upisano, upotrijebi funkciju validate 
        }                                                           // bind this ide da mozemo dobit koje je to polje u koje smo pisali
	}

	validate(e) { // e nam je za onaj element u koji smo pisali (preko bind this) dobili smo koje je to polje
		let elFields = this.elementsConfig; // uzeli smo sva polja opet

		let field = e.target; //trenutno polje inputa
		let fieldName = field.getAttribute('name'); //od trenutnog polje uzmi sta pise pod name
		let fieldValue = field.value; //ono sta pise u polju fieldu
    
		this.errors[fieldName] = []; // upisat cemo error za svaki field name

		if(elFields[fieldName].required) { // ako bilo koji od svih fieldova, Name ima required
			if(fieldValue === '') {  //ako je ostavljeno prazno
				this.errors[fieldName].push('Polje nesmije biti prazno'); //ispisi ovu error poruku
			}
		}

		if(elFields[fieldName].drzava) {
            if(!this.validateLetters(fieldValue)) {
                this.errors[fieldName].push('Mozes koristiti samo slova!');
            }
        }

		if(elFields[fieldName].email) {
			if(!this.validateEmail(fieldValue)) { //ako vrati false
				this.errors[fieldName].push('Neispravna email adresa');
			}
		}

		if(fieldValue.length < elFields[fieldName].minlength || fieldValue.length > elFields[fieldName].maxlength) {
			this.errors[fieldName].push(`Polje mora imati minimalno ${elFields[fieldName].minlength} i maksimalno ${elFields[fieldName].maxlength} karaktera`);
		}

		if(elFields[fieldName].matching) {
			let matchingEl = document.querySelector(`${this.formID} input[name="${elFields[fieldName].matching}"]`);

			if(fieldValue !== matchingEl.value) {
				this.errors[fieldName].push('Lozinke se ne poklapaju');
			}

			if(this.errors[fieldName].length === 0) { //isprazni poruke errora
				this.errors[fieldName] = [];
				this.errors[elFields[fieldName].matching] = [];
			}
		}

		this.populateErrors(this.errors); // unutar funkcije validate popunit cemo errore odnosno ispisati poruke
	}

	validationPassed() {
		for(let key of Object.keys(this.errors)) {
			if(this.errors[key].length > 0) {
				return false;
			}
		}

		return true;
	}
//HTML
	populateErrors(errors) { // proslijedujemo zadani error message
		for(const elem of document.querySelectorAll('ul')) {
			elem.remove();
		}

		for(let key of Object.keys(errors)) {
			let parentElement = document.querySelector(`${this.formID} input[name="${key}"]`).parentElement;
			let errorsElement = document.createElement('ul');
			parentElement.appendChild(errorsElement);

			errors[key].forEach(error => {
				let li = document.createElement('li');
				li.innerText = error;

				errorsElement.appendChild(li); //html popunili s error porukom
			});
		}
	}
//
	validateEmail(email) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
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