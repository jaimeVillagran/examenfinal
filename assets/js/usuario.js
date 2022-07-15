const obtenUser = async (user, pass) => {
  let localToken = localStorage.getItem("Token");
  //console.log("localstore", localToken);
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", localToken);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const datosUser = await fetch(
      "https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/users",
      requestOptions
    );

    if (datosUser.status === 200) {
      const datosUserjs = await datosUser.json();
      console.log(datosUserjs);
      cargaUser(datosUserjs);
    } else if (datosUser.status === 401) {
      console.log("ERROR CONEXION");
    } else if (datosUser.status === 404) {
      console.log("no se pudo CONECTAR AL SERVIDOR");
    } else {
      console.log("ocurrio un error");
    }
  } catch (error) {
    console.log(error);
  }
};
obtenUser();
const cargaUser = async (datosUserjs) => {
  console.log("datos menuJSAgregados", datosUserjs);
  let agregadosHtml = "";
  datosUserjs.forEach((user) => {
    let birthday = new Date(user.birthday);
    birthday = birthday.toLocaleDateString();
    agregadosHtml += `
                <div class="card col-3 p-0" id="borderPersonalizado">
                  <img src=${user.img} class="img-fluid borderPersonalizado2" alt="imagen producto">
                  <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                      <h5 class="card-title m-0">${user.name}</h5>
                      <p class="m-0">${user.roles}</p>
                    </div>
                    <p class="card-text m-0"><small class="text-muted">${user.email}</small></p>
                    <p class="card-text m-0"><small class="text-muted">${user.phone}</small></p>
                    <p class="card-text m-0"><small class="text-muted">${birthday}</small></p>
                  </div>
              </div>
              `;
  });
  document.getElementById("usuarios").innerHTML = agregadosHtml;
};

/*
  Se mostrará nombre, correo, teléfono, rol y fecha de cumpleaños (en formato humano), 
  acompañados de la fotografía del usuario.
  
  */
