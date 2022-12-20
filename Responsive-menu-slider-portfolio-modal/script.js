
/*responisve MENU*/

let btn = document.querySelector(`.header button`); 
btn.addEventListener(`click`, () => {
    let menu = document.querySelector(`.header ul`);
    

    if(btn.innerText === `MENU`)
    {
        menu.style.display = `block`;
        btn.innerText = `CLOSE`; //uNUTARNJI TEXT GUMBA NEK PISE CLOSE

    }
    else
    {
        menu.style.display = `none`;
        btn.innerText = `MENU`;
    }
})



/*Galerija slika*/

let rightbtn = document.querySelector(`#right-btn`);
let lefttbtn = document.querySelector(`#left-btn`);
let pictures = document.querySelectorAll(`.slider-images img`); //Zabiljezi sve slike u pictures

let imgnum = 0; //broj slike

//Slike u desno >
const moveright = () => { //DESNA STRELICA
    displayNone(pictures); //na click pozovi funkciju na pictures ne pokazuj ni jednu
    imgnum++;

    if(imgnum === pictures.length)
    {
        imgnum = 0;
    }
    pictures[imgnum].style.display = `block`; // za sliku pod brojem imgnum display block pokazi ju
}
//Slike u lijevo <
const moveleft = () => { //LIJEVA STRELICA
    displayNone(pictures); //na click pozovi funkciju na pictures ne pokazuj ni jednu
    imgnum--;

    if(imgnum === -1)
    {
        imgnum = 2;
    }
    pictures[imgnum].style.display = `block`; // za sliku pod brojem[imgnum] display block "pokazi ju"
}

//Event listeneri za strelice
rightbtn.addEventListener(`click`, moveright);

lefttbtn.addEventListener(`click`, moveleft);


/*Funkcija sakriva sve slike*/
const displayNone = () =>{
    pictures.forEach((img) => {
        img.style.display = `none`;
    })
}



//PORTFOLIO

//EVENT LISTENER  
let categorybutton = document.querySelectorAll(`.portfolio-categories button`); //svi gumobovi u portfolio-categories

categorybutton.forEach(button => { //za svaki gumb u node listu
    button.addEventListener(`click`, () => { //eventlistener na klik 
        
        let category = button.getAttribute(`data-category`); //na gumb ucitaj data category i spremi
        let portfolioitems = document.querySelectorAll(`.portfolio-single-item`); //svaki spremi u portfolioitems
        
        portfolioitems.forEach((item) => { //forEach za svaki od itema 
            item.style.display = `none`; //ne prikazuj niti  jedan
        });
        //Za gumb SVE
        if(category === `sve`)  //ako je category varijabla jednaka stringu "sve" 
            {
                portfolioitems.forEach((item) => {
                item.style.display = `block`; //prikazi svaki
                });
            }
        //zA OSTALE GUMBOVE
        portfolioitems.forEach((item) => { //prolazi kroz svaki data-category atribut itema
            if(item.getAttribute(`data-category`).includes(category)) { //ako itemov  data-category atribut ima vrijednost koja je i u varijabli category
                item.style.display = `block`; // pokazi taj item
            }
        });
    });
});



//MODAL1
let btnpopmodal1 = document.querySelector(`#m1`);
btnpopmodal1.addEventListener(`click`, () => {
    let modalwind = document.querySelector(`.popup-modal1`);
    let overlay = document.querySelector(`.overlay`);
    modalwind.style.display = `block`;
    overlay.style.display = `block`;
})

let btnclosemodal1 = document.querySelector(`.popup-modal1 button`);
btnclosemodal1.addEventListener(`click`, () => {
    let modalwind = document.querySelector(`.popup-modal1`);
    let overlay = document.querySelector(`.overlay`);
    modalwind.style.display = `none`;
    overlay.style.display = `none`;
})
//MODAL2

let btnpopmodal2 = document.querySelector(`#m2`);
btnpopmodal2.addEventListener(`click`, () => {
    let modalwind = document.querySelector(`.popup-modal2`);
    let overlay = document.querySelector(`.overlay`);
    modalwind.style.display = `block`;
    overlay.style.display = `block`;
})

let btnclosemodal2 = document.querySelector(`.popup-modal2 button`);
btnclosemodal2.addEventListener(`click`, () => {
    let modalwind = document.querySelector(`.popup-modal2`);
    let overlay = document.querySelector(`.overlay`);
    modalwind.style.display = `none`;
    overlay.style.display = `none`;
})
