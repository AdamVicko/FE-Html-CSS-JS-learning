let i = 0;//Alert

function Gledaj(element) {

    
   
    let mainEl = element.closest('.single-item');
    let price = mainEl.querySelector('.price').innerText;
    let totalMoney = document.querySelector('.allMoney').innerText;
    
        element.innerText = 'Watched'; //Mjenja unutarnji text gumba element na pocetku oznacen kao element 
        element.setAttribute('disabled', 'true'); //Dodavanje HTML atributa 2 argumenta potrebna 
        element.style.backgroundColor="black"; //Mjenjaj boju gumba u crnu

        totalMoney = parseInt(totalMoney);

    price = parseInt(price);

    totalMoney += price; 

    document.querySelector('.allMoney').innerText = totalMoney;
    
    mainEl.style.backgroundColor="grey"; //Mjenjam boju cijelog filma u sivu ako je pogledan

    i ++; //Alert
    if(i === 4){
        alert('You have watched the whole movie library and paid a hefty price for a MOVIES :)')
    }
   
      
}



