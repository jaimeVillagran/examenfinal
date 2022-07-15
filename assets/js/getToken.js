import { obtenUser } from "./getUser.js";
let contador = 0;
let loginLock = localStorage.getItem("loginLock");
if (loginLock !== null) {
  document.querySelector(".btn-primary").style.visibility = "hidden";
} else {
  document.querySelector(".btn-primary").style.visibility = "visible";
}
unlockLogin();
const obtenToken = async (user, pass) => {
  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    client_id: user,
    client_secret: pass,
    audience: "https://escalab.academy",
    grant_type: "client_credentials",
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const datosToken = await fetch(
      "https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/oauth/token",
      requestOptions
    );

    if (datosToken.status === 200) {
      const datosTokenjs = await datosToken.json();
      let resulToken = datosTokenjs.access_token;
      let resulTipo = datosTokenjs.token_type;
      let token = resulTipo + " " + resulToken;
      localStorage.setItem("Token", token);
      console.log("con local", token);
      window.location = "pedido.html";
    } else if (datosToken.status === 401) {
      console.log("CONTRASEÑA O USUARIO INCORRECTOS");
      contador += 1;
      console.log(contador);
      if (contador == 3) {
        let test = (document.querySelector(".btn-primary").style.visibility =
          "hidden");
        let attempsFailed = new Date();
        localStorage.setItem("loginLock", attempsFailed);
        setInterval(unlockLogin, 60000);
        alert("supero los 3 intentos");
        console.log(test);
      }
    } else if (datosToken.status === 404) {
      console.log("no se pudo CONECTAR AL SERVIDOR");
    } else {
      console.log("ocurrio un error");
    }
  } catch (error) {
    console.log(error);
  }
};
function unlockLogin() {
  let loginLock = localStorage.getItem("loginLock");
  let loginDate = new Date();
  let loginDateAux = new Date(loginDate.getTime());
  let loginLockAux = new Date(Date.parse(loginLock));
  let diff = loginDateAux - loginLockAux;
  let fecha = Math.round(diff / 1000 / 60);
  if (fecha > 1) {
    //fecha > 15 para correr 15 min actualmente se dmora 1 min
    clearInterval();
    contador = 0;
    localStorage.removeItem("loginLock");
    document.querySelector(".btn-primary").style.visibility = "visible";
    window.location.reload();
  }
}
export { obtenToken };
