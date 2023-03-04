class ProductoCarrito {
  #id;
  #precio;
  #cantidad;
  #nombre;

  constructor(producto){
    this.#id = producto.id;
    this.#precio = producto.precio;
    this.#nombre = producto.nombre;
    this.#cantidad = producto.cantidad || 1;
  }

  agregarProducto(){
    this.#cantidad ++;
  }
  eliminarProducto(){
    this.#cantidad --;
  }
  identificador(){
    return this.#id;
  }
  obtenerNombre(){
    return this.#nombre;
  }
  obtenerPrecio(){
    return this.#precio;
  }
  obtenerCantidad(){
    return this.#cantidad;
  }
}