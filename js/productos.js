'use strict';
let productos = [
  {
      id: 1,
      nombre: 'AIR CLEANER',
      descripcion: 'Filtro de aire 27 kva',
      precio: 11550,
      imagenes: ['imagenes/repuestos/filtro-de-aire.webp'],
      categoría: 'Repuestos',
  },
  {
      id: 2,
      nombre: 'BOBINA 8-13-17 Kva',
      descripcion: 'ASSY IGN COIL NO ADV 760/990',
      precio: 27000,
      imagenes: ['imagenes/repuestos/bobina.webp'],
      categoría: 'Repuestos',
  },
  {
      id: 3,
      nombre: 'DIODE BRIDGE',
      descripcion: '1P 35A 1000V',
      precio: 10600,
      imagenes: ['imagenes/repuestos/diobe-bridge.webp'],
      categoría: 'Repuestos',
  },
  {
      id: 4,
      nombre: 'FILTRO DE ACEITE 27 KVA',
      descripcion: 'FILTER 1.5L/2.4L G2 OIL',
      precio: 19000,
      imagenes: ['imagenes/filtros/filtro-aceite-27kva.webp'],
      categoría: 'Filtros',
  },
  {
      id: 5,
      nombre: 'FILTRO DE ACEITE 50 KVA',
      descripcion: 'OIL FILTER 0D5419',
      precio: 30000,
      imagenes: ['imagenes/filtros/filtro-aceite-50kva.webp'],
      categoría: 'Filtros',
  },
  {
      id: 6,
      nombre: 'OIL SAE 10W-30 x 946ml',
      descripcion: 'ACEITE DE BOTELLA 1 LTR.',
      precio: 4900,
      imagenes: ['imagenes/aceites/aceite-botella.webp'],
      categoría: 'Aceites',
  },
  
];

let categorias = ['Repuestos', 'Filtros', 'Aceites'];


const buscarProducto = (id) => {
  return productos.filter((producto) => producto.id == id)[0];
}

