const pasados = document.getElementById('pasados') 
const futuros = document.getElementById('proximos')
const detalle = document.getElementById('evento') 
const lugar=location.href
let detalleEvento = document.getElementById('detalleEvento')


function cargarData(){
    $.ajax({
      url:'http://127.0.0.1:5500/proyectoDeJavaScript_Marileidy_Manzueta/info.json'
    }).done((respuesta)=>{
        let fechaActual=respuesta.fechaActual
        let eventos=respuesta.eventos
        let search =location.search
        let index ='http://127.0.0.1:5500/proyectoDeJavaScript_Marileidy_Manzueta/index.html'
        eventos.sort(function(a, b) {
          var c = new Date(a.fecha);
          var d = new Date(b.fecha);
          return c-d;
          });

        console.log(eventos)
        eventos.forEach(element => {
          let fechas=element['fecha']
          let igualarSearch=`?id=${element.id}`
          switch (lugar) {
            case 'http://127.0.0.1:5500/proyectoDeJavaScript_Marileidy_Manzueta/pasados.html':
              return  EnviaInfo( element,pasados,eventosPasados,fechas,fechaActual)
            case 'http://127.0.0.1:5500/proyectoDeJavaScript_Marileidy_Manzueta/proximos.html':
              return EnviaInfo( element,futuros,eventosFuturos,fechas,fechaActual)
          }
          if(igualarSearch===search){
            crearEvento(element,detalle)
          }
         
        })
        if(index===lugar){
         eventosIndex(eventos,fechaActual)
        }

      })
}

function EnviaInfo(info,lugar,callback,parametro1,parametro2){
    callback(info,lugar,parametro1,parametro2)
}

function eventosPasados(info,lugar,fecha,fechaActual){
      if(fecha<fechaActual){
        return crearEvento(info,lugar)
      }
}

function eventosFuturos(info,lugar,fecha,fechaActual){
      if(fecha>fechaActual){
        return crearEvento(info,lugar)
      }
}

function eventosIndex(eventos,fechaActual) {
    eventosFuturosArray=[]
    eventospasadosArray=[]
    eventos.forEach(element => {
      let fechas=element['fecha']
      if(fechas>fechaActual){
        eventosFuturosArray.push(element);
      }
      if(fechas<fechaActual){
        eventospasadosArray.push(element);
      }
    })
    pasadosArray=eventospasadosArray.slice(1, 3)
    FuturosArray=eventosFuturosArray.slice(1, 3)
    console.log(FuturosArray)
    pasadosArray.forEach(element => {
      let fechas=element['fecha']
      EnviaInfo( element,pasados,eventosPasados,fechas,fechaActual)
    })
    FuturosArray.forEach(element => {
      let fechas=element['fecha']
      EnviaInfo( element,futuros,eventosFuturos,fechas,fechaActual)
    })
}
function eventosDetalles(evento,lugar) {

  crearEvento(evento,lugar)
}
function  crearEvento(evento,lugar){
    let contenedor_evento = document.createElement('div')
    let eveto_nombren = document.createElement('a')
    let evento_fecha = document.createElement('p')
    let evento_descripcion = document.createElement('p')
    let evento_costo = document.createElement('p')
    contenedor_evento.className = "contenedor_evento";
    evento_fecha.className = "evento_fecha";
    evento_costo.className = "evento_costo";
    eveto_nombren.href=`./detalle.html?id=${evento.id}`
    eveto_nombren.id=`detalleEvento`
    eveto_nombren.textContent = evento.nombre
    evento_fecha.textContent =`${evento.fecha} ${evento.lugar}` 
    evento_descripcion.textContent = evento.descripcion
    evento_costo.textContent =`Costo: ${evento.precio}`
    lugar.appendChild(contenedor_evento);
    contenedor_evento.appendChild(eveto_nombren);
    contenedor_evento.appendChild(evento_fecha);
    contenedor_evento.appendChild(evento_descripcion);
    contenedor_evento.appendChild(evento_costo);
   
}
// detalleEvento.addEventListener("click",  eventosDetalles(evento,detalle));

$(document).ready(function () {
  cargarData()
});
