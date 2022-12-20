
import $ from 'jquery';
let user = {
    name: 'Mark Zamoyta',
    avatar: 'mark.jpg'
};

let promise = $.post(
	"http://z5b32a4fd82407e001413f1df.mockapi.io/api/v1/users", user
);

promise.then(
    data => console.log('data: ', data),
    error => console.log('error: ', error)
);


