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

/* let nombre = document.getElementById ("nombre");
let email = document.getElementById ("email");
let error = document.getElementById ("error");

let form = document.getElementById("formContacto");
form.addEventListener ("submit", function (evt){
evt.preventDefault ();
let mensajesError = [];

if (nombre.value === null || nombre.value === ""){
mensajesError.push ("Ingresá tu nombre");
}

if (email.value === null || email.value === ""){
mensajesError.push ("Ingresá tu email");
}

error.innerHTML = mensajesError.join (", ");
});
*/

let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

let stockProductos = []


/*Llamada a archivo stock.json  */
window.onload = function () {

    $.getJSON('stock.json', function (data) {
        
        data.forEach((productoNuevo) => {
            stockProductos.push(productoNuevo)
        })

        mostrarProductos(stockProductos)

        let carrito = JSON.parse(localStorage.getItem('carrito'))
                if (carrito) {
            carrito.forEach((el) => {
                agregarAlCarrito(el.id)
            })
        }
    });
}


/*Funcion de select por tamaño de lámina */
const selectTamaño = document.getElementById('selectTamaño')

selectTamaño.addEventListener('change', () => {
    if (selectTamaño.value == "all") {
        mostrarProductos(stockProductos)
    } else {
        mostrarProductos(stockProductos.filter((el) => el.tamaño == selectTamaño.value))
    }
})


function mostrarProductos(array) {
    contenedorProductos.innerHTML = ''
    array.forEach((productoNuevo) => {
        let div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML += `
            <img src= ${productoNuevo.img} alt="laminas">
            <h2> ${productoNuevo.lamina}</h2>
            <p> Autor: ${productoNuevo.autor}</p>
            <p> Técnica: ${productoNuevo.tecnica}</p>
            <p> Tamaño: ${productoNuevo.tamaño}</p>
            <p> Número de Serie: ${productoNuevo.numSerie}</p>
            <p class= "precioProducto"> Precio: $ ${productoNuevo.precio}</p>
            <button id="boton${productoNuevo.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
                        `

        contenedorProductos.appendChild(div)

        let boton = document.getElementById(`boton${productoNuevo.id}`)

        boton.addEventListener('click', () => {
            agregarAlCarrito(productoNuevo.id)
        })
    })
}


function agregarAlCarrito(id) {

    let validar = carritoDeCompras.some(x => x.id == id)
        if (validar) {
        console.log(carritoDeCompras)
        let count = document.getElementById(`cantidad${id}`)

    carritoDeCompras.map(x => {
    if (x.id == id) {
        count.innerText = `cantidad: ${x.cantidad += 1}`
        actualizarCarrito()
        }
    })
    }
    else {
        let productoAgregar = stockProductos.filter((el) => el.id == id)[0]
        carritoDeCompras.push(productoAgregar)

        actualizarCarrito()

        let div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
        <p>${productoAgregar.lamina}</p>
        <p id=cantidad${productoAgregar.id}>cantidad:${productoAgregar.cantidad}</p>
        <p>Precio: $${productoAgregar.precio}</p>
        <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

        let count = document.getElementById(`cantidad${id}`)
        carritoDeCompras.map(x => {
            if (x.id == id) {
                count.innerText = `cantidad: ${x.cantidad = 1}`
                actualizarCarrito()
            }
        })

/*Muestro al usuario un toast con el producto agregado */
Toastify({
    text: `Agregaste a ${productoAgregar.lamina} 😍`,
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    className: "info",
    duration: 1000,
    }).showToast();

let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

/*Muestro al usuario un toast de alerta con el producto eliminado */
botonEliminar.addEventListener('click', () => {
    Toastify({
        text: `Eliminaste a ${productoAgregar.lamina} 😭`,
        backgroundColor: "crimson",
        className: "info",
        duration: 1000,
        }).showToast();

    botonEliminar.parentElement.remove()
    carritoDeCompras = carritoDeCompras.filter((el) => el.id != productoAgregar.id)
    actualizarCarrito()
    })
    }
}

function actualizarCarrito() {

contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0)

localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras))
precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + el.precio, 0) 
}

