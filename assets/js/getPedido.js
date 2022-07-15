//import {menus} from "./index.js";
const botonUsuarios = document.querySelector(".btn-outline-warning");
let listOrders = [];
const cargaOrden = async () => {
  let localToken = localStorage.getItem("Token");
  console.log("localstore", localToken);
  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", localToken);
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const datosOrden = await fetch(
      "https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/orders",
      requestOptions
    );
    const datosUser = await fetch(
      "https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/users",
      requestOptions
    );
    const datosMenu = await fetch(
      "https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/menus"
    );
    if (
      datosOrden.status === 200 ||
      datosMenu.status === 200 ||
      datosUser.status === 200
    ) {
      const datosOrdenes = await datosOrden.json();
      const datosUsers = await datosUser.json();
      const datosMenus = await datosMenu.json();
      const datoNewMen = Object.values(datosMenus);
      datosOrdenes.forEach((values) => {
        const arrayOrders = values.order;
        const filteredList = [];
        arrayOrders.forEach((elements) => {
          datoNewMen.forEach((element, key) => {
            let arrayPlatos = element;
            arrayPlatos.forEach((result) => {
              if (elements.product === result.id) {
                const pedidoObject = {
                  cantidad: elements.quantity,
                  pedido: elements.product,
                  nombre: result.name,
                  imagen: result.img,
                  precio: result.price,
                };
                filteredList.push(pedidoObject);
              }
            });
          });
        });
        let fechaOrden = new Date(values.created_at);
        let ordersObject = {
          horaOrden: fechaOrden.toLocaleTimeString(),
          idMesa: values.id,
          mesa: values.table,
          mesero: values.waiter,
          orden: filteredList,
        };
        if (!datosUsers.error) {
          datosUsers.forEach((result) => {
            if (ordersObject.mesero === result.id) {
              ordersObject.img = result.img;
              ordersObject.name = result.name;
            }
          });
        }
        listOrders.push(ordersObject);
      });
      cargaOrdenes(datosOrdenes, datosUsers, datosMenus);
      cargaMenuOrdenes(datosOrdenes);
    } else if (
      datosOrden.status === 401 ||
      datosMenu.status === 401 ||
      datosUser.status === 401
    ) {
      console.log("no se puede acceder a los datos, llave erronea");
    } else if (
      datosOrden.status === 404 ||
      datosMenu.status === 404 ||
      datosUser.status === 404
    ) {
      console.log("no se pudo encontrar pedido");
    } else {
      console.log("ocurrio un error");
    }
  } catch (error) {
    console.log(error);
  }
};
cargaOrden();
botonUsuarios.addEventListener("click", (event) => {
  event.preventDefault();
  window.location = "user.html";
});
function userValida() {
  let localToken = localStorage.getItem("Token");
  let tokenUserDua =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYW1lIjoiRHVhIExpcGEiLCJ1c2VyIjoiZHVhbGlwYSIsInJvbGVzIjpbInVzZXIiXX0.YHyn2fvHFWdZyla8jZR1oeJpYqtC4PbOMBE3M_XTLlk";
  let tokenUserBri =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJuYW1lIjoiQnJpdG5leSBTcGVhcnMiLCJ1c2VyIjoiYnJpdG5leSIsInJvbGVzIjpbInVzZXIiXX0.NokyeF1PKx7xw13Ag7CeGa9VtQLgOnZo0V-U_Cr1A4M";
  let tokenAdmin =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiTWFkb25uYSIsInVzZXIiOiJtYWRvbm5hIiwicm9sZXMiOlsiYWRtaW4iXX0.5l4DWWWWhxarAzv9NIiUfoFYiSe6QpmjT2B1SkQjpV4";
  if (localToken == tokenAdmin) {
    botonUsuarios.style.visibility = "visible";
  } else if (localToken == tokenUserBri) {
    botonUsuarios.style.visibility = "hidden";
  } else if (localToken == tokenUserDua) {
    botonUsuarios.style.visibility = "hidden";
  }
}
userValida();
/*
--------------------------------------------------
var objOrden[];
orden.id
order.fecha
si orden.idmozo = user.id
  objOrden = user.name
orden.create
si orden.product = menu.id
  objOrden = prodcto.name
  objOrden = producto.img
----filter
*/
const cargaOrdenes = async (datosOrdenes, datosUsers, datosMenus) => {
  //--- OBTEN ORDENES
  let obtOrdenes = [];
  let obtOrdenes2 = [];
  Object.keys(datosOrdenes).map((key) => {
    //console.log(key);
    const valueOrdenes = datosOrdenes[key];
    console.log("id_orden", valueOrdenes.id);
    console.log("mozo_orden", valueOrdenes.waiter);
    console.log("crea_orden", valueOrdenes.created_at);
    obtOrdenes.push(valueOrdenes.id);
    obtOrdenes.push(valueOrdenes.waiter);
    obtOrdenes.push(valueOrdenes.created_at);
    let valueOrdenes2 = valueOrdenes;
    Object.keys(valueOrdenes2).map((key) => {
      const valueOrdenes3 = valueOrdenes2[key];
      let valueOrdenes4 = valueOrdenes3;
      Object.keys(valueOrdenes4).map((key) => {
        //console.log("key",key);
        const valueOrdenes5 = valueOrdenes4[key];
        console.log("OrdenPorductosId", valueOrdenes5.product);
        obtOrdenes2.push(key);
        obtOrdenes2.push(valueOrdenes5.product);
      });
    });
  });
  console.log("obtOrden66666", obtOrdenes);
  console.log("obtOrden777777777777777777777", obtOrdenes2);
  //--OBTEN ORDEN KEY VALUE----
  var objOrden = [];
  for (const [key, value] of Object.entries(datosOrdenes)) {
    //console.log("OBTEN ORDEN KEY VALUE",key, value);
    let test999 = value;
    //console.log("validar TIPO DATO",typeof test888);
    for (const [key, value] of Object.entries(test999)) {
      console.log("OBTEN ORDEN KEY VALUE", key, value);
      //console.log("validar mejor KEY", key);
      objOrden.push([key], [value]);
    }
  }
  console.log("testss", objOrden);
  //--OBTEN USER-- KEY VALUE
  for (const [key, value] of Object.entries(datosUsers)) {
    //console.log("validar mejor",key, value);
    let test888 = value;
    //console.log("validar TIPO DATO",typeof test888);
    for (const [key, value] of Object.entries(test888)) {
      console.log("validar mejor", key, value);
      //console.log("validar mejor KEY",typeof key);
    }
  }
  //--- OBTEN USUARIOS ---
  let obtOrden = [];
  datosOrdenes.forEach(function (datosOrdene) {
    obtOrden.push(datosOrdene.id);
    obtOrden.push(datosOrdene.waiter);
    obtOrden.push(datosOrdene.created_at);
  });
  console.log("testOrden777", obtOrden);
  //-------------------------------------
  //---------USER----------------------------------------------
  let obtUser = [];
  Object.keys(datosUsers).map((key) => {
    console.log("leer-1", key);
    const valueUser = datosUsers[key];
    console.log("leer-2", valueUser);
    obtUser.push(valueUser.id);
    obtUser.push(valueUser.name);
    //console.log("testUserAntigua", value11.id);
    //console.log("testUserAntigua", value11.name);
  });
  console.log("VARIABLEUSER", obtUser);
  //--- OBTEN MENU
  let obtMenu = [];
  Object.keys(datosMenus).map((key) => {
    console.log(key);
    const valueMenu = datosMenus[key];
    // console.log(value1);
    valueMenu.forEach((menus) => {
      obtMenu.push(menus.id);
      obtMenu.push(menus.name);
      //obtMenu.push(menus.img);
    });
  });
  console.log("VARIABLEMENU", obtMenu);
  //obtOrdenes
  //obtUser
  //obtMenu
};
const cargaMenuOrdenes = async (datosOrdenes) => {
  let agregadosHtml = "";
  let agregadosHtml2 = "";
  listOrders.forEach((ordenes) => {
    let pedidos = ordenes.orden;
    agregadosHtml += `
              <div class="card col-3 p-0" id="borderPersonalizado">
                <img src=${ordenes.img} class="img-fluid borderPersonalizado" alt="imagen producto">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-between">
                    <h5 class="card-title m-0">${ordenes.mesero}</h5>
                    <p class="m-0">Id: ${ordenes.mesa}</p>
                    <p class="m-0">Id: ${ordenes.idMesa}</p>
                  </div>
                  <p class="card-text m-0"><small class="text-muted">$ ${ordenes.horaOrden}</small></p>
                  <p class="card-text"><small class="text-muted">""PENDIETE PRODUCTOS""</small></p>
                </div>
              </div>`;

    pedidos.forEach((values) => {
      agregadosHtml2 += `<div class='row'>
                  <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                    <img src=${values.imagen} class="img-fluid borderPersonalizado" alt="imagen producto">
                      <h5 class="card-title m-0">${values.cantidad}</h5>
                      <p class="m-0">Id: ${values.nombre}</p>
                      <p class="m-0">Id: ${values.pedido}</p>
                      <p class="m-0">Id: ${values.precio}</p>
                    </div>
                    
                  </div>
                </div>`;
    });
  });

  document.getElementById("pedidos").innerHTML = agregadosHtml;
  document.getElementById("pedidos2").innerHTML = agregadosHtml2;
};
/*
if (key == "0"){
  console.log("CORRECTOOOOOOOOOOOOO",value.name)
}else{
  console.log("error")
}
 let obtOrdenes1 = Object.keys(datosOrdenes).map(key => {
    //console.log(key);
    const value2 = datosOrdenes[key]
    console.log("id_orden", value2.id);
    console.log("mozo_orden", value2.waiter);
    console.log("crea_orden", value2.created_at);
    let value3 = value2;
    let obtOrdenes2 = Object.keys(value3).map(key => {
      //console.log("key",key);
      const value4 = value3[key]
      //console.log("valueResult",value4.id);
      let value5 = value4;
      let obtOrdenes3 = Object.keys(value5).map(key => {
        //console.log("key",key);
        const value6 = value5[key]
        console.log("OrdenPorductosId", value6.product);
      });
    });
  });
  
  let test = Object.keys(datosUsers).map(key => {
    //console.log(key);
    const value11 = datosUsers[key]
    //console.log(value11);
    console.log("testUser", value11.id);
    console.log("testUser", value11.name);
  
  } );
let test3 = Object.keys(datosMenus).map(key => {
    //console.log(key);
    const value1 = datosMenus[key]
    // console.log(value1);
    value1.forEach(menus => {
      console.log("testMenu", menus.id);
      console.log("testMenu", menus.name);
      console.log("testMenu", menus.img);
      let id_menu_template = menus.id;
      console.log("id_menu_template",id_menu_template);
       
    });
  });
agregadosHtml += `    
                 <div class="card mb-3" style="max-width: 540px;">
                 <div class="row g-0">
                   <div class="col-md-4">
                     <img src="#" class="img-fluid rounded-start" alt="...">
                   </div>
                   <div class="col-md-8">
                     <div class="card-body">
                     <h5 class="card-title">${agregado.order}</h5>
                     <h5 class="card-title">${agregado.created_at}</h5>
                       <p class="card-text">${agregado.waiter}.</p>
                       <p class="card-text"><small class="text-muted">$ ${agregado.created_at}</small></p>
                     </div>
                   </div>
                 </div>
               </div>
             `;
      
//id
//fecha creacion
//img
//nombre
//persona tomo el pedido
 
 
Se mostrará un listado de los pedidos, con la imagen y nombre de la persona que tomó el pedido, 
además de la fecha de creación de este y su ID.
 
 
Se debe facilitar un formulario para la creación de pedidos. Este constará de un 
combobox para indicar la mesa que sólo mostrará las disponibles, uno o más combobox 
con el listado de productos, acompañados con un input que permita indicar el número que desea 
de dicho producto. Además, tendrá dos botones, uno para agregar nuevas líneas al pedido, y otro 
para enviar el pedido a backend.
*/
