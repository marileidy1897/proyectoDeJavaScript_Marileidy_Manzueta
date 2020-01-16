const pasados = document.getElementById('pasados') 
const futuros = document.getElementById('proximos')
const detalle = document.getElementById('evento') 
const lugar=location.href
let detalleEvento = document.getElementById('detalleEvento')

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     console.log('genio de lampara')
    }
  };
  xhttp.open("GET", "info.json", true);
  xhttp.send();
}
loadDoc()

