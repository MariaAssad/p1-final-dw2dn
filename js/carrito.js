class Carrito {
  #productos = [];
  #cantidadTotal = 0;
  #precio = 0;

  obtenerPrecio(){
    return this.#precio;
  }
  obtenerCantidadTotal(){
    return this.#cantidadTotal;
  }

  obtenerCantidadProducto(id){
    let contador = 0;
    let index = 0;
    let encontro = false;
    while (this.#productos[index] && !encontro) {
      if(this.#productos[index].identificador() == id){
        encontro = true;
        contador = this.#productos[index].obtenerCantidad();
      }
      index++;
    }
    return contador;
  }
  obtenerProductos() {
    return this.#productos;
  }

  constructor({productos, cantidadTotal, precio}){
    console.log("creando carrito:", productos)
    productos.forEach((prod) => {
      let nuevoProducto = new ProductoCarrito(prod);
      this.#productos.push(nuevoProducto);
    })
    this.#cantidadTotal = cantidadTotal;
    this.#precio = precio;
  }

  agregarProducto(producto){
    let nuevoProducto = this.#productos.filter((viejoProducto) => {
      return producto.id == viejoProducto.identificador()
    })[0];
    if(nuevoProducto){
      nuevoProducto.agregarProducto();
    }else{
      nuevoProducto = new ProductoCarrito(producto)
      this.#productos.push(nuevoProducto);
    }
    this.#precio = this.#precio + producto.precio;
    this.#cantidadTotal ++;
    this.actualizarLocalStorage();
  }
  eliminarProducto(id){
    let borrado = false;
    let index = 0;
    while (!borrado && index < this.#productos.length) {
      let producto = this.#productos[index];
      if(producto.identificador() == id){
        this.#precio = this.#precio - producto.obtenerPrecio();
        this.#cantidadTotal --;
        if(producto.obtenerCantidad() > 1){
          producto.eliminarProducto();
        }else{
          this.#productos.splice(index,1);
        }

        borrado = true;
      }
      index++;
    }
    this.actualizarLocalStorage();
  }
  vaciar(){
    this.#productos = [];
    this.#cantidadTotal = 0;
    this.#precio = 0;
    this.actualizarLocalStorage();
  }
  actualizarLocalStorage(){
    console.log("this.#productos:", this.#productos);
    let productos = [];
    this.#productos.forEach((prod) => {
      let producto = {};
      producto.cantidad = prod.obtenerCantidad();
      producto.id = prod.identificador();
      producto.nombre = prod.obtenerNombre();
      producto.precio = prod.obtenerPrecio();
      productos.push(producto);
    })
    let viejocarrito = {
      productos: productos,
      cantidadTotal: this.#cantidadTotal,
      precio: this.#precio
    }
    localStorage.carrito = JSON.stringify(viejocarrito);
  }
}