
//Kreiranje klase 
class User {
    userID = '';
    username = '';
    country = '';
    email = '';
    password = '';
    apiURL ='https://63135461b466aa9b03975b5b.mockapi.io';


    //Funkcije
    
    create() { // kada registriramo korisnika prebaci ga na pocetnu stranicu (dok god vrijedi cookie)
        let data = {
            username: this.username,
            country: this.country,
            email: this.email,
            password: this.password
        }

        data = JSON.stringify(data); // data element u JS pretvaramo u JSON

        fetch(this.apiURL + '/users', {  //fetch = ubaci u (apijev url + users)
            method: 'POST', //kreiraj (stvori) u tabeli users
            headers: {
                'Content-Type': 'application/json'
            },
            body: data // data nam je sad u MOCKAPI-u , svaki data je sad povlacenje iz mockapia
        })
        .then(response => response.json()) //analizing json and sending response
        .then(data => {

            let session = new Session(); // napravi novi cookie
            session.userID = data.id; // cookie pod user id kojije vracen iz mockapia a data.id je ovaj ovdje
            session.startSession(); // aktiviraj cookie

            window.location.href = `hexa.html`; //open window
        })
    }

    //*************
    //FUNKCIJA GET ZA DOHVACANJE TRENUTNOG KORISNIKA ZBOG UCITAVANJA PROFILA


    /*ASINKRONI DIO JS-a odnosno funkcija sa asinkronim elementima fetch koji nece funkcionirat u ovom slucaju
    //jer nije napisana na asinkroni nacin
    get(userID) {  //trazi po userid-u
        let apiURL = this.apiURL + '/users/' + userID; //udi u api pod users i dohvati id

            //preskace ovu radnju ODNOSNO dok se ta radnja izvrsava on prelazi na sljedecu, hexa.js trazi da popuni username i email s innertext
            //kojeg NEMA jer ga nije stigao ucitat ovdje return data je prazan 
            fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                return data;
            })
        }
        ******/


        //ASINKRONA FUNKCIJA GET ZA DOHVACANJE PODATAKA O TRENUTNOM ULOGIRANOM KOSRISNIKU

        async get(userID) { //oznacavam funkciju kao asinkronu zbog await-a
            let apiURL = this.apiURL + '/users/' + userID; //udi u api pod users i dohvati id

            let response = await fetch(apiURL); //CEKAJ ODGOVOR
            let data = await response.json(); //CEKAJ ODGOVOR
    
            return data;
        }
              
//EDIT USER IZ HEXA ACCOUNT POPUP

    edit() {
        let data = { 
            username: this.username, // proslijedeni username
            email: this.email // proslijedeni email
        };


        data = JSON.stringify(data); // pretvaramo u json
        

        let session = new Session();// uvijek preko sessiona uzimamo user id trenutnog korisnika jer je on sacuvan u cookieu
        session_id = session.getSession(); // funkcija get session
        

        fetch(this.apiURL + '/users/' + session_id, { //mjenjamo samo sessionid ulogiranog korisnika
            method: 'PUT', //mjenjamo podatke pa je metoda PUT
            headers: {
                'Content-Type': 'application/json' // da zna da saljemo json
            },
            body: data // sadrzaj koji saljemo je data
        })
        .then(response => response.json())
        .then(data => {  //redirekt na isto stranicu odnosno refresh
            window.location.href = 'hexa.html'
        });
    }


//PROVJERA PODATAKA IZ MOCKAPI-a ZA LOG IN
    login() {
        fetch(this.apiURL + '/users') //uzimamo sve korisnike iz API tabele users
        .then(response => response.json()) //samo uzimamo podatke ne treba pisat get(method) pisemo je samo kad je post, delete
        .then(data => {

            let login_succes = 0; //flag
            

            data.forEach(db_user => { // za svaki user u data base u mockapi-u 

                if(db_user.email === this.email && db_user.password === this.password) { //ako je ovaj email isti kao bilo koji u data base-u i sifra
                    
                    let session = new Session();
                    session.userID = db_user.id;
                    session.startSession();
                    login_succes = 1;
                    window.location.href = 'hexa.html';
                }
            });
                
            if(login_succes === 0) {

                alert('Pogresan email ili lozinka'); //Poslje ovog mi prebaci nazad na hexa.html a treba na index.html!!
            }
        });
    }

    //DELETE PROFILE FUNCTION**********
    delete() {
        let session = new Session();
        session_id = session.getSession();

        fetch(this.apiURL + '/users/' + session_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            let session = new Session();
            session.destroySession(); //ako korisnik izbrise profil birsemo i njegov cookie

            window.location.href = "/";
        });
    }


} 