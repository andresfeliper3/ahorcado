function confirm() {

  //Reconocer palabra
   palabra = document.getElementById('palabra');
   confirmar = palabra.value.toLowerCase();
  console.log(confirmar);
   function noNumber () {
     for(var i=0;i<10;i++) {
      if(confirmar.indexOf(""+i+"")!=-1) {
        location.reload();
        alert("No se valen los números");
        break;
      }
    }
  }
  noNumber();
  //Caja de texto vacía
  if(confirmar=="") {
    alert("Debe ingresar una palabra");
  } else {
    //Desaparecer
    var contenido = document.getElementsByClassName('content')[0];
    contenido.style.display="none";
    //Aparecer botón
    var jugar = document.getElementsByClassName('hidden')[0];
    jugar.style.display="block";
  }

 //Comienzo
  jugar.style.display="none"; //Desaparecer botón
  var teclado=document.getElementById('teclado');
  var marcador=document.getElementById('marcador');
  var marcaletras=document.getElementById('marcaletras');
  var resto = document.getElementById('resto');
  teclado.style.display="inline-block";
  resto.style.display="inline-block";

            //Canvas
    var canvas = document.getElementById('myCanvas');
    canvas.style.display="inline-block";
    canvas.width =400;
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
          espacio = confirmar.indexOf(" ");
          espacio2 = confirmar.indexOf(" ",espacio+1);
          todosEspacios = [espacio,espacio2];
        function placeSpaces(a) {
          if(a!=-1) {
            var tomarEspacio = confirmar.charAt(a);
            var espaciado = document.getElementById('cas'+a+'');
            espaciado.style.border = "none";
          }
        }
        placeSpaces(espacio);
        placeSpaces(espacio2);
        //Para que se muestre si hay más de dos espacios
        while(espacio2<confirmar.length && espacio2 != -1) {
          espacio2 = confirmar.indexOf(" ",espacio2+1);
          placeSpaces(espacio2);
          todosEspacios.push(espacio2);
        }
        if (espacio2 == -1) { //para que los espacios no se vean afectados por el -1, al terminar el ciclo
          espacio2=espacio;
        }
        todosEspacios.pop();

        //Canvas de la horca
        function tree(a,b,c,d) {
          ctx.beginPath();
          ctx.lineWidth=2;
          ctx.moveTo(a,b);
          ctx.lineTo(c,d);
          ctx.stroke();
          //Cuadrado
          ctx.beginPath();
          ctx.strokeRect(280,250,40,40);
        }
        tree(100,0,100,10); //1
        tree(100,0,300,0); //2
        tree(300,0,300,250); //3
    }
    appear();
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
  //Dibujo del ahorcado en canvas (linea 27)
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
  body(7,30,102,300,102,5,"red"); //Muerte
//Doble click en tecla acertada no se marque como otro acierto
  //m1.innerText.indexOf();
  //Declarar victoria
    function victory() {
      if(aciertos.innerText==confirmar.length) {
        alert("Ganaste");
      }
  //Victoria cuando hay cualquier cantidad de espacios
      var confirmarmenos = confirmar.length-todosEspacios.length;
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
