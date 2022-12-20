

class Post {
    postid = '';
    postcontent = '';
    userID = '';
    apiURL ='https://63135461b466aa9b03975b5b.mockapi.io';

    async create2() {
        let session = new Session(); //uzimamo sesiju trenutnog korisnika je rsamo on moze napravit post
        var sessionid = session.getSession();

        let data = { // saljemo
            userID: sessionid,
            content: this.postcontent,
            likes: 0
        }

        data = JSON.stringify(data); // prebacimo i JSON

        let response = await fetch(this.apiURL + '/posts', { // dohvacamo usere
            method: 'POST', //metoda je ubacivanje odnosno kreiranje POST
            headers: {
                'Content-Type': 'application/json' // SALJEMO JSON
            },
            body: data
        });

        data = await response.json();

        return data;
    }


    //POZIVAMO JU RADI SPARIVANJA POSTOVA I USERA
    async getAllPosts() {
        let response = await fetch(this.apiURL + '/posts');//dohvati sve postove
        let data = await response.json();
        
        return data;
    }

    like(post_id, likes) {
        let data = {
            likes: likes,
        };

        data = JSON.stringify(data);

        fetch(this.apiURL + '/posts/' + post_id, {
            method:'PUT', //PUT jer mjenjamo u bazi
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {alert('Post lajkan')});
    }



    delete(post_id) { // brisemo ga iz baze
        fetch(this.apiURL + '/posts/' + post_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {alert('Post obrisan')});
    }
}