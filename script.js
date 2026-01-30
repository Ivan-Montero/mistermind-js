//Generar el número para adivinar.
let numeroAzar = Math.random()*9999;
numeroAzar = Math.floor(numeroAzar) + 1;

// Convertir a string con 4 dígitos (rellenando con ceros a la izquierda si es necesario)
let numeroAzarStr = numeroAzar.toString().padStart(4, '0');
// Extraer cada dígito
let digitoAzar1 = numeroAzarStr[0];
let digitoAzar2 = numeroAzarStr[1];
let digitoAzar3 = numeroAzarStr[2];
let digitoAzar4 = numeroAzarStr[3];

console.log(numeroAzar);
console.log("digitos Azar : " , digitoAzar1, digitoAzar2, digitoAzar3, digitoAzar4 )

//Contador para el número de intentos
let numIntentos = 0;

//Variables de entrada
let digitoEntrada1 = 0;
let digitoEntrada2 = 0;
let digitoEntrada3 = 0;
let digitoEntrada4 = 0; 
let numeroEntrada = Number(digitoEntrada1 + digitoEntrada2 + digitoEntrada3 + digitoEntrada4);

//Elementos del tablero con los que interactuar
let pantalla = document.getElementById("pantalla");
let feedback = document.getElementById("feedback");
const boton = document.getElementById("probar");

function comprueba(){

    digitoEntrada1 = document.getElementById(`digito1${numIntentos}`).value || 0; 
    digitoEntrada2 = document.getElementById(`digito2${numIntentos}`).value || 0;
    digitoEntrada3 = document.getElementById(`digito3${numIntentos}`).value || 0;
    digitoEntrada4 = document.getElementById(`digito4${numIntentos}`).value || 0;
    console.log(`digito1{numIntentos} : digito1${numIntentos}`)
    console.log(`digito2{numIntentos} : digito2${numIntentos}`)
    console.log(`digito3{numIntentos} : digito3${numIntentos}`)
    console.log(`digito4{numIntentos} : digito4${numIntentos}`)
    numeroEntrada = Number(digitoEntrada1 + digitoEntrada2 + digitoEntrada3 + digitoEntrada4);

    console.log("digitos Entrada : " , digitoEntrada1, digitoEntrada2, digitoEntrada3, digitoEntrada4 )
    console.log("numeroEntrada : ", numeroEntrada);


    pantalla.textContent = `Jugando... Intento nº ${numIntentos+1}`;
    if (digitoEntrada1 > 9 || digitoEntrada2 > 9 || digitoEntrada3 > 9 || digitoEntrada4 > 9) {
        pantalla.textContent = "Todos los dígitos deben estar entre 0 y 9";
        return;
    }

    // Validar que todos los dígitos sean mayores o iguales a 0
    if (digitoEntrada1 < 0 || digitoEntrada2 < 0 || digitoEntrada3 < 0 || digitoEntrada4 < 0) {
        pantalla.textContent = "Todos los dígitos deben estar entre 0 y 9";
        return;
    }



    if (numeroEntrada === numeroAzar) {
        pantalla.textContent = `¡Has acertado en ${numIntentos+1}! El número era: ${numeroAzarStr}`;

            // Crear elemento de imagen
            const imagenVictoria = document.createElement('img');
            imagenVictoria.src = './sources/anabel-wins.jpeg'; // Cambia por la ruta de tu imagen
            imagenVictoria.alt = '¡Victoria!';
            imagenVictoria.className = 'imagen-victoria';
            
            // Insertar la imagen en el tablero
            // const tablero = document.querySelector('.tablero');
            // tablero.insertBefore(imagenVictoria, pantalla.nextSibling);
            // boton.style.display = 'none';

            boton.disabled = true;
                    
    } else {
         // Calcular feedback
        const feedbackTexto = calcularFeedback(
            digitoEntrada1, digitoEntrada2, digitoEntrada3, digitoEntrada4
        );
        console.log(`feedbackTexto = ${feedbackTexto}`);
        // Actualizar feedback del intento actual
        const feedbackActual = document.getElementById(`feedback${numIntentos}`);
        if (feedbackActual) {
            feedbackActual.textContent = feedbackTexto;
        }
        numIntentos++;
        console.log("numIntentos", numIntentos)
        generaNuevoIntento();
    }

}

function calcularFeedback(d1, d2, d3, d4) {
    const digitosEntrada = [d1, d2, d3, d4];
    let feedback = "";
    console.log("calculando feedback");
    
    // Contar ocurrencias de cada dígito en digitosEntrada
    const contadorEntrada = {};
    digitosEntrada.forEach(digito => {
        contadorEntrada[digito] = (contadorEntrada[digito] || 0) + 1;
    });
    
    for (let i = 0; i < 4; i++) {
        
        if (digitosEntrada[i] === numeroAzarStr[i]) {
            // Posición y dígito correctos
            feedback += "O";
        } else if (numeroAzarStr.includes(digitosEntrada[i])) {
            // Dígito correcto pero posición incorrecta
            feedback += "A";
        } else {
            // Dígito incorrecto
            feedback += "X";
        }
        
        if (i < 3) feedback += "-";
    }
    
    return feedback;
}

function generaNuevoIntento(){
    // Selecciona el contenedor donde se añadirá el nuevo div
    const tablero = document.querySelector('.tablero');

    // Crea un nuevo div con la clase "intento"
    const nuevoIntento = document.createElement('div');
    nuevoIntento.className = `intento${numIntentos}`;
    nuevoIntento.id = "essey"

    // Añade contenido al nuevo div
    nuevoIntento.innerHTML = `
        <input type="number" id="digito1${numIntentos}" min="0" max="9">
        <input type="number" id="digito2${numIntentos}" min="0" max="9">
        <input type="number" id="digito3${numIntentos}" min="0" max="9">
        <input type="number" id="digito4${numIntentos}" min="0" max="9">
        <p id="feedback${numIntentos}"></p>
    `;

    if (numIntentos > 9){
        console.log("HAY DEMASIADOS INTENTOS")
        console.log(numIntentos)

        let aux = numIntentos-10;
        const antiguoIntentoCollection = document.getElementsByClassName(`intento${aux}`);
        const antiguoIntento = antiguoIntentoCollection[0];
        
        if (antiguoIntento) {
            antiguoIntento.remove();
        }
    }

    // Agrega el nuevo div al contenedor
    tablero.insertBefore(nuevoIntento, boton);
    
    // IMPORTANTE: Añadir event listeners a los nuevos inputs
    const inputs = [
        document.getElementById(`digito1${numIntentos}`),
        document.getElementById(`digito2${numIntentos}`),
        document.getElementById(`digito3${numIntentos}`),
        document.getElementById(`digito4${numIntentos}`)
    ];

    inputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            // Limitar a un solo dígito
            if (this.value.length > 1) {
                this.value = this.value.slice(0, 1);
            }
            
            // Validar que sea un número entre 0 y 9
            if (this.value < 0 || this.value > 9 || isNaN(this.value)) {
                this.value = '';
                return;
            }
            
            // Si hay un valor y no es el último input, saltar al siguiente
            if (this.value.length === 1 && index < 3) {
                inputs[index + 1].focus();
            }
        });

        // Permitir borrar con backspace y volver al anterior
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
            
            // Ejecutar comprueba() al pulsar Enter
            if (e.key === 'Enter') {
                e.preventDefault();
                comprueba();
                boton.blur();
            }
        });
    });
    
    // Enfocar el primer input del nuevo intento
    inputs[0].focus();
}

// Reemplaza todo el código relacionado con el botón por esto:

let touchHandled = false;

boton.addEventListener('touchstart', function() {
    touchHandled = true;
}, { passive: true });

boton.addEventListener('click', function(e) {
    if (touchHandled) {
        e.preventDefault();
        touchHandled = false;
    }
    
    // Ejecutar la lógica del botón
    comprueba();
    
    // Quitar el foco inmediatamente
    requestAnimationFrame(() => {
        this.blur();
    });
});

// Toggle para mostrar/ocultar instrucciones
const btnInstrucciones = document.getElementById('toggleInstrucciones');
const divInstrucciones = document.getElementById('instrucciones');
const btnCerrar = document.getElementById("toggleCerrar");

btnInstrucciones.addEventListener('click', function() {
    // Alternar la clase 'oculto'
    divInstrucciones.classList.toggle('oculto');
    
    this.classList.toggle('oculto');
    // // Opcional: cambiar el texto del botón
    // if (divInstrucciones.classList.contains('oculto')) {
    //     this.textContent = 'Instrucciones';
    // } else {
    //     this.textContent = '❌ Cerrar';
    // }
});

btnCerrar.addEventListener('click', function() {
    // Alternar la clase 'oculto'
    divInstrucciones.classList.toggle('oculto');
    
    btnInstrucciones.classList.toggle('oculto');

});

// Al final de tu script.js, después de todas las funciones

// Configurar event listeners para el primer intento (intento0)
window.addEventListener('DOMContentLoaded', function() {
    const inputsInicial = [
        document.getElementById(`digito1${numIntentos}`),
        document.getElementById(`digito2${numIntentos}`),
        document.getElementById(`digito3${numIntentos}`),
        document.getElementById(`digito4${numIntentos}`)
    ];

    inputsInicial.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            // Limitar a un solo dígito
            if (this.value.length > 1) {
                this.value = this.value.slice(0, 1);
            }
            
            // Validar que sea un número entre 0 y 9
            if (this.value < 0 || this.value > 9 || isNaN(this.value)) {
                this.value = '';
                return;
            }
            
            // Si hay un valor y no es el último input, saltar al siguiente
            if (this.value.length === 1 && index < 3) {
                inputsInicial[index + 1].focus();
            }
        });

        // Permitir borrar con backspace y volver al anterior
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                inputsInicial[index - 1].focus();
            }
        });
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevenir comportamiento por defecto
        comprueba(); // Ejecutar la función del botón
        boton.blur(); // Quitar el foco del botón
    }
});