
//Funkcija dodavanja
function addTodo(){

    let todo = document.querySelector('#Todotext');
    
    todo = todo.value;

    var newElement = document.createElement('div'); //Stvaramo novi Element tipa DIV u Html-u 
        newElement.className = 'todolist'; //Dodajemo classu tom divu
        newElement.innerText = `${todo}`; // Pisemo inner text u tay div


    document.querySelector('.container ul').appendChild(newElement); //Selektiramo .todolists i u njega dodajemo

    document.querySelector('.form-control').value = '';//Selektiramo vrijednost inputa(form-contorl) i stavljamo ga na nista 

    let ereaser = document.createElement('button'); // Neznam kako ubaciti button zajedno sa textom!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            btn.innerHTML = 'X';
            btn.type = 'submit';
            btn.name = 'formBtn';
            btn.onclick = function(){
                newElement.remove();
            }
            document.querySelector("body").appendChild(ereaser);
        
}


