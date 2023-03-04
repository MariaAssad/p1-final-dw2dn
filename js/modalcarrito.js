'use strict';
//modal carrito

const actualizarModalCarrito = () => {
  let modalCarrito = document.querySelector("#modalCarrito");
  modalCarrito.remove();
  armarModalCarrito();
}

const armarModalCarrito = () =>{
  let modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "modalCarrito";
  let a = document.createElement("a");
  a.className = "cerrar";
  a.href = "javascript:void(0)";
  a.innerHTML = "X";
  a.addEventListener('click', () => {
      console.log(a.parentNode)
      a.parentNode.remove();
  });
  let p = document.createElement("p");
  p.innerHTML = "Items: ";
  let items = document.createElement("p");
  items.innerHTML = carrito.obtenerCantidadTotal();
  let total = document.createTextNode(" - Total: ");
  let precio = document.createElement("span");
  precio.innerHTML = `$${carrito.obtenerPrecio()}`;
  
  p.append(items, total, precio);
  let hr = document.createElement("hr");
  let ul = document.createElement("ul");

  let botonVaciar = document.createElement("button");
  botonVaciar.innerHTML = "Vaciar";
  botonVaciar.addEventListener("click", ()=>{
      carrito.vaciar();
      actualizarModalCarrito();
      actualizarCarrito();
  });
  let botonCheckout = document.createElement("button");
  botonCheckout.innerHTML = "Ir al checkout";
  botonCheckout.addEventListener('click', (e) => {
    if(carrito.obtenerCantidadTotal() > 0){
      armarModalCheckout();
      e.currentTarget.parentNode.remove();
    }
  });
  carrito.obtenerProductos().forEach(producto => {
      let li = document.createElement("li");
      li.innerHTML = producto.obtenerNombre();
      
      let precio = document.createElement("span");
      precio.innerHTML = " $" + producto.obtenerPrecio() + " ";

      let items = document.createElement("span");
      items.innerHTML = producto.obtenerCantidad(); + " items";

      let a = document.createElement("a");
      a.innerHTML = "Eliminar";
      a.href = "#";
      a.addEventListener('click', ()=>{
          carrito.eliminarProducto(producto.identificador());
          actualizarModalCarrito();
          actualizarCarrito();
      });

      li.append(precio, items, a);
      ul.append(li);

  });
  modal.append(a,p,hr,ul,botonVaciar,botonCheckout);
  
  let body = document.body;
  body.append(modal);
}
