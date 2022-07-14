const cargaMenu = async () => {
  try {
    const datosMenu = await fetch(
      "https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/menus"
    );

    if (datosMenu.status === 200) {
      const datosMenuJs = await datosMenu.json();
      cargaMenuAgregados(datosMenuJs);
      cargaMenuEnsaladas(datosMenuJs);
      cargaMenuEntradas(datosMenuJs);
      cargaMenuFondos(datosMenuJs);
      cargaMenuJugosBebidas(datosMenuJs); 
      cargaMenuPostres(datosMenuJs);
      cargaMenuSandwichs(datosMenuJs);  
      console.log("datos menuJS", datosMenuJs);
    } else if (datosMenu.status === 401) {
      console.log("no se puede acceder a los datos, llave erronea")
    } else if (datosMenu.status === 404) {
      console.log("no se pudo encontrar pedido")
    } else {
      console.log("ocurrio un error")
    }

  } catch (error) {
    console.log(error);

  }
};
cargaMenu();


const cargaMenuAgregados = async (datosMenuJs) => {
  console.log("datos menuJSAgregados", datosMenuJs)
  let agregadosHtml = '';
  datosMenuJs.agregados.forEach(agregado => {
    agregadosHtml += `
              <div class="card col-3 p-0" id="borderPersonalizado">
                <img src=${agregado.img} class="img-fluid borderPersonalizado" alt="imagen producto">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-between">
                    <h5 class="card-title m-0">${agregado.name}</h5>
                    <p class="m-0">Id: ${agregado.id}</p>
                  </div>
                  <p class="card-text m-0"><small class="text-muted">$ ${agregado.price}</small></p>
                  <p class="card-text pt-3">${agregado.description}.</p>
                </div>
              </div>
            `;
  });
  document.getElementById('agregados').innerHTML = agregadosHtml;
}
 
  const cargaMenuEnsaladas = async (datosMenuJs) => {
    console.log("datos menuJSEnsaldas", datosMenuJs)
    let ensaldasHtml = '';
    datosMenuJs.ensaladas.forEach(ensalada => {
      ensaldasHtml += `
                <div class="card col-3 p-0" id="borderPersonalizado">
                <img src=${ensalada.img} class="img-fluid borderPersonalizado" alt="imagen producto">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-between">
                    <h5 class="card-title m-0">${ensalada.name}</h5>
                    <p class="m-0">Id: ${ensalada.id}</p>
                  </div>
                  <p class="card-text m-0"><small class="text-muted">$ ${ensalada.price}</small></p>
                  <p class="card-text pt-3">${ensalada.description}.</p>
                </div>
              </div>
              `;
    });
    document.getElementById('ensaladas').innerHTML = ensaldasHtml;
  }
    
  const cargaMenuEntradas = async (datosMenuJs) => {
    console.log("datos menuJSEntradas", datosMenuJs)
    let entradaHtml = '';
    datosMenuJs.entradas.forEach(entrada => {
      entradaHtml += `
                <div class="card col-3 p-0" id="borderPersonalizado">
                <img src=${entrada.img} class="img-fluid borderPersonalizado" alt="imagen producto">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-between">
                    <h5 class="card-title m-0">${entrada.name}</h5>
                    <p class="m-0">Id: ${entrada.id}</p>
                  </div>
                  <p class="card-text m-0"><small class="text-muted">$ ${entrada.price}</small></p>
                  <p class="card-text pt-3">${entrada.description}.</p>
                </div>
              </div>
              `;
    });
    document.getElementById('entradas').innerHTML = entradaHtml;
  }
  
  const cargaMenuFondos = async (datosMenuJs) => {
    console.log("datos menuJSFondos", datosMenuJs)
    let fondoHtml = '';
    datosMenuJs.fondo.forEach(fondo => {
      fondoHtml += `
                <div class="card col-3 p-0" id="borderPersonalizado">
                <img src=${fondo.img} class="img-fluid borderPersonalizado" alt="imagen producto">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-between">
                    <h5 class="card-title m-0">${fondo.name}</h5>
                    <p class="m-0">Id: ${fondo.id}</p>
                  </div>
                  <p class="card-text m-0"><small class="text-muted">$ ${fondo.price}</small></p>
                  <p class="card-text pt-3">${fondo.description}.</p>
                </div>
              </div>
              `;
    });
    document.getElementById('fondos').innerHTML = fondoHtml;
  }

  const cargaMenuJugosBebidas = async (datosMenuJs) => {
    console.log("datos menuJSbebidas", datosMenuJs)
    let jugosBebidasHtml = '';
    datosMenuJs['jugos-bebidas'].forEach(jugoBebida => {
      console.log(jugoBebida)
      jugosBebidasHtml += `    
                <div class="card col-3 p-0" id="borderPersonalizado">
                <img src=${jugoBebida.img} class="img-fluid borderPersonalizado" alt="imagen producto">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-between">
                    <h5 class="card-title m-0">${jugoBebida.name}</h5>
                    <p class="m-0">Id: ${jugoBebida.id}</p>
                  </div>
                  <p class="card-text m-0"><small class="text-muted">$ ${jugoBebida.price}</small></p>
                  <p class="card-text pt-3">${jugoBebida.description}.</p>
                </div>
              </div>
              `;
    });
    document.getElementById('jugosBebidas').innerHTML = jugosBebidasHtml;
  }

  const cargaMenuPostres = async (datosMenuJs) => {
    console.log("datos menuJSPostres", datosMenuJs)
    let postresHtml = '';
    datosMenuJs.postres.forEach(postre => {
      postresHtml += `    
                  <div class="card col-3 p-0" id="borderPersonalizado">
                  <img src=${postre.img} class="img-fluid borderPersonalizado" alt="imagen producto">
                  <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                      <h5 class="card-title m-0">${postre.name}</h5>
                      <p class="m-0">Id: ${postre.id}</p>
                    </div>
                    <p class="card-text m-0"><small class="text-muted">$ ${postre.price}</small></p>
                    <p class="card-text pt-3">${postre.description}.</p>
                  </div>
                </div>
              `;
    });
    document.getElementById('postres').innerHTML = postresHtml;
  }
 
  
  const cargaMenuSandwichs = async (datosMenuJs) => {
    console.log("datos menuJSsandwichs", datosMenuJs)
    let sandwichsHtml = '';
    datosMenuJs.sandwichs.forEach(sandwich => {
      sandwichsHtml += `    
                  <div class="card col-3 p-0" id="borderPersonalizado">
                  <img src=${sandwich.img} class="img-fluid borderPersonalizado" alt="imagen producto">
                  <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                      <h5 class="card-title m-0">${sandwich.name}</h5>
                      <p class="m-0">Id: ${sandwich.id}</p>
                    </div>
                    <p class="card-text m-0"><small class="text-muted">$ ${sandwich.price}</small></p>
                    <p class="card-text pt-3">${sandwich.description}.</p>
                  </div>
                </div>
              `;
    });
    document.getElementById('sandwichs').innerHTML = sandwichsHtml;
  }

  //let menus = datosMenuJs;
   //console.log("test", menus)
  //export{menus};
  //console.log("datos html", agregadosHtml);
  //console.log("datos menu", datosMenu);
  //console.log("datos menuJS", datosMenuJs);


