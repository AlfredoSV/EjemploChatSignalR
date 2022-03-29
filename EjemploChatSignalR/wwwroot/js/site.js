// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.onclose(async () => {
    await start();
});

// Start the connection.
start();

connection.on("RecibirMensaje", (usuario, mensaje) => {

    let divMensajes = document.querySelector("#mensajes");
    divMensajes.innerHTML += "<div><p>" + usuario + ":" + mensaje + "</p></div>"
  
});

document.querySelector("#btnEnviarMensaje").addEventListener("click", (e) => {

    let mensaje = document.querySelector("#mensaje").value;
    let usuario = document.querySelector("#usuario").value;

    connection.invoke("EnviarMensaje", usuario, mensaje).catch(err => console.log(err));

    e.preventDefault();
});
