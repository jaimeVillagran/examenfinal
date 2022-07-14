//import {obtenUser} from "./getUser.js";
import {obtenToken} from "./getToken.js";

const user= document.querySelector("#user.form-control");
const pass = document.querySelector("#password.form-control");
const botonLogin = document.querySelector(".btn-primary");


botonLogin.addEventListener("click", (event) => {
    event.preventDefault();
    obtenToken(user.value , pass.value);   
   
});

export {botonLogin}







