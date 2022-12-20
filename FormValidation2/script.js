let inputs = document.querySelectorAll(`input`); //svi inputi

let errors = {  //svaka vrsta errora(u array se sprema)
    "ime_prezime": [], //key i value
    "korisnicko_ime": [], //key i value
    "email": [],  //email = key, value u []
    "lozinka": [],
    "ponovi_lozinku": []
};

inputs.forEach((element) => { // za svako polje inputa(elementa)
    
    element.addEventListener(`change`, e => { //na bilo kakvu promjenu na polju trigeruj eventlistener E = event
        let currentinput = e.target; // ukratko[sto smo napisali u polje postaje current input] ono sto je trigeralo listener E = event
        let inputvalue = currentinput.value; //vrijednost currentinputa
        let inputname = currentinput.getAttribute(`name`);// od current inputa uzmi attribute name HTML

        if(inputvalue.length > 4)
        {
            errors[inputname] = []; // za svaki input isprazni taj error value

            switch(inputname)
            {

                case `ime_prezime`: //slucaj da je IME_PREZIME
                    let validation = inputvalue.trim();//trimuj sa strane znaci makni razmake na pocetku i kraju (radimo prije svega)
                    validation = validation.split(" "); //prepolovi vrijednost na razmaku (na svaki razmak dodaje length)
                    if(validation.length < 2)
                    {
                        errors[inputname].push(`Moras napisati i ime i prezime!`);//pomocu pusha ubacujemo u erorrs inputname nam je key a text poslije pusha je value
                    }
                break;

                case `email`:
                    if(!validateemail(inputvalue)) //stavljamo usklicnik prije poziva funkcije kako bi dobili kontra znaci u slucaju da nije
                    {
                        errors[inputname].push(`Neispravna email adresa!`);
                    }
                break;
                
                case`ponovi_lozinku`:
                    let lozinka = document.querySelector(`input[name="lozinka"]`).value;
                    if(inputvalue !== lozinka)
                    {
                        errors[inputname].push(`Lozinke se ne poklapaju!`);
                    }
                break;
            }
        }
        else
        {
            errors[inputname] = [`Polje nemoze imati manje od 5 karaktera!!!`];
        }

        populateerrors();
        
    });
});

const populateerrors = () => { //funkcija popunjavanja erorra 

    for(let elem of document.querySelectorAll(`ul`)){ //izbrisi ul tako da ne stack-a jedno ispod drugog
        elem.remove();
    }

    for(let key of Object.keys(errors)) { // errors ima 5 keyeva
        let input = document.querySelector(`input[name="${key}"]`); //input HTML name spremi kao key
        let parentelement = input.parentElement; // vraca mi cijeli div
        let errorselement = document.createElement(`ul`); //ul kreiran za errore
        parentelement.appendChild(errorselement); //napravi u divu(parentelement) child element (errorselement)

        errors[key].forEach(error => {  // za svaki key u errorsu
            let li = document.createElement(`li`); //napravi listu li
            li.innerText = error;

            errorselement.appendChild(li); //u ul-u mi napravi li listu
        });
    }; 
};


const validateemail = email => { //regix za validaciju emaila
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) 
    {
        return true; // ako je if onda vrati true
    }

    return false;//ako nije if
}