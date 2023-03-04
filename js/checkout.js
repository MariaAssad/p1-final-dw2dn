'use strict';

let step = 0;
const eventoShowCuotas = (id, display) => {
  let element = document.querySelector(id);
  let cuotas = document.querySelector("#cuotas");
  element.addEventListener('click', (e)=>{
    cuotas.style.display = display;
    let label = document.querySelector("#labelcuotas");
    label.style.display = display;
  })
}

const verificarCompletados = (arrayInputsName) => {
  let faltantes = []
  arrayInputsName.forEach(inputName => {
    const input = document.querySelector(`[name="${inputName}"]`);
    if(input.value == ""){

      input.style.border = "1.5px solid red";
      let label = document.querySelector("#label"+input.id);
      label.style.color = "red";
      faltantes.push(input);
    }
  });
  return {completados: faltantes.length == 0, faltantes};
}

const verificarCompletadosRadio = (inputName) => {
  let seleccionado = null
  const radios = document.querySelectorAll(`[name="${inputName}"]`);
  radios.forEach(input=>{
    if(input.checked) {
      if(input.id == 'mercadopago'){
        let cuotas = document.querySelector("#cuotas");
        console.log("cuotas value: ",cuotas.value);
        seleccionado = cuotas.value !== '';
        cuotas.style.border = "1.5px solid red";
        let label = document.querySelector("#labelcuotas");
        label.style.color = "red";
      }else seleccionado = true
    }
  })
  return {completados: seleccionado};
}

const armarInput = (id, name, type, labelText, value) => {
  let label = document.createElement("label");
  label.id = `label${id}`;
  label.for = id;
  label.innerHTML = labelText;
  let input = document.createElement("input");
  input.name = name;
  input.id = id;
  input.addEventListener('change', (e)=>{
    e.target.style.border = "";
    let labeltarget = document.querySelector("#label"+ e.target.id);
    labeltarget.style.color = "#134f5c";
  })
  if(value) {
    input.value = value;
  };
  input.type = type;
  return [label, input];
};


const armarForm = () => {
  let form = document.createElement("from");
  form.style.display = "grid";
  let nombrelabel = document.createElement("label");
  nombrelabel.for = "nombre"
  nombrelabel.innerHTML = "Nombre:";
  let inputs;
  
  let div = document.createElement("div");
  div.style.display ="flex";
  div.style.justifyContent ="space-around";
  div.style.marginTop ="25px";


  let cancelar = document.createElement("input");
  cancelar.value = "Cancelar";
  cancelar.type = "button";
  cancelar.addEventListener('click', (e) => {
    let modalCheckout = document.querySelector("#modalCheckout");
    modalCheckout.remove();
  });
  let aceptar = document.createElement("input");
  aceptar.type = "button";

  if(step == 0){
    inputs = [
      ...armarInput("nombre", "nombre", "text", "Nombre:"),
      ...armarInput("telefono", "telefono", "tel", "Teléfono:"),
      ...armarInput("email", "email", "email", "Email:"),
      ...armarInput("direccion", "direccion", "text", "Dirección:"),
    ];
    aceptar.value = "Siguiente";
    aceptar.addEventListener('click', (e) => {
      let {completados, faltantes} = verificarCompletados(['nombre', 'telefono', 'email', 'direccion']);
      if(completados){
        step = 1;
        let modalCheckout = document.querySelector("#modalCheckout");
        modalCheckout.remove();
        armarModalCheckout();
      }else{
        let span = document.querySelector("#errorMsg");
        span.innerHTML = "Por favor complete los datos faltantes";
        span.style.display = "block";
      }
    });
  }else{
    inputs = [
      ...armarInput("mercadopago", "metododepago", "radio", "Mercado Pago", "mercado"),
      ...armarInput("efectivo", "metododepago", "radio", "Efectivo", "efectivo"),
      ...armarInput("cuotas", "cuotas", "number", "Cuotas:"),
    ]
    aceptar.value = "Aceptar";
    aceptar.addEventListener('click', (e) => {
      let {completados} = verificarCompletadosRadio(['metododepago']);
      console.log("completados:", completados);
      if(completados){
        step = 0;
        carrito.vaciar();
        actualizarCarrito();
        let modalCheckout = document.querySelector("#modalCheckout");
        modalCheckout.remove();
      }else{
        let span = document.querySelector("#errorMsg");
        span.innerHTML = "Por seleccione la forma de pago";
        span.style.display = "block";
      }
    });

  }
  
  let span = document.createElement("span");
  span.id = "errorMsg";
  span.style.color = "red";
  span.style['text-align'] = "center";
  span.style['font-size'] = "18px";
  span.style.display = "none";

  div.append(cancelar, aceptar)
  form.append(...inputs, span, div);
  
  return form;
}

const armarModalCheckout = (id) => {
  let modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "modalCheckout";

  let a = document.createElement("a");
  a.className = "cerrar";
  a.href = "javascript:void(0)";
  a.innerHTML = "X";
  a.addEventListener('click', ()=>{
      a.parentNode.remove();
  })

  let form = armarForm()
  
  let p = document.createElement("p");
  p.innerHTML = "Ingrese sus datos para completar la compra";


  modal.append(a, p, form);
  document.body.append(modal);


  let cuotas = document.querySelector("#cuotas");
  if(cuotas){
    let label = document.querySelector("#labelcuotas");
    label.style.display = "none";
    cuotas.style.display = "none";
    eventoShowCuotas("#mercadopago", "block");
    eventoShowCuotas("#efectivo", "none");
  }
}
