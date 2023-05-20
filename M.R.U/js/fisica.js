const distancia = document.querySelector("#d");
const velocidad = document.querySelector("#v");
const tiempo = document.querySelector("#t");

const selectD = document.querySelector("#distancia");
const selectV = document.querySelector("#velocidad");
const selectT = document.querySelector("#tiempo");
let selected;

const r = document.querySelector(".resultado");
const b = document.querySelector(".borrar");

const datos = {
    d: "",
    v: "",
    t: ""
}


distancia.addEventListener("input", cargar);
velocidad.addEventListener("input", cargar);
tiempo.addEventListener("input", cargar);

function cargar(e){
    datos[e.target.id] = e.target.value;
}


b.addEventListener("click", function(){
    distancia.value = "";
    velocidad.value = "";
    tiempo.value = "";
    datos.d = "";
    datos.v = "";
    datos.t = "";
});

r.addEventListener("click", resultado);

function resultado(){
    const {d, v, t} = datos;

    if(d === "" && v === "" && t === ""){
        distancia.value = "";
        velocidad.value = "";
        tiempo.value = "";
    } else{
        if(d === "") resultD(v, t);

        if(v === "") resultV(d, t);

        if(t === "") resultT(d, v);
    }
}


function resultD(v, t){
    selected = selectD.options[selectD.selectedIndex].text;
    let result = "";
    let valor1 = "";
    let valor2 = "";
    let unidad = selected;

    // Transformaciones
    valor1 = transformarV(v);
    valor2 = transformarT(t);

    // Resultado
    result = resultado2(valor1, valor2, "d", unidad);
    distancia.value = result;
}

function resultV(d, t){
    selected = selectV.options[selectV.selectedIndex].text;
    let result = "";
    let valor1 = "";    
    let valor2 = "";
    let unidad = selected;

    // Transformaciones
    valor1 = transformarD(d);
    valor2 = transformarT(t);

    // Resultado
    result = resultado2(valor1, valor2, "v", unidad);
    velocidad.value = result;
}

function resultT(d, v){
    selected = selectT.options[selectT.selectedIndex].text;
    let result = "";
    let valor1 = "";
    let valor2 = "";
    let unidad = selected;

    // Transformaciones
    valor1 = transformarD(d);
    valor2 = transformarV(v);

    // Resultado
    result = resultado2(valor1, valor2, "t", unidad);
    tiempo.value = result;
    
}


// Calcula el resultado
function resultado2(num1, num2, diferenciador, unidad){
    let result = 0;
    valor1 = parseFloat(num1);
    valor2 = parseFloat(num2);

    if(diferenciador === "d"){
        result = valor1 * valor2;
        if(unidad === "km") result /= 1000;
    }

    if(diferenciador === "v"){
        result = valor1 / valor2;
        if(unidad === "km/h"){
            result *= 0.001;
            result *= 3600;
        }
    }

    if(diferenciador === "t"){
        result = valor1 / valor2;
        if(unidad === "min") result /= 60;
        if(unidad === "h") result /= 3600;
    }

    result = result.toString();
    if(result.includes(".")) result = decimal(result);

    return result;
}


// Transformaciones

// Transforma la distancia
function transformarD(d){
    selected = selectD.options[selectD.selectedIndex].text;

    let valor = d;

    valor = parseFloat(valor);

    if(selected === "km") valor *= 1000;

    valor = valor.toString();
    if(valor.includes(".")) valor = decimal(valor);
    
    return valor;
}

// Transforma la velocidad
function transformarV(v){
    selected = selectV.options[selectV.selectedIndex].text;

    let valor = v;

    valor = parseFloat(valor);

    if(selected === "km/h"){
        valor *= 1000;
        valor /= 3600;
    }

    valor = valor.toString();
    if(valor.includes(".")) valor = decimal(valor);
    
    return valor;
}

// Transforma el tiempo
function transformarT(t){
    selected = selectT.options[selectT.selectedIndex].text;

    let valor = t;

    valor = parseFloat(valor);

    if(selected === "h") valor *= 3600;
    if(selected === "min") valor *= 60;

    valor = valor.toString();
    if(valor.includes(".")) valor = decimal(valor);

    return valor;
}

// Saca el número con solo 2 decimales
function decimal(numero){
    let indice = numero.indexOf(".");
    let resultado = "";

    if(numero[indice + 2] === undefined){
        for(let i = 0; i <= indice + 1; i++){
            resultado += numero[i];
        }
    } else{
        for(let i = 0; i <= indice + 2; i++){
            resultado += numero[i];
        }
    }

    return resultado;
}