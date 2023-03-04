'use strict';
//carrito

let carrito;


const actualizarContado = () => {
    let contador = document.querySelector(".contador");
    contador.innerHTML = carrito.obtenerCantidadTotal();
}

const actualizarPrecio = () => {
    let precioCarrito = document.querySelector(".precio");
    precioCarrito.innerHTML = "$"+carrito.obtenerPrecio();
}

const actualizarCarrito = () => {
    actualizarContado();
    actualizarPrecio();
}



const armarCarrito = () => {
    //Localstorage
    let viejocarrito = localStorage.carrito;
    if(!viejocarrito){
        viejocarrito = {
            productos: [],
            cantidadTotal: 0,
            precio: 0
        }
        localStorage.carrito = JSON.stringify(viejocarrito);
    }else{
        viejocarrito = JSON.parse(viejocarrito);
    }
    
    //Armado de carrito
    carrito = new Carrito(viejocarrito);
    let div = document.createElement("div");
    let botoncarrito = document.createElement("button");
    let contador = document.createElement("span");
    contador.className = "contador";
    contador.innerHTML = 0;
    let preciototal = document.createElement("span");
    preciototal.className = "precio";
    preciototal.innerHTML = "$0";
    let minicarrito = document.querySelector("#minicarrito");

    div.append(botoncarrito, contador, preciototal);
    minicarrito.append(div);

    div.addEventListener('click', armarModalCarrito);
    
    actualizarCarrito();
}

