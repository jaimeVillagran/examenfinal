import { obtenUser } from "./getUser.js";
let contador = 0;
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
      rutas(user, pass);
    } else if (datosToken.status === 401) {
      console.log("CONTRASEÑA O USUARIO INCORRECTOS");
      contador += 1;
      console.log(contador)
      if (contador == 3){
        let test = document.querySelector(".btn-primary").style.visibility = "hidden"; 
        alert("supero los 3 intentos")
        console.log(test)
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


function rutas(user, pass){
  if (user == "madonna" && pass == "mad0nna" ) {
      console.log("CORRECTO ES ADMIN");
      window.location = "pedido.html"  
    } else if (user == "dualipa" && pass == "du4321") {
      console.log("CORRECTO ES USER");
      window.location = "pedido.html"
    } else if (user == "britney" && pass == "britNEY") {
      console.log("ES OTRO USER");
      window.location = "pedido.html"  
    } else {
      console.log("user o password incorrectos");
    } 
  }




export { obtenToken };

/*

fetch("https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/oauth/token", requestOptions)
.then(response => response.json())
.then((data) => {
    let resulToken = data.access_token;
    let resulTipo = data.token_type;
    let token = resulTipo  + " " + resulToken ;     
    localStorage.setItem("Token", token);
    console.log("con local",token);
    
})
.catch(error => console.log('error', error));
*/
