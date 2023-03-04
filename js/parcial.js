'use strict';


let filtroActivo = null;
let timeout = null;
const obtenerBannerRandom = (min, max) => {
    return Math.random() * (max - min) + min;
}
const actionTimeout = () => {
    let banner = document.querySelector("#oferta");
    banner.remove();
    timeout = null;
    
}
const mostrarBanner = () => {
    if(timeout){
        clearTimeout(timeout);
        actionTimeout();
    }
    let banner = document.createElement("div");
    let div = document.createElement("div");
    let p = document.createElement("p");
    let span = document.createElement("span");
    let img = document.createElement("img");
    let button = document.createElement("button");
    span.innerHTML = "X";
    span.className = "close"
    span.addEventListener('click', (e)=>{
      clearTimeout(timeout);
      actionTimeout();
    })
    let numero = obtenerBannerRandom(0,8);
    let producto = productos[parseInt(numero)];
    img.src = producto.imagenes[0];
    button.innerHTML = "Agregar al carrito";
    button.addEventListener('click', (e)=>{
        clearTimeout(timeout);
        actionTimeout();
        carrito.agregarProducto(producto);
        actualizarCarrito();
        notificarAgregado();
    })
    p.innerHTML = `Obtené un 10% en tu primera compra con el cupón GENERAC`;
    banner.id = "oferta";
    div.append(span,img,p, button);
    banner.append(div);
    document.body.append(banner);
    timeout = setTimeout(actionTimeout, 10000);
}

const armarFiltros = () => {
    let filtros = document.createElement("div");
    filtros.className = "categorias";

    for (let index = 0; index < categorias.length; index++) {
        let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = categorias[index];

        a.addEventListener('click', (e) => {
            let divProductos = document.querySelector("#productos");
            let clone = divProductos.cloneNode(false);

            let main = document.querySelector("main");
            main.removeChild(divProductos);
            main.append(clone);
            if(filtroActivo == e.currentTarget.innerHTML){
                e.currentTarget.className = "";
                filtroActivo = null;
                armarListado(productos);
            }else{
                filtroActivo = e.currentTarget.innerHTML;
                let categorias = document.querySelectorAll(".categorias > a");
                categorias.forEach(cat => cat.className = "")
                e.currentTarget.className = "filtroactivo";
                armarListado(productos.filter(producto => producto.categoría == filtroActivo));
                mostrarBanner();
            }
        });
        filtros.append(a);
    }
    let main = document.querySelector("#minicarrito");
    main.append(filtros);

}

const armarListado = (listado) => {
    let divProductos = document.querySelector("#productos");

    listado.forEach((producto) => {
        let divGenerico = document.createElement("div");
    
        let img = document.createElement("img");
        img.src = producto.imagenes[0];
        img.alt = producto.descripcion;
        img.addEventListener('click', e => {
            armarModalProducto(producto.id);
        })
        
        let divInfo = document.createElement("div");
        
        let {h3, descripcion, precio, categoria, button} = datosProducto(producto)
    
        divInfo.append(h3, descripcion, precio, categoria, button);
        
        divGenerico.append(img, divInfo);
        
        divProductos.append(divGenerico);
    })
}

let header = document.querySelector("header");
let span = document.createElement("span");
header.prepend(span);

armarFiltros();
armarCarrito();
armarListado(productos);




