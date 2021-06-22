
let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')



function Productos (id,title,price,thumbnail,available_quantity){
    this.id = id;
    this.title= title;
    this.price= price;
    this.thumbnail = thumbnail;
    this.stock = available_quantity;
}

$.get('https://api.mercadolibre.com/sites/MLA/search?category=MLA1430&limit=10',

    function(data){ 
        data.results.forEach((prod) => {
         let cantidad = 1;   
            stockProductos.push(
            new Productos(prod.id, prod.title, prod.price, prod.thumbnail,prod.available_quantity, cantidad)
            )
            let div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML += `
                    <img src=${prod.thumbnail} alt="">
                    <h3>${prod.title}</h3>
                    <p class="precioProducto">Precio: $${prod.price}</p>
                    <p>stock:${prod.available_quantity}</p>
                    <button id="boton${prod.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        `
        contenedorProductos.appendChild(div)
        
        let boton = document.getElementById(`boton${prod.id}`)
        
        boton.addEventListener('click', ()=>{
            agregarAlCarrito(prod.id)
         })

    });
  }
)

const selectTamaño = document.getElementById('selectTamaño')

selectTamaño.addEventListener('change', ()=>{
    console.log(selecTalles.value)

    if (selectTamaño.value == "all") {
        mostrarProductos(stockProductos)
    } else {
        mostrarProductos(stockProductos.filter((el)=> el.talle == selectTamaño.value))
    }

})


mostrarProductos(stockProductos)

function mostrarProductos(array){
    contenedorProductos.innerHTML = ''
    array.forEach((productoNuevo)=>{
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

       // let boton = document.getElementById(`${x.id}`) //

       let boton = document.getElementById(`boton${productoNuevo.id}`)
      //  boton.addEventListener('click', () => { agregarAlCarrito(`${x.id}`) }) //

      boton.addEventListener('click', ()=>{
        agregarAlCarrito(productoNuevo.id)
     })
})
}



function agregarAlCarrito(id) {
    
    let validar = carritoDeCompras.some(x=> x.id == id)
    console.log(validar)
    if(validar){
        console.log(carritoDeCompras)
        let count = document.getElementById(`cantidad${id}`)
        
       
        carritoDeCompras.map(x=>{
        if(x.id == id){
        count.innerText = `cantidad: ${x.cantidad += 1}`
        actualizarCarrito()
        }
    })
        
    }
    else {
        let productoAgregar = stockProductos.filter((el) => el.id == id)[0]
        console.log(productoAgregar)
        carritoDeCompras.push(productoAgregar)
      //nueva linea//
      console.log(carritoDeCompras)
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
        carritoDeCompras.map(x=>{
            if(x.id == id){
            count.innerText = `cantidad: ${x.cantidad = 1}`
            actualizarCarrito()
            }
        })
    let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

    botonEliminar.addEventListener('click', ()=>{
        botonEliminar.parentElement.remove()
        console.log(botonEliminar.parentElement)
        carritoDeCompras = carritoDeCompras.filter((el) => el.id != productoAgregar.id) 
        console.log(carritoDeCompras)    
        actualizarCarrito()
    })
    }
}

function actualizarCarrito() {
    
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0)
    
    localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras))
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + el.precio, 0)
}


function revisarLocal (){
    let carritoLocal = JSON.parse(localStorage.getItem('carritoDeCompras'))
    if(carritoLocal){
        carritoLocal.forEach((el)=>agregarAlCarrito(el.id))
    }
}

revisarLocal()



$(document).ready(function(){

    $("#AbrirFormulario").click(function () {
    $("#exampleModal").modal();
    });
    
    $("#EliminarFormulario").click(function () {
    setTimeout (function() {
    location.reload(); }, 5000);
    });

    $("#EnviarFormulario").click(function () {
        setTimeout (function() {
        location.reload(); }, 5000);
        });
}); 
