


function validacija() {
    let input = document.querySelector('#email'); //Uzimamo input

    let value = input.value;  //Spremamo sto je upisano u input u varijablu

    if(value.includes('@') && value.includes('.')){ // Petlja potreban @ i .

        let pozicijaAt = value.indexOf('@'); //Uvarijablu spremamo poziciju na kojoj je @
        
        let pozicijaTocka = value.indexOf('.');//Uvarijablu spremamo poziciju na kojoj je .

        let izmeduAtTocke = value.substring(pozicijaAt + 1,pozicijaTocka)
       //Uzima vrijednost izmedu pozicija.Ne ukljucuje zadnju poziciju
        if(izmeduAtTocke.length > 0){
            //Dali izmedu @ i tocke ima vise od nula karaktera
           let prijeAt = value.substring(0,pozicijaAt);
            //Dali prije @ imamo vise od 2 karaktera
                if(prijeAt.length > 2){

                    let poslijeTocke = value.substring(pozicijaTocka + 1 ,value.length); //Value length posljednji karatkter u string (njegova duzina)
                    //Dali posle tocke imamo vise od jednog karaktera
                    if(poslijeTocke.length > 1){
                        console.log('Dobro JE posle.')
                    } else {
                        console.log('Nije dobro posle.')
                    }
                
                } else {
                    console.log('Nije dobro');
                }

        } else{
            console.log('Nije dobro');
        }

    }
}
        // console.log(value.substring(pozicijaAt + 1,pozicijaTocka));  Ispisujemo vrijednost izmedu @ i .(+ 1) znaci bez @