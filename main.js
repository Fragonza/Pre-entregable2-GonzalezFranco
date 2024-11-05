// Opciones de pizzas
const pizzas = [
    { id: 1, nombre: "Margarita", precio: 500 },
    { id: 2, nombre: "Pepperoni", precio: 600 },
    { id: 3, nombre: "Cuatro Quesos", precio: 700 },
];

// Carrito de compras
let carrito = [];

// Generar tarjetas de pizzas
function mostrarPizzas() {
    const contenedorPizzas = document.getElementById("tarjetas-pizza");
    pizzas.forEach((pizza) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.innerHTML = `
            <h3>${pizza.nombre}</h3>
            <p>Precio: $${pizza.precio}</p>
            <button onclick="agregarAlCarrito(${pizza.id})">Agregar al Carrito</button>
        `;
        contenedorPizzas.appendChild(tarjeta);
    });
}

// Agregar pizza al carrito
function agregarAlCarrito(id) {
    const pizza = pizzas.find((pizza) => pizza.id === id);
    carrito.push(pizza);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Actualizar el carrito de compras
function actualizarCarrito() {
    const itemsCarrito = document.getElementById("items-carrito");
    const precioTotal = document.getElementById("precio-total");
    itemsCarrito.innerHTML = "";

    let total = 0;
    carrito.forEach((pizza, index) => {
        total += pizza.precio;
        const item = document.createElement("div");
        item.innerHTML = `
            <p>${pizza.nombre} - $${pizza.precio} <button onclick="eliminarDelCarrito(${index})">Eliminar</button></p>
        `;
        itemsCarrito.appendChild(item);
    });
    precioTotal.textContent = total.toFixed(2);
}

// Eliminar pizza del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Guardar carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Finalizar compra
document.getElementById("boton-finalizar").addEventListener("click", () => {
    const precioTotal = document.getElementById("precio-total").textContent;
    alert(`El total de tu compra es: $${precioTotal}`);
    carrito = [];
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
});

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    mostrarPizzas();
    cargarCarritoDesdeLocalStorage();
});

