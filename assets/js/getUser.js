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
    const datosUser = await fetch("https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/users", requestOptions);

    if (datosUser.status === 200) {
      const datosUserjs = await datosUser.json();
      console.log(datosUserjs);
      
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


export { obtenUser };




