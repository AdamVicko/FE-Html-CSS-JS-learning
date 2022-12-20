
document.querySelector('#fetchBtn').addEventListener('click', e => {
    e.preventDefault();

    let id = document.querySelector('#userID').value;

    console.log(id);

    let r = fetch('https://630f9f2e36e6a2a04ede7669.mockapi.io/api/Users/' + id).then //dohvati zadani url s endpointom na Users + jos gledaj samo id koji smo upisali
                                                                            //fetch funkcija nam daje obecanje da ce ici na taj url i trazit podatke (kasnije cemo ih povuc)
        (response => response.json()).then(data => { // zbog asinkronog sistema koda pisemo then odma u nastavku funkcije odonosno zahtjevamo nastavak rada odma
            console.log(data);   //response funkcija vraca podatke koji su se dohvatili (data u Users + id) trazenje podatka po unesenom idu

            let podaci = document.querySelector('#podatci');  //html id podatci

            podaci.innerHTML = `<p><b>${data['Email']}</b></p>  
                                <p>${data['UserName']}</p>
                                <p><i>${data['Password']}</i></p>`; //u taj div podatci upisi zadano

        }).catch(error => {  //ako se desi error u alertu mi ispisi tu vrstu errora
            console.log('Nema internetske veze!');
        });
//u slucaju da nema interneta izbacuje- crbug/1173575, non-JS module files deprecated. - 
//ne ispisuje uhvaceni error vjerovatno zbog VSC-a local host 5500

});
//https://630f9f2e36e6a2a04ede7669.mockapi.io/api/:endpoint  
//mockAPI stranica za pravljenje jednostavnih apia 

