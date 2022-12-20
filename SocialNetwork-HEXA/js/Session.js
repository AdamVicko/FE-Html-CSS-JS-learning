
//Kreiranje klase
class Session {

    userID = '';

    //FUnkcije
    startSession() { //pocetak cookia
       const d = new Date(); 
        d.setTime(d.getTime() + (2*24*60*60*1000)); //trenutno vrijeme + 2 dana(u miliskeundama)
        let expires = "expires=" + d.toUTCString();// istice za prrebaci u  vremenski string
        document.cookie = "userID=" + this.userID + ";" + expires; // taj user broji mu od danas
        //napravljen cookie!
    }

    getSession() {
        let name = 'userID=';
        let ca = document.cookie.split(';'); //razdvoji cookie poslje znaka ;
        
        //prolazimo petljom kroz isprsjecani cookie da vidimo dali on postoji
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i]; // i-ti karakter u ca
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if(c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    destroySession() { // unistavanje cookiea
        let cookies = document.cookie.split(';');

        for( let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}