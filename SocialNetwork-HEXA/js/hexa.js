//COOKIE redirect to web page
let session = new Session(); // u sesiju mi spremi novu klasu Sesija
session_id = session.getSession(); //DOHVATI TRENUTNU SESSIJU OD COOKIA

    if(session_id !== "") { // ako je cookie popunjen redirect na pocetnu
        
        //ASINKRONI POZIV FUNKCIJE GET 
        //pravimo funkciju u kojoj  mozemo iscitati podatke iz GET
        async function populateuserdata() {
            let user = new User();
            user = await user.get(session_id); //funkcija get dohvaca podatke o trenutnom korisniku
            
            document.querySelector('#username').innerText = user['username']; //user procitaj sta je u dati pod username(mockapi) i stavi pod html
            document.querySelector('#email').innerText = user['email'];//user procitaj sta je u dati pod email (mockapi) i stavi pod html
        
            //HEXA POPUP EDIT ACCOUNT INPUT
            //zelimo da vec pise trenutni username i email pa popunjavamo podatke
            document.querySelector('#korisnicko_ime').value = user['username']; // isto tako samo napisi u input vrijednost usernamea
            document.querySelector('#editemail').value = user['email'];// napisi u input vrijednost emaila
        }

        populateuserdata(); //POZIVAMO FUNKCIJU

    } else {
        window.location.href = "/index.html"; // ako je session(cookie) prazan vrati na registraciju
    }

//LOGOUT*********
    document.querySelector(`#logout`).addEventListener(`click` , e => {
        e.preventDefault();

        session.destroySession();
        window.location.href = '/';
    });

//POPUP MODAL *********
    document.querySelector(`#editAcc`).addEventListener(`click`, () => {
        document.querySelector(`.custom-modal`).style.display = `block`
    });
    
    document.querySelector(`#closeModal`).addEventListener(`click`, () => {
        document.querySelector(`.custom-modal`).style.display = `none`
    });

//EDIT ACCOUNT POPUP SUBMIT*******

    
    document.querySelector('#editform').addEventListener(`submit`, e => {
        e.preventDefault();

        let user = new User();
        user.username = document.querySelector('#korisnicko_ime').value; //uzimamo sta pise naci VALUE!!
        user.email = document.querySelector('#editemail').value;
        user.edit(); //PROSLIJEDUJEMO FUNKCIJI EDIT USERNAME I EMAIL
    });
    

    //DELETE PROFILE********

    document.querySelector('#deleteprofile').addEventListener('click', e => {
        e.preventDefault();

        let text = 'Are you sure you want to delete your profile?';
        if(confirm(text) === true) {
            let user = new User();
            user.delete();
        }
    });


    //POST FORM *********

    document.querySelector('#postform').addEventListener('submit', e => { 
        e.preventDefault(); 
        
        async function createpost() {

            let content = document.querySelector('#postContent').value; // prvo mi spremi vrijednost u content
            document.querySelector('#postContent').value = ''; // izbrisi mi tamo vrijednost u htmlu

            
            let post = new Post();
            post.postcontent = content;
            post = await post.create2();

            let current_user = new User();
            current_user = await current_user.get(session_id);

            let html = document.querySelector('#allPostsWrapper').innerHTML; //i stari postovi odnosno svi

            let delete_post_html = '';

            if(session_id === post.userID) {
                delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>';
            }
            document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">

                                                                        <div class="post-content">
                                                                        ${post.content} 
                                                                        </div>

                                                                        <div class="post-actions">
                                                                            <p><b>Autor:</b> ${current_user.username}</p>
                                                                            <div>
                                                                                <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> Likes</button>
                                                                                <button class="comment-btn" onclick="commentPost(this)">Comments</button>
                                                                                ${delete_post_html}
                                                                            </div>
                                                                        </div>
                                                                    
                                                                        <div class="post-comments">
                                                                            <form>
                                                                                <input placeholder="Napisi komentar..." type="text">
                                                                                <button onclick="commentPostSubmit(event)">Comment</button>
                                                                            </form>
                                                                        </div>

                                                                    </div>` + html; // dodaj mu i stare postove
        }

        createpost(); //pozivamo funkciju
    });

    //FUNKCIJA DOHVACANJA SVIH POSTOVA I SPARENIH USERA
    async function getAllPosts() {
        let all_posts = new Post();
        all_posts = await all_posts.getAllPosts(); // kreiramo unutar Post.js novu funkciju koja se opet zove getAllPosts
        
        
        all_posts.forEach(post => {

            async function getPostUser() {

                let user = new User();
                user = await user.get(post.userID); //uzimamo onog usera koji je objavio post

                //ucitavanje svih komentara posta
                let comments = new Comment();
                comments = await comments.get(post.id);

                let comments_html = '';
                if(comments.length > 0) {
                    comments.forEach(comment => {
                        comments_html += `<div class="single-comment">${comment.content}</div>`; //ubacit cemo ga ispod forme u htmlu
                    })
                }

                let html = document.querySelector('#allPostsWrapper').innerHTML;
            
                let delete_post_html = '';

                if(session_id === post.userID) {
                    delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>';
                }

                document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">

                                                                        <div class="post-content">
                                                                        ${post.content} 
                                                                        </div>

                                                                        <div class="post-actions">
                                                                            <p><b>Autor:</b> ${user.username}</p>
                                                                            <div>
                                                                                <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> Likes</button>
                                                                                <button class="comment-btn" onclick="commentPost(this)">Comments</button>
                                                                                ${delete_post_html}
                                                                            </div>
                                                                        </div>
                                                                    
                                                                        <div class="post-comments">
                                                                            <form>
                                                                                <input placeholder="Napisi komentar..." type="text">
                                                                                <button onclick="commentPostSubmit(event)">Comment</button>
                                                                            </form>
                                                                            ${comments_html}
                                                                        </div>

                                                                    </div>` + html; 
                //znaci za svaki post npravi novi div i dodaj mu html odnosno za svaki post dodaj sljedeci post
            }
            getPostUser(); //pozivamo funkciju
        });
    }

    getAllPosts();   //pozivamo funkciju
    


    //FUNKCIJA BUTTON ONCLIK DODAJ KOMENTAR
    const commentPostSubmit = e => {    //POZVALI SMO JU NA onclick u html-u (dodalio smo je ovjde u JS )
        e.preventDefault();

        let btn = e.target;// uzimamo stisnuti button
        btn.setAttribute('disabled', 'true'); // stavili smo da se nemoze opet stisnut

        let main_post_el = btn.closest('.single-post'); // uzimamo njegov parent ,glavni post wrapper
        let post_id = main_post_el.getAttribute('data-post_id');// uzimamo id tog posta

        let comment_value = main_post_el.querySelector('input').value;//

        main_post_el.querySelector('input').value = '';//isprazni nakon pritiska comment btn-a

        main_post_el.querySelector('.post-comments').innerHTML += `<div class="single-comment">${comment_value}</div>`;//nadodaj komentar
    
        let comment = new Comment();
        comment.content = comment_value;
        comment.userID = session_id;
        comment.post_id = post_id;
        comment.create(); // pozivamo funkciju create iz Comments.js
    }

    //FUNKCIJA ON CLICK DELETE POST
    const removeMyPost = btn => {
        let post_id = btn.closest('.single-post').getAttribute('data-post_id');

        btn.closest('.single-post').remove();
        //dohvacanje delete funkcije
        let post = new Post();
        post.delete(post_id);
    }


    //FUNCKIJA LAJK
    const likePost = btn => {
        let main_post_el = btn.closest('.single-post');
        let post_id = btn.closest('.single-post').getAttribute('data-post_id');
        let number_of_likes = parseInt(btn.querySelector('span').innerText);
        
        btn.querySelector('span').innerText = number_of_likes + 1;
        btn.setAttribute('disabled', 'true');

        let post = new Post();
        post.like(post_id, number_of_likes + 1);
    
    }   

    //FUNKCIJA KOMENTIRAJ
    const commentPost = btn => {

        let main_post_el = btn.closest('.single-post');
        let post_id = main_post_el.getAttribute('data-post_id');//uzimamo post id radi mogucnosti citanja komentara samo od tog posta

        main_post_el.querySelector('.post-comments').style.display = 'block'; //pokazi komentare
    
  
    
    }