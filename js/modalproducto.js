'use strict';
//modal producto
let imagenSeleccionada = 0;
let productoSeleccionado = null;
const datosProducto = (producto) => {
    
  let h3 = document.createElement("h3");
  let descripcion = document.createElement("p");
  let precio = document.createElement("p");
  let categoria = document.createElement("p");
  let button = document.createElement("button");
  
  h3.innerHTML = producto.nombre;
  descripcion.innerHTML = producto.descripcion;
  precio.innerHTML = "$"+producto.precio;
  categoria.innerHTML = producto.categoría;
  button.innerHTML  = "Agregar";

  button.addEventListener('click', e => {
      carrito.agregarProducto(producto);
      actualizarCarrito();
      let modal = document.querySelector("#modalProducto");
      if(modal) modal.remove();
      notificarAgregado();
  });
  return {h3, descripcion,precio, categoria, button}
}

const armarModalProducto = (id) => {
  productoSeleccionado = id;
  let modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "modalProducto";

  let a = document.createElement("a");
  a.className = "cerrar";
  a.href = "javascript:void(0)";
  a.innerHTML = "X";
  a.addEventListener('click', ()=>{
    imagenSeleccionada = 0;
    a.parentNode.remove();
  })

  let producto = buscarProducto(id)
  
  let img = document.createElement("img");
  img.src = producto.imagenes[imagenSeleccionada];

  let galeria = document.createElement("div");
  if(producto.imagenes.length > 1){
    producto.imagenes.forEach((imagen, index) => {
      if(index !== imagenSeleccionada){
        let imgGaleria = document.createElement("img");
        imgGaleria.src = imagen;
        imgGaleria.addEventListener('click', () => {
          imagenSeleccionada = index;
          let modalProducto = document.querySelector("#modalProducto");
          modalProducto.remove();
          armarModalProducto(productoSeleccionado);
        })
        galeria.append(imgGaleria);
      }
    })
  }
  
  let { h3, descripcion, precio, categoria, button} = datosProducto(producto)

  modal.append(a, img, galeria, h3, descripcion, precio, categoria, button);
  document.body.append(modal);
}
let notificando = null;
const removeNotification = ()=>{
  let notificacion = document.querySelector(".notificacion");
  notificacion.remove();
}
const notificarAgregado = () =>{
  if(notificando){
    clearTimeout(notificando);
    notificando = null;
    removeNotification()
  }
  let div = document.createElement("div");
  div.className = "notificacion";
  let p = document.createElement("p");
  p.innerHTML = "Producto agregado al carrito!"
  let span = document.createElement("span");
  span.innerHTML = "X";
  span.className = "close"
  span.addEventListener('click', (e)=>{
    clearTimeout(notificando);
    notificando = null;
    e.currentTarget.parentNode.remove();
  })
  div.append(span, p);
  document.body.append(div);
  notificando = setTimeout(removeNotification, 10000);

}

window.addEventListener('keydown', (e)=>{
  switch (e.key) {
      case 'Escape':
          let modalProducto = document.querySelector("#modalProducto");
          if(modalProducto) modalProducto.remove();
          let modalCarrito = document.querySelector("#modalCarrito");
          if(modalCarrito) modalCarrito.remove();
          let modalCheckout = document.querySelector("#modalCheckout");
          if(modalCheckout) modalCheckout.remove();
          break;
      case 'ArrowRight':
          if(productoSeleccionado !== null){
            let producto = buscarProducto(productoSeleccionado);
            if(imagenSeleccionada < producto.imagenes.length -1){
              imagenSeleccionada++;
              let modalProducto = document.querySelector("#modalProducto");
              modalProducto.remove();
              armarModalProducto(productoSeleccionado);
            }
          }
          break;
      case 'ArrowLeft':
          if(productoSeleccionado !== null && imagenSeleccionada >0){
            imagenSeleccionada--;
            let modalProducto = document.querySelector("#modalProducto");
            modalProducto.remove();
            armarModalProducto(productoSeleccionado);
          }
          break;
      default:
          break;
  }
})
