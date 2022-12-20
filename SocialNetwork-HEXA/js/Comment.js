class Comment { //kreiramo Comment
    postID = ''; // stavljamo imena kakva su nam u API-u
    userID = '';
    content = '';
    apiURL ='https://63135461b466aa9b03975b5b.mockapi.io';


    create() {
        let data = {
            postID: this.postID,
            userID: this.userID,
            content: this.content
        };

        
        data = JSON.stringify(data);

        fetch(this.apiURL + '/comments', {
            method: 'POST', //kreiramo komentar
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json()) //analizing json and sending response
        .then(data => {alert('Postavljen komentar')});
        
    }


    async get(postID) {
        let apiURL = this.apiURL + '/comments';

        const response = await fetch(apiURL); //dohvati sve commentare
        const data = await response.json();
        let post_comments = [];//pravimo prazan niz komentara

        let i = 0;
        data.forEach(item => {
            if(item.postID === postID){ //ako je post id u komentaru jednak postu ovoga kojeg smo pozvali onda toje taj trazeni komentar
                post_comments[i] = item;
                i++;
            }
        });
        return post_comments;
    }
}