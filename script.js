/* =========================================
   ELEMENTOS
 ========================================= */

const tarjeta = document.getElementById("tarjeta");
const corazon = document.getElementById("corazonContenedor");
const escena2 = document.getElementById("escena2");
const musica = document.getElementById("musica");
const botonMusica = document.getElementById("botonMusica");
const pagina = document.getElementById("pagina");
let audioContext;
let musicaEncendida = false;
const esMovil = window.innerWidth < 600;

function reproducirEfecto() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(560, audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.07, audioContext.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.25);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.25);
}

async function iniciarMusica() {
    if (musicaEncendida) {
        return true;
    }

    try {
        if (audioContext && audioContext.state === "suspended") {
            await audioContext.resume();
        }

        musica.volume = 0.55;
        await musica.play();
        musicaEncendida = true;
        return true;
    } catch (error) {
        console.log("No se pudo reproducir la música:", error);
        return false;
    }
}

function mostrarEscena2() {
    tarjeta.style.opacity = "0";

    escena2.style.display = "block";
    escena2.style.opacity = "0";
    escena2.style.transform = "scale(0.96)";

    iniciarMusica();

    requestAnimationFrame(function () {
        escena2.style.opacity = "1";
        escena2.style.transform = "scale(1)";
        crearFrasesOrbital();
    });

    setTimeout(function () {
        tarjeta.style.display = "none";
        tarjeta.style.transform = "";
    }, 400);
}

function crearFrasesOrbital() {
    const contenedor = document.getElementById("frasesOrbital");
    const heart = document.querySelector(".corazon-central");
    const frases = [
        "Tu amor me hace brillar más que cualquier estrella.",
        "Cada latido me recuerda lo mucho que te quiero.",
        "Contigo, el tiempo se vuelve un sueño eterno.",
        "Eres mi paz, mi alegría y mi hogar.",
        "Tu sonrisa es la luz que siempre ilumina mi día.",
        "Me enamoro de ti en cada instante.",
        "Tu amor es el mejor regalo que he recibido.",
        "Cada momento contigo es una canción de amor.",
        "Eres la razón por la que mi corazón sonríe.",
        "Mi mundo es más bonito desde que te encontré.",
        "Contigo todo se vuelve más dulce y especial.",
        "Tu presencia me hace sentir vivo y completo.",
        "Eres el sueño más hermoso que jamás tuve.",
        "Mi corazón siempre te elige a ti.",
        "No hay distancia que pueda separar mi amor por ti.",
        "Tu amor me guía como una estrella en la noche.",
        "Con solo mirarte, todo se vuelve perfecto.",
        "Te quiero más de lo que las palabras pueden decir.",
        "Eres mi refugio, mi calma y mi felicidad.",
        "Siempre serás mi motivo para sonreír.",
        "Tu amor es mi lugar favorito del universo.",
        "Cada día a tu lado vale más que mil.",
        "Mi corazón late más fuerte cuando pienso en ti.",
        "Eres la poesía viva de mi vida.",
        "Te llevo en cada latido y en cada sueño.",
        "Tu amor me hace sentir seguro y amado.",
        "Con tu cariño, hasta los días grises brillan.",
        "Eres la razón por la que mi alma canta.",
        "Siempre querré estar a tu lado.",
        "Tu amor me hace sentir que todo es posible.",
        "Me encanta la forma en que me haces sentir.",
        "Cada instante contigo es un tesoro.",
        "Tu mirada tiene el poder de enamorarme otra vez.",
        "Eres mi mejor historia y mi mayor alegría.",
        "Mi corazón te pertenece por completo.",
        "Tu amor me transforma en alguien mejor.",
        "Nunca dejaré de agradecerte por existir.",
        "Contigo, hasta la noche se vuelve mágica.",
        "Tu voz es música para mi alma.",
        "Eres el brillo que ilumina mis días.",
        "Mi amor por ti no conoce final.",
        "Cada recuerdo contigo es precioso.",
        "Tu cariño hace que todo sea más hermoso.",
        "Eres el sueño más bonito que no quiero despertar.",
        "Quiero vivir mil vidas a tu lado.",
        "Te amo más de lo que el cielo puede abarcar.",
        "Tu amor es la melodía de mi corazón.",
        "Siempre tendrás un lugar especial en mí.",
        "Eres mi mayor bendición y mi mayor ternura.",
        "Te pienso, te sueño y te llevo en mi pecho.",
        "Cada segundo contigo es puro amor."
    ];

    contenedor.innerHTML = "";
    const sceneRect = escena2.getBoundingClientRect();
    const heartRect = heart.getBoundingClientRect();
    const endX = heartRect.left - sceneRect.left + heartRect.width / 2;
    const endY = heartRect.top - sceneRect.top + heartRect.height / 2;
    const frasesMovil = frases.slice(0, 24);
    const lista = esMovil ? frasesMovil : frases;

    lista.forEach((texto, index) => {
        const frase = document.createElement("div");
        frase.className = "frase-orbital";
        frase.textContent = texto;
        frase.style.setProperty("--delay", `${index * (esMovil ? 0.7 : 1.15)}s`);
        frase.style.setProperty("--dur", `${esMovil ? 16 + Math.random() * 3 : 22 + Math.random() * 4}s`);

        const lado = Math.floor(Math.random() * 4);
        let startX;
        let startY;

        if (lado === 0) {
            startX = -40 + Math.random() * 40;
            startY = Math.random() * sceneRect.height;
        } else if (lado === 1) {
            startX = sceneRect.width + 40 - Math.random() * 40;
            startY = Math.random() * sceneRect.height;
        } else if (lado === 2) {
            startX = Math.random() * sceneRect.width;
            startY = -40 + Math.random() * 40;
        } else {
            startX = Math.random() * sceneRect.width;
            startY = sceneRect.height + 40 - Math.random() * 40;
        }

        const dx = endX - startX;
        const dy = endY - startY;

        frase.style.left = `${startX}px`;
        frase.style.top = `${startY}px`;
        frase.style.setProperty("--dx", `${dx}px`);
        frase.style.setProperty("--dy", `${dy}px`);
        contenedor.appendChild(frase);
    });
}

function crearEstrellas() {
    const contenedor = document.getElementById("estrellas");
    const esMovil = window.innerWidth < 600;
    const cantidad = esMovil ? 50 : 120;

    for (let i = 0; i < cantidad; i++) {
        const estrella = document.createElement("div");
        estrella.className = "estrella";

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const distancia = Math.abs(x - 50) + Math.abs(y - 50);

        estrella.style.left = x + "%";
        estrella.style.top = y + "%";
        estrella.style.animationDelay = Math.random() * 3 + "s";
        estrella.style.animationDuration = (1.8 + Math.random() * 2.5) + "s";

        if (distancia < 35) {
            estrella.style.transform = "scale(1.3)";
            estrella.style.boxShadow = "0 0 6px #fff, 0 0 12px #ff5fa2";
        }

        contenedor.appendChild(estrella);
    }

    for (let i = 0; i < (esMovil ? 3 : 10); i++) {
        const fugaz = document.createElement("div");
        fugaz.className = "estrella estrella-fugaz";
        fugaz.style.left = Math.random() * 100 + "%";
        fugaz.style.top = Math.random() * 100 + "%";
        fugaz.style.animationDelay = Math.random() * 6 + "s";
        fugaz.style.animationDuration = (2 + Math.random() * 2) + "s";
        contenedor.appendChild(fugaz);
    }
}

crearEstrellas();

function ocultarEscena2() {
    escena2.style.opacity = "0";
    escena2.style.transform = "scale(0.96)";

    tarjeta.style.display = "block";
    tarjeta.style.transform = "";

    requestAnimationFrame(function () {
        tarjeta.style.opacity = "1";
    });

    setTimeout(function () {
        escena2.style.display = "none";
    }, 600);
}

/* =========================================
   MOVIMIENTO DEL MOUSE Y TOUCH
   PARALLAX 3D CON SUAVIZADO
 ========================================= */

const mouse = {
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    active: false
};

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function actualizarMovimiento() {
    mouse.currentX = lerp(mouse.currentX, mouse.targetX, 0.08);
    mouse.currentY = lerp(mouse.currentY, mouse.targetY, 0.08);

    const mx = mouse.currentX;
    const my = mouse.currentY;

    if (esMovil) {
        document.documentElement.style.setProperty("--mx", mx * 0.08);
        document.documentElement.style.setProperty("--my", my * 0.08);
    } else {
        document.documentElement.style.setProperty("--mx", mx);
        document.documentElement.style.setProperty("--my", my);
    }

    requestAnimationFrame(actualizarMovimiento);
}

document.addEventListener("mousemove", function (e) {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    mouse.active = true;
});

document.addEventListener(
    "touchmove",
    function (e) {
        if (!e.touches.length) return;
        const touch = e.touches[0];
        mouse.targetX = (touch.clientX / window.innerWidth - 0.5) * 2;
        mouse.targetY = (touch.clientY / window.innerHeight - 0.5) * 2;
        mouse.active = true;
    },
    { passive: true }
);

document.addEventListener("mouseleave", function () {
    mouse.targetX = 0;
    mouse.targetY = 0;
    mouse.active = false;
});

requestAnimationFrame(actualizarMovimiento);

/* =========================================
   PARTÍCULAS
========================================= */

function crearParticula() {
    const esMovil = window.innerWidth < 600;
    if (esMovil && Math.random() > 0.5) return;

    const p = document.createElement("div");
    p.className = "particula";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.setProperty("--movX", (Math.random() * 300 - 150) + "px");
    p.style.setProperty("--movY", (-Math.random() * 300) + "px");
    p.style.animationDuration = (2 + Math.random() * 4) + "s";

    pagina.appendChild(p);

    setTimeout(function () {
        p.remove();
    }, 6000);
}

setInterval(crearParticula, 100);

/* =========================================
   EXPLOSIÓN DE CORAZONES
========================================= */

function explosionCorazones() {
    const centroX = window.innerWidth / 2;
    const centroY = window.innerHeight * 0.45;
    const esMovil = window.innerWidth < 600;
    const cantidad = esMovil ? 40 : 80;

    for (let i = 0; i < cantidad; i++) {
        const h = document.createElement("div");
        h.className = "miniCorazon";
        h.innerHTML = "❤";

        h.style.left = centroX + "px";
        h.style.top = centroY + "px";
        h.style.setProperty("--x", (Math.random() * 700 - 350) + "px");
        h.style.setProperty("--y", (Math.random() * 600 - 300) + "px");
        h.style.fontSize = (10 + Math.random() * 30) + "px";

        document.body.appendChild(h);

        setTimeout(function () {
            h.remove();
        }, 3000);
    }
}

/* =========================================
   CREAR ÁRBOL
========================================= */

function crearArbol() {
    const arbol = document.getElementById("arbol");
    const esMovil = window.innerWidth < 600;
    const cantidad = esMovil ? 140 : 280;

    for (let i = 0; i < cantidad; i++) {
        const h = document.createElement("div");
        h.className = "corazonArbol";
        h.innerHTML = "♥";

        const y = Math.random() * 330 + 40;
        const ancho = 500 * (1 - y / 430) + 50;
        const centro = 300;
        const x = centro + (Math.random() - 0.5) * ancho;

        h.style.left = x + "px";
        h.style.top = y + "px";
        h.style.fontSize = (7 + Math.random() * 17) + "px";
        h.style.animationDelay = Math.random() * 2 + "s";

        arbol.appendChild(h);
    }
}

/* =========================================
   BOTÓN DE MÚSICA
========================================= */

botonMusica.addEventListener("click", async function () {
    reproducirEfecto();
    const ok = await iniciarMusica();

    if (ok) {
        botonMusica.classList.add("activo");
        const icono = esMovil ? '🔊' : '🎵 ON';
        botonMusica.innerHTML = esMovil ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>' : '🎵 ON';
    }
});

/* =========================================
   CLICK / TOQUE AL CORAZÓN
========================================= */

corazon.addEventListener("click", function () {
    reproducirEfecto();
    corazon.classList.add("corazon-activado");

    mouse.targetX = 0;
    mouse.targetY = 0;
    mouse.active = false;

    setTimeout(function () {
        corazon.classList.remove("corazon-activado");
    }, 220);

    explosionCorazones();

    iniciarMusica();

    setTimeout(function () {
        mostrarEscena2();
        crearArbol();
    }, 900);
});

/* =========================================
   BOTÓN VOLVER
========================================= */

document.getElementById("volver").addEventListener("click", function () {
    reproducirEfecto();
    mouse.targetX = 0;
    mouse.targetY = 0;
    mouse.active = false;
    ocultarEscena2();
});

/* =========================================
   CORAZONES SIGUIENDO EL MOUSE
========================================= */

document.addEventListener("mousemove", function (e) {
    if (Math.random() > 0.93) {
        const h = document.createElement("div");
        h.className = "miniCorazon";
        h.innerHTML = "♥";

        h.style.left = e.clientX + "px";
        h.style.top = e.clientY + "px";
        h.style.setProperty("--x", (Math.random() * 100 - 50) + "px");
        h.style.setProperty("--y", (-50 - Math.random() * 100) + "px");
        h.style.fontSize = (8 + Math.random() * 15) + "px";

        document.body.appendChild(h);

        setTimeout(function () {
            h.remove();
        }, 2500);
    }
});
