const cargaPedido = async () => { 
  let localToken = localStorage.getItem("Token");
  console.log("localstore",localToken)
  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", localToken );    
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  try {
      const datosMenu = await fetch("https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/orders", requestOptions);

      if (datosMenu.status === 200) {
          const datosMenuJs = await datosMenu.json();
          //cargaPedidos(datosMenuJs);
          console.log("datos pedidos", datosMenuJs);
      } else if (datosMenu.status === 401) {
          console.log("no se puede acceder a los datos, llave erronea");
      } else if (datosMenu.status === 404) {
          console.log("no se pudo encontrar pedido");
      } else {
          console.log("ocurrio un error");
      }
  } catch (error) {
      console.log(error);
  }
};
cargaPedido();

const cargaPedidos = async (datosMenuJs) => {
    console.log("datos menuJSAgregados", datosMenuJs);
    let agregadosHtml = "";
    datosMenuJs.agregados.forEach((agregado) => {
        agregadosHtml += `    
                  <div class="card mb-3" style="max-width: 540px;">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src=${agregado.img} class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${agregado.name}</h5>
                        <p class="card-text">${agregado.description}.</p>
                        <p class="card-text"><small class="text-muted">$ ${agregado.price}</small></p>
                      </div>
                    </div>
                  </div>
                </div>
              `;
    });
    document.getElementById("pedidos").innerHTML = agregadosHtml;
};

/*
Se mostrar?? un listado de los pedidos, con la imagen y nombre de la persona que tom?? el pedido, 
adem??s de la fecha de creaci??n de este y su ID.


Se debe facilitar un formulario para la creaci??n de pedidos. Este constar?? de un 
combobox para indicar la mesa que s??lo mostrar?? las disponibles, uno o m??s combobox 
con el listado de productos, acompa??ados con un input que permita indicar el n??mero que desea 
de dicho producto. Adem??s, tendr?? dos botones, uno para agregar nuevas l??neas al pedido, y otro 
para enviar el pedido a backend.
*/
