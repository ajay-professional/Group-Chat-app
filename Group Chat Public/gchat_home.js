const token = sessionStorage.getItem('token');
let formOfChat = document.getElementById('formOfChat');
let parentNode = document.getElementById('myvalues');

const logoutbtn = document.getElementById('logoutFrom');
logoutbtn.addEventListener('click', () => {
    window.location.replace("file:///C:/Users/gulshan/Desktop/Group%20Chat%20Views/gchat_login.html");
});

formOfChat.addEventListener('click', (e) => {
    e.preventDefault();
    let msgs = document.getElementById('textOfChat').value;
    let objt = {
        msgs
    };
    axios.post('http://localhost:5040/groupChatMessage', objt, { headers: { "Authorization": token } }).then((response) => {
        console.log(response);
        document.getElementById('textOfChat').value = "";
        axios.get("http://localhost:5040/domChatMessage", { headers: { "Authorization": token } }).then((response) => {
            console.log(response);
            parentNode.innerHTML = parentNode.innerHTML + `<li style="background-color:skyblue"><b>You</b>: <i>${(response.data[response.data.length - 1]).msgs}</i></li>`
            console.log((response.data[response.data.length - 1]).msgs);
        }).catch((err) => console.log(err));
    }).catch(err => {
        console.log(err);
        if (err.response.status === 401) {
            alert("Incorrect password !");
        }
        if (err.response.status === 404) {
            alert("Please enter a message");
        }
        console.log('Failed to add login details');
    });
});

window.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    axios.get("http://localhost:5040/domValidateEmailId", { headers: { "Authorization": token } }).then((response) => {
        let myMail=response.data.usermail;
        axios.get("http://localhost:5040/domAllChatMessages", { headers: { "Authorization": token } }).then((response) => {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                if(response.data[i].signupEmail==myMail){
                    parentNode.innerHTML = parentNode.innerHTML + `<li style="background-color:skyblue;"><b>You</b> :  <i>${(response.data[i]).msgs}</i></li>`;
                }else{
                    parentNode.innerHTML = parentNode.innerHTML + `<li style="background-color:yellow;"><b>${(response.data[i]).username}</b> :  <i>${(response.data[i]).msgs}</i></li>`;
                }
            };
        }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));
});
