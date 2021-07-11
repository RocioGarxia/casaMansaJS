$(document).ready(function () {

    $("#AbrirFormulario").click(function () {
        $("#exampleModal").modal();
    });

    $("#EliminarFormulario").click(function () {
        setTimeout(function () {
            location.reload();
        }, 5000);
    });

    $("#EnviarFormulario").click(function () {
        setTimeout(function () {
            location.reload();
        }, 5000);
    });

}); 

let nombre = document.getElementById ("nombre");
let email = document.getElementById ("email");
let errorNombre = document.getElementById ("errorNombre");
let errorEmail = document.getElementById ("errorEmail");

let form = document.getElementById("formContacto");
form.addEventListener ("submit", function (evt){
evt.preventDefault ();

let mensajeErrorName = [];
let mensajeErrorEmail = [];

if (nombre.value === null || nombre.value === ""){
mensajeErrorName.push (" * Ingresá tu nombre");
}

if (email.value === null || email.value === ""){
mensajeErrorEmail.push (" * Ingresá tu email");
}

errorNombre.innerHTML = `${mensajeErrorName}`;
errorEmail.innerHTML = `${mensajeErrorEmail}`;
});
