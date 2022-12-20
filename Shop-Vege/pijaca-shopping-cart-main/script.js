
let allTotal = 0;

function addToCart(element){

    let mainEl = element.closest('.single-item'); /*Najblizu klasu single-item mi spremi u mainEl(znaci sve sto mi treba je u mainEL-u)
                                                    zbog THIS u element mi sprema bas stisnuti gumb pa po njemu trazi closest*/
    let price = mainEl.querySelector('.price').innerText; //Iz mainEl potrazi klasu price i iz nje inner text spremi u price
                                 //let input = (element.previousElementSibling); U input spremi prosli element tipa div, input,button itd
    let name = mainEl.querySelector('h3').innerText;
    let quantity = mainEl.querySelector('input').value; // Iz inputa izvlacim value !NE INNERTEXT!
    let cartItems = document.querySelector('.cart-items'); //Cijeli kart items div znaci sve u njemu 


    if(parseInt(quantity) > 0){

        price = price.substring(1);//Ukljucuje mi string tek poslje nultog odnosno od prvog karaktera (0,1,2,3,4,5...)
        price = parseInt(price); //Price prebaci iz stringa u number

        let total = price * parseInt(quantity);//Cijene pomnozena s kolicinom 

        allTotal += total;
        console.log(typeof(price));
       
        cartItems.innerHTML += `<div class="cart-single-item">
                                    <h3>${name}</h3>
                                    <p>$${price} x ${quantity} = $<span>${total}</span></p>
                                    <button onclick="removeFromCart(this)" class="remove-item">Ukloni</button>
                                </div>`;  //Nadodavanje kupljenih stvari +=, da je samo  = brisao bi poslje sljedeceg dodavanja
                                        //Stavljamo span kod totala da bi ga lakse poslje uklonili odnosno oduzeli od alltotala
                                        //Button button na klik otvara novu funkciju i uzima THIS cart-single-item
        
        document.querySelector('.total').innerText = `Total: $${allTotal}` //U div klase total upisujemo zbroj svih cijena 
        
        element.innerText = 'Dodato'; //Mjenja unutarnji text gumba element na pocetku oznacen kao element 
        element.setAttribute('disabled', 'true'); //Dodavanje HTML atributa 2 argumenta potrebna 
    }  else{
       
        alert('Odaberi kolicinu')

    }
}

function removeFromCart(element){
    let mainEl = element.closest('.cart-single-item');//mainEl mi je opet cijeli div cart-single-item sam stvara cart-single-item pri dodavanju
    let price = mainEl.querySelector('p span').innerText;// Price mi je u mainEl-u paragraph i u njemu span text
    let name = mainEl.querySelector('h3').innerText;//Name mi je naslov pod h3
    let vegetables = document.querySelectorAll('.single-item');// Cijeli div single item mi je vegetables


    price = parseInt(price);

    allTotal -= price;

    document.querySelector('.total').innerText = `Total: $${allTotal}`; //Mjenjam odnosno oduzimam i ispisujem total
       
    mainEl.remove();//Izbrisi mi cijeli "cart single item"


    vegetables.forEach(function(vege){ //Za svaki singleitem
        let itemName = vege.querySelector('.si-content h3').innerText;// Spremam u itemNAME h3 radi mogucnosti uporedbe kasnije
        
        if(itemName === name){ //Ako mi je u ovoj funkciji itemName jednak name-u 
            vege.querySelector('.actions input').value = 0;  //Resetiraj input
            vege.querySelector('.actions button').removeAttribute('disabled');//Vrati gumb
            vege.querySelector('.actions button').innerText = 'Dodaj';//Vrati text gumba
        }
    })
}