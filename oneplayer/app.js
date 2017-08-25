function confirm() {
  //Desaparecer
  var ahorcado = document.getElementById('ahorcado');
  ahorcado.style.display ="none";
  //Aparecer
  var teclado=document.getElementById('teclado');
  var marcador=document.getElementById('marcador');
  var marcaletras=document.getElementById('marcaletras');
  teclado.style.display="block";
  resto.style.display="inline-block";
            //Canvas
    var canvas = document.getElementById('myCanvas');
    canvas.style.display="inline-block";
    canvas.width =200;
    canvas.height =400;
    ctx = canvas.getContext("2d");
  //Contador de errores (linea 79)
  errores = document.getElementById('errores');
  contaneg = 0;
  errores.innerText = contaneg;
  //Contador de aciertos (linea 85)
  aciertos = document.getElementById('aciertos');
  contapos = 0;
  aciertos.innerText = contapos;
  //Aparecer caracteres
  var cantidad = confirmar.length;
    function appear() {
      for(var i=0;i<cantidad;i++) {
          var casillas= document.createElement("div");
          casillas.classList.add("casilla");
          casillas.setAttribute("id","cas"+i+"");
          var otro = document.getElementById('otro');
          document.body.insertBefore(casillas,otro);
      }
    //Agregar espacios
           espacio = confirmar.indexOf(" "); //REVISAR: Solo reconoce un espacio, solucionar con funcion que revisa cada index de la palabra
          if(espacio!=-1) {
            var espaciado = document.getElementById('cas'+espacio+'');
            espaciado.style.border = "none";
          }
    }
    appear();
}

//Animales
function animals() {
     animales = ["oso", "perro", "gato", "ave", "caballo", "jirafa"," elefante","bisonte","bufalo","burro","caballo","camello","cebra","cerdo","chimpance","ciervo","hipopotamo","jabali","leon","oveja","tigre","leopardo","guepardo","topo","toro","vaca","zorro"];
     random = Math.floor(Math.random()*animales.length+1);
     confirmar = animales[random];
     console.log(confirmar);
  confirm();
}
//Frutas
function fruits() {
     frutas = ["manzana", "pera", "banano", "papaya", "mango", "piña","fresa","limon","mandarina","naranja","pomelo","melon","sandia","aguacate","chirimoya","carambolo", "coco","datil","kiwi","albaricoque","cereza","frambuesa","arandano","ciruela","higo","melocoton","nectarina","nispero","uva"];
     random = Math.floor(Math.random()*frutas.length+1);
     confirmar = frutas[random];
     console.log(confirmar);
  confirm();
}

//Dar click en las letras y comprobar si hace parte de la palabra
function selectEach(v) {
  document.getElementById(''+v+'').addEventListener('click', function() {
      var letra = document.getElementById(''+v+'').value;
     letra = letra.toString().toLowerCase();
     confirmar = confirmar.toString();
      var pos = confirmar.indexOf(letra);
      console.log("pos "+pos);
      pos2 = confirmar.indexOf(letra,pos+1);
      console.log("pos2 "+pos2);
      var array = [pos,pos2]; //array que guarde las posiciones en la que se encuentra le letra clickeada
// Marcas las dos primeras casillas reconocidas con la letra clickeada
    function place(a) {
        if(a!=-1) {
          var caracter = confirmar.charAt(a);
          var cuadro = document.getElementById('cas'+a+'');
          cuadro.innerText = caracter;
        }
    }
    place(pos); //Llamar a la función con la primera letra encontrada
    place(pos2); //Llamar a la función con la segunda letra encontrada
//por si hay más de una misma letra (funcion setup)
  function setup() {
      while(pos2<confirmar.length && pos2 != -1) {
           pos2 = confirmar.indexOf(letra,pos2+1);
          console.log("pos2 despues del bucle "+pos2);
          place(pos2); //Lamar a la función con el resto de letras encontradas
          array.push(pos2);
      }
      if (pos2==-1) { //para que no se vea afectado por el -1, el contador de errores
        pos2=pos;
      }
      console.log("pos2 sin negativo "+pos2);
      array.pop();
      console.log(array);
  //Contador de errores (funcionamiento) (linea 26)
      while(pos==-1) {
        contaneg += 1;
        break;
      }
      errores.innerText = contaneg;
  //Contador de aciertos (funcionamiento) (linea 30)
      while(pos!=-1) {
        contapos +=1;
        break;
      }
      aciertos.innerText = contapos;
    }
    setup();
  //Contador de aciertos debe ser igual a letras acertadas
    if(array.length>1) {
      var txt = parseInt(aciertos.innerText)-1;
      console.log(txt);
      aciertos.innerText = txt + parseInt(array.length);  //Marcador debe ser igual a cantidad de letras acertadas
      contapos = parseInt(aciertos.innerText);  //Contapos debe tomar ese mismo valor para no inicializarse en 1
    }
  //Marcador de letras
    function letterWriter() {
      var m1 = document.createElement('p');
      m1.innerText = letra+", ";
      marcaletras.appendChild(m1);
    }
    letterWriter();
    //Cabeza
      if(errores.innerText==1) {
        ctx.beginPath();
        ctx.arc(100,50,40,0,2*Math.PI);
        ctx.stroke();
      }
      //Cuerpo
      function body(error,a,b,c,d,grosor,color) {
      if(errores.innerText==error) {
        ctx.beginPath();
        ctx.lineWidth=grosor;
        ctx.strokeStyle=""+color+"";
        ctx.moveTo(a,b);
        ctx.lineTo(c,d);
        ctx.stroke();
      }
    }
    body(2,100,90,100,210); //Cuerpo
    body(3,100,115,30,160); //Brazo 1
    body(4,100,115,170,160); //Brazo 2
    body(5,100,210,30,285); //Pierna 1
    body(6,100,210,170,285); //Pierna 2
    body(7,0,102,200,102,5,"red"); //Muerte
  //Declarar victoria
    function victory() {
      if(aciertos.innerText==confirmar.length) {
        alert("Ganaste");
      }
  //Victoria cuando hay un espacio
      var confirmarmenos = confirmar.length-1;
      console.log("revisar "+confirmarmenos)
      if(espacio!=-1) {
        if(aciertos.innerText==confirmarmenos) {
          alert("Ganaste");
        }
      }
    }
    victory();
  //Declarar derrota
    function lose() {
      if(errores.innerText==7) {
        for(var i=0;i<confirmar.length;i++) { //Descube la palabra misteriosa
          place(i);
        }
      }
    }
    lose();
  });
}
  selectEach('q');
  selectEach('w');
  selectEach('e');
  selectEach('r');
  selectEach('t');
  selectEach('y');
  selectEach('u');
  selectEach('i');
  selectEach('o');
  selectEach('p');
  selectEach('a');
  selectEach('s');
  selectEach('d');
  selectEach('f');
  selectEach('g');
  selectEach('h');
  selectEach('j');
  selectEach('k');
  selectEach('l');
  selectEach('ñ');
  selectEach('z');
  selectEach('x');
  selectEach('c');
  selectEach('v');
  selectEach('b');
  selectEach('n');
  selectEach('m');
  //Volver
  function comeback() {
    window.history.back();
  }
