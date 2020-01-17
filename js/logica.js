function SearchData(data) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          let respond = this.responseText
          
        }
  };
  xhttp.open("GET", data , true);
  xhttp.send();
  
}

SearchData("info.json")




// return new promise((resolver, reject) => {
//   if (this.readyState == 4 && this.status == 200) {
//     Console.log('hi')
//     resolver('true')
//   } else {
//     reject('error')
//     Console.log('ooooOoo')
//   }
// })