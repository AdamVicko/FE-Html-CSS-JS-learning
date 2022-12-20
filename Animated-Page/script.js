
//TEXT
let sec1 = document.querySelector(`.section1`);
sec1.addEventListener(`click`, () => {

let textag = document.querySelector(`.section1 h1`);
let text = textag.textContent; //moze i sa .innertext

let splitText = text.split(``);//razdvaja svako slovo(character) bez uvjeta
                                //stvara array s slovima
textag.innerHTML = ``; //isprazni sadrzaj iz textaga
for(let i = 0; i < splitText.length; i++)
{
    if(splitText[i] === ` `)
    {
        splitText[i] = `&nbsp;`; //ako je split text pod rednim brojem i razmak u htmlu ubaci taj razmak (inace preskoci prazno i spoji slova)
    }                            //`&nbsp;` je razmak
    textag.innerHTML += `<span>${splitText[i]}<span>`//dodaj textagu span sa razdvojenim slovom(characterom) pod brojem i
    //stvramo spanove u htmlu <h1>
}

let spans = textag.querySelectorAll(`span`);//svaki span u textag-u
let k = 0;
let interval = setInterval(() => { //fukcija sa intervalom ponavljanja

    let singlespan = spans[k]; //span pod brojem k (napravio je array i bira po rednom broju)

    singlespan.className = `fademove`; //na svaki singlespan dodaj fademove
    k++;

    if(spans.length === k ) //ako je duzina spansa prvobinih znaci svih spanova u zbroju jednaka k ocisti interval
    {
        clearInterval(interval);
    } //za zavrsetak odnosno kraj
s
}, 70); //ponavljaj svakih 100 milisekundi

}) //addevent closer


//CRTA
//NA BUTTON
let border = document.querySelector(`.border-line`); // div sa border line klasom
let animationwidth = 0;
let leftbtn = document.querySelector(`.left`);
let rightbtn = document.querySelector(`.right`);

leftbtn.addEventListener(`click`, () => {
    animationwidth -= 3;
    if(animationwidth <= 0) //minimum width na 0
    {
        animationwidth = 0;
    }
    border.style.width = animationwidth + `%`;
})

rightbtn.addEventListener(`click`, () => {
    animationwidth += 3;
    if(animationwidth >= 100) //amaximum width na 100
    {
        animationwidth = 100;
    }
    border.style.width = animationwidth + `%`;
})  


 //NA SCROLL 
 /*
window.onscroll = () => { //na scrollanje prozora arrow funkcion
    
    if(this.oldScroll > this.scrollY) //stari scroll veci od trenutnog scrolla
    {
        animationwidth -= 1.5;
    }
    else{ //ako nije veci onda
        animationwidth += 1.5;
    }
    
    if(animationwidth >= 100) //amaximum width na 100
    {
        animationwidth = 100;
    }
    
    if(animationwidth <= 0) //minimum width na 0
    {
        animationwidth = 0;
    }
     

    border.style.width = animationwidth + `%`; //dodaj widthu animation width u postotcima 
    this.oldScroll = this.scrollY; //deklaracija starog scrolla
    //console.log(this.scrollY); WINDOW JE THIS!! ispisi kolko sam skrolao po y osi
    
    imageanimation();  //U ISTOJ ARROW FUNKCIJI SMO KAO ZA CRTU NA SCROLL POZVALI FUNKCIJU ZA SLIKE
} */

  //SPAJANJE SLIKA   
    //u cssu smo napravili klasu za spajanje .animated
   let leftimgbtn = document.querySelector(`.leftimg`);
   let rightimgbtn = document.querySelector(`.rightimg`);
   let leftimage = document.querySelector(`.slideFromLeft`);
   let rightimage = document.querySelector(`.slideFromRight`);
   let anm 

   leftimgbtn.addEventListener(`click`, () => {
        if(leftimage.classList.contains(`animated`))
        {
            leftimage.classList.remove(`animated`);
        }
        else
        {
            leftimage.classList.add(`animated`);    
        }
   })

   rightimgbtn.addEventListener(`click`, () => {
    if(rightimage.classList.contains(`animated`))
    {
        rightimage.classList.remove(`animated`);
    }
    else
    {
        rightimage.classList.add(`animated`);    
    }
   })
 /*const imageanimation = () => {
    
    let sectionforanimation = document.querySelector(`.section2 .images`);
    let sectionposition = sectionforanimation.getBoundingClientRect().top; //Return the size of an element and its position relative to the viewport (only top position)
    let screenposition = window.innerHeight / 1.6; //podijeli  s 1.6(kad prede dio slike onda ide animacja)

    console.log(`sectionP: ` + sectionposition);
    console.log(`screenP: ` + screenposition);
    
    let leftimage = document.querySelector(`.slideFromLeft`);
    let rightimage = document.querySelector(`.slideFromRight`);

    if(sectionposition < screenposition) 
    {
    leftimage.classList.add(`animated`);
    rightimage.classList.add(`animated`);
    }
}*/