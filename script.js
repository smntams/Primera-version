function mostrarVentana(icono,titulo,texto,recompensa){
  document.getElementById("gameModalIcon").textContent=icono;
  document.getElementById("gameModalTitle").textContent=titulo;
  document.getElementById("gameModalText").textContent=texto;
  document.getElementById("gameModalReward").textContent=recompensa;
  document.getElementById("gameModal").classList.add("show");
}
function cerrarGameModal(){
  document.getElementById("gameModal").classList.remove("show");
}
document.addEventListener("keydown",function(e){
  if(e.key==="Escape") cerrarGameModal();
});

/* ==============================
   ESTADO DEL JUEGO
================================ */

let estado = {
  hambre:70,
  energia:70,
  felicidad:70,
  oceano:70,
  acciones:0
};

const datos = [

  "🌊 El océano cubre aproximadamente el 71% de la superficie de nuestro planeta.",

  "🐢 Las tortugas marinas pueden confundir bolsas de plástico con medusas, uno de sus alimentos.",

  "♻️ Reducir el uso de plásticos de un solo uso ayuda a disminuir los residuos que pueden llegar al mar.",

  "🪸 Los arrecifes de coral proporcionan refugio y alimento para muchas especies marinas.",

  "🐠 La biodiversidad marina es fundamental para mantener ecosistemas saludables.",

  "🌎 El ODS 14 busca conservar y utilizar sosteniblemente los océanos, mares y recursos marinos.",

  "💧 Mantener los océanos limpios ayuda a proteger a las especies marinas y sus hábitats.",

  "🎣 La pesca sostenible busca que podamos aprovechar los recursos marinos sin destruir las poblaciones de peces.",

  "🌿 Los ecosistemas costeros y marinos también contribuyen al bienestar de las comunidades humanas.",

  "💙 Las pequeñas acciones cotidianas pueden contribuir a reducir nuestro impacto sobre los ecosistemas marinos."

];


/* ==============================
   ACTUALIZAR INTERFAZ
================================ */

function limitar(valor){
  return Math.max(0,Math.min(100,valor));
}

function actualizar(){

  estado.hambre=limitar(estado.hambre);
  estado.energia=limitar(estado.energia);
  estado.felicidad=limitar(estado.felicidad);
  estado.oceano=limitar(estado.oceano);

  document.getElementById("hungerBar").style.width=estado.hambre+"%";
  document.getElementById("energyBar").style.width=estado.energia+"%";
  document.getElementById("happyBar").style.width=estado.felicidad+"%";
  document.getElementById("cleanBar").style.width=estado.oceano+"%";

  document.getElementById("hungerText").textContent=Math.round(estado.hambre)+"%";
  document.getElementById("energyText").textContent=Math.round(estado.energia)+"%";
  document.getElementById("happyText").textContent=Math.round(estado.felicidad)+"%";
  document.getElementById("cleanText").textContent=Math.round(estado.oceano)+"%";

  document.getElementById("actions").textContent=estado.acciones;

  cambiarOceanVisual();

}


/* ==============================
   CAMBIO DEL OCEANO
================================ */

function cambiarOceanVisual(){

  const ocean=document.getElementById("ocean");

  let intensidad=estado.oceano;

  if(intensidad>80){

    ocean.style.background=
      "linear-gradient(#50e9f3 0%,#13b7d5 45%,#07568b 100%)";

  }else if(intensidad>50){

    ocean.style.background=
      "linear-gradient(#4bd2df 0%,#168fb9 45%,#07517c 100%)";

  }else{

    ocean.style.background=
      "linear-gradient(#72b9bf 0%,#3e7e91 45%,#294e63 100%)";

  }

}


/* ==============================
   MENSAJE DE TORTUGA
================================ */

function hablar(texto){

  document.getElementById("message").innerHTML=
    "<strong>🐢 Azul:</strong> "+texto;

}


/* ==============================
   ALIMENTAR
================================ */

function abrirComida(){

  document.getElementById("foodModal")
    .classList.add("show");

}

function cerrarComida(){

  document.getElementById("foodModal")
    .classList.remove("show");

}

function darComida(comida){

  estado.hambre+=20;
  estado.felicidad+=8;
  estado.energia+=5;
  estado.acciones++;

  cerrarComida();

  hablar(
    "¡Ñam! "+comida+
    " ¡Gracias por cuidarme! Alimentar responsablemente a los animales marinos también forma parte de respetar la vida del océano."
  );

  actualizar();

  comprobarLogros();

  mostrarVentana(
    "🐢",
    "¡Azul está feliz!",
    "Le diste alimento y ayudaste a mantener saludable a tu tortuguita.",
    "+20 hambre · +8 felicidad · +5 energía"
  );

}


/* ==============================
   JUGAR
================================ */

function jugar(){

  if(estado.energia < 15){

    hablar("Estoy cansadita 🥺. Necesito descansar antes de jugar.");

    mostrarVentana(
      "🥺",
      "Azul necesita descansar",
      "Su energía está demasiado baja para jugar.",
      "💙 Cuida su energía"
    );

    return;
  }

  estado.energia -= 12;
  estado.felicidad += 18;
  estado.acciones++;

  const turtle = document.getElementById("turtle");

  turtle.classList.remove("giro");

  void turtle.offsetWidth;

  // Primero hace el giro
  turtle.classList.add("giro");

  hablar("¡Mira cómo giro! 🐢💫");

  actualizar();
  comprobarLogros();

  // ESPERA A QUE TERMINE EL GIRO
  setTimeout(() => {

    turtle.classList.remove("giro");

    // Ahora aparece la ventana
    mostrarVentana(
      "💫",
      "¡Azul dio una vuelta!",
      "Azul hizo un giro completo porque jugar la llena de energía y felicidad.",
      "-12 energía · +18 felicidad · +1 acción"
    );

  }, 950);

}
/* ==============================
   LIMPIAR
================================ */

function limpiar(){

  estado.oceano+=15;
  estado.felicidad+=10;
  estado.acciones++;

  hablar("¡Mira qué limpio está! 🌊 Reducir la contaminación ayuda a proteger a las especies y sus hábitats.");

  actualizar();
  comprobarLogros();

  mostrarVentana(
    "🌊",
    "¡Océano más limpio!",
    "Limpiar reduce la contaminación y ayuda a conservar los hábitats de las especies marinas.",
    "+15 océano · +10 felicidad · +1 acción"
  );
}


/* ==============================
   RECOGER BASURA
================================ */

function recogerBasura(elemento){

  elemento.style.transform="scale(0)";
  elemento.style.opacity="0";
  elemento.style.pointerEvents="none";

  setTimeout(()=>{ if(elemento.parentNode) elemento.remove(); },300);

  estado.oceano+=8;
  estado.felicidad+=5;
  estado.acciones++;

  hablar("¡Encontraste basura! ♻️ Los residuos pueden afectar a tortugas, peces, aves y otros animales marinos.");

  actualizar();
  comprobarLogros();

  mostrarVentana(
    "♻️",
    "¡Basura eliminada!",
    "Quitaste un residuo del océano. Esto ayuda a proteger a tortugas, peces, aves y otros animales marinos.",
    "+8 océano · +5 felicidad · +1 acción"
  );
}


/* ==============================
   DATOS EDUCATIVOS
================================ */

function datoAleatorio(){

  const dato=
    datos[Math.floor(Math.random()*datos.length)];

  document.getElementById("fact").innerHTML=
    "<div class='fact-number'>🌊 ¿Sabías que...?</div>"+
    dato;

  hablar(
    "¡Tengo un dato nuevo para ti! 📚 ¡Aprender también es una forma de proteger el océano!"
  );

}


/* ==============================
   TOCAR TORTUGA
================================ */

function tocarTortuga(){

  estado.felicidad+=5;
  estado.acciones++;

  hablar(
    "¡Gracias por el cariño! 💙 Recuerda: los océanos saludables son importantes para toda la vida del planeta."
  );

  actualizar();

}


/* ==============================
   DECORACIONES
================================ */

function agregarElemento(simbolo){

  const ocean=document.getElementById("ocean");
  const nuevo=document.createElement("div");

  nuevo.style.position="absolute";
  nuevo.style.left=Math.floor(Math.random()*80+5)+"%";
  nuevo.style.top=Math.floor(Math.random()*55+35)+"%";
  nuevo.style.zIndex="6";

  let nombre="¡Nuevo animal marino!";
  let icono=simbolo;
  let mensaje="Agregar especies ayuda a representar un ecosistema marino con mayor biodiversidad.";

  if(simbolo==="🪸"){
    nuevo.className="coral clickable-marine";
    nuevo.innerHTML='<span class="branch b1"></span><span class="branch b2"></span><span class="branch b3"></span><span class="tip t1"></span><span class="tip t2"></span><span class="tip t3"></span>';
    nombre="¡Nuevo coral!";
    icono="🪸";
    mensaje="Los arrecifes de coral son refugio y alimento para muchas especies. ¡Tu océano ahora tiene un nuevo hogar para la vida marina!";
  }else if(simbolo==="🪼"){
    nuevo.className="jellyfish clickable-marine";
    nuevo.innerHTML='<span class="cap"></span><span class="tentacle t1"></span><span class="tentacle t2"></span><span class="tentacle t3"></span>';
    nombre="¡Nueva medusa!";
    icono="🪼";
    mensaje="Las medusas forman parte de las cadenas alimentarias marinas. ¡Tu océano es ahora más diverso!";
  }else{
    nuevo.textContent=simbolo;
    nuevo.className="clickable-marine";
    nuevo.style.fontSize="55px";
    nuevo.style.animation="nadar 3s ease-in-out infinite";
  }

  nuevo.onclick=function(e){
    e.stopPropagation();
    mostrarVentana(
      icono,
      nombre,
      mensaje,
      "+3 océano · +4 felicidad · +1 acción"
    );
  };

  ocean.appendChild(nuevo);

  estado.felicidad+=4;
  estado.oceano+=3;
  estado.acciones++;

  document.getElementById("decorationMessage").textContent="✨ ¡Has creado un nuevo elemento para el ecosistema!";

  hablar("¡Qué bonito! "+icono+" Un ecosistema con diferentes especies puede ser más diverso y saludable.");

  actualizar();
  comprobarLogros();

  mostrarVentana(
    icono,
    nombre,
    mensaje,
    "+3 océano · +4 felicidad · +1 acción"
  );
}


/* ==============================
   ABRAZAR
================================ */

function celebrar(){

  estado.felicidad += 12;
  estado.acciones++;

  const turtle = document.getElementById("turtle");

  turtle.style.animation = "none";

  turtle.classList.remove("acercar");

  void turtle.offsetWidth;

  // Primero se acerca
  turtle.classList.add("acercar");

  hablar("¡Awww! 💙 ¡Voy hacia ti para darte un abrazo!");

  actualizar();
  comprobarLogros();

  // Esperamos a que termine el acercamiento
  setTimeout(() => {

    turtle.classList.remove("acercar");

    // Regresa a su animación normal
    turtle.style.animation =
      "nadar 2.5s ease-in-out infinite";

    // AHORA aparece la ventana
    mostrarVentana(
      "💙",
      "¡Azul se acercó a ti!",
      "Azul nadó hacia ti para recibir cariño. ¡Tu tortuguita está muy feliz!",
      "+12 felicidad · +1 acción"
    );

  }, 1250);

}

/* ==============================
   LOGROS
================================ */

function comprobarLogros(){

  const badges=
    document.getElementById("badges");

  if(estado.acciones>=5 &&
     !document.getElementById("badge5")){

    const b=document.createElement("div");

    b.id="badge5";
    b.className="badge";
    b.textContent="🌱 Amigo del océano";

    badges.appendChild(b);

  }

  if(estado.acciones>=10 &&
     !document.getElementById("badge10")){

    const b=document.createElement("div");

    b.id="badge10";
    b.className="badge";
    b.textContent="🪸 Protector de arrecifes";

    badges.appendChild(b);

  }

  if(estado.oceano>=90 &&
     !document.getElementById("badgeOcean")){

    const b=document.createElement("div");

    b.id="badgeOcean";
    b.className="badge";
    b.textContent="🌊 Guardián del Océano";

    badges.appendChild(b);

    hablar(
      "¡Lo conseguimos! 🌎💙 Nuestro océano está mucho más saludable."
    );

  }

}


/* ==============================
   DESGASTE NATURAL
================================ */

setInterval(()=>{

  estado.hambre-=2;
  estado.energia-=1;

  if(estado.hambre<30){

    hablar(
      "Tengo un poquito de hambre... 🍎 ¿Me cuidas?"
    );

  }

  actualizar();

},10000);


/* ==============================
   INICIO
================================ */

actualizar();
