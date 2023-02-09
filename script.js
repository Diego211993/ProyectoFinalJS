

let peliculas = [
    {id: 1, nombre: "Stranger things", precio: 10, stock: 20, imgUrl:"./img/stranger-things.jpg"},
    {id: 2, nombre: "Greys Anatomy", precio: 15, stock: 8, imgUrl:"./img/greys-anatomy.jpg"},
    {id: 3, nombre: "Dragon ball Z", precio: 20, stock: 22, imgUrl:"./img/DBZ.jpg"},
    {id: 4, nombre: "Saw", precio: 30, stock: 23, imgUrl:"./img/saw.jpg"},
    {id: 5, nombre: "Spider-man", precio: 40, stock: 24, imgUrl:"./img/spiderman.jpg"},
    {id: 6, nombre: "Vengadores", precio: 50, stock: 64, imgUrl:"./img/vengadores.jpg"},
    {id: 7, nombre: "Star Wars", precio: 60, stock: 25, imgUrl:"./img/star-wars.jpeg"},
    {id: 8, nombre: "The last of us", precio: 70, stock: 15, imgUrl:"./img/the-las-of-us.jpeg"},
    {id: 9, nombre: "Avatar", precio: 80, stock: 35, imgUrl:"./img/avatar.jpg"}
]


fetch("./peliculas.json")
    .then(response => response.json())
    .then(peliculas => programa(peliculas))

    function programa(peliculas) {
        
let contenedorCarrito = document.getElementById("contenedorCarrito")

let contenedor = document.getElementById("contenedorProductos")
renderizarPeliculas(peliculas)

let carrito = []

if (localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"))
}
renderizarCarrito(carrito)

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", renderizarPeliculasFiltradas)

function renderizarPeliculasFiltradas() {
    let peliculasFiltradas = peliculas.filter(pelicula => pelicula.nombre.toLocaleLowerCase().includes(buscador.value.toLowerCase()))
    renderizarPeliculas(peliculasFiltradas)
}


function renderizarPeliculas(arrayDePeliculas) {
    contenedor.innerHTML=""
    for (const pelicula of arrayDePeliculas) {
        let tarjetaPelicula = document.createElement("div")
        tarjetaPelicula.className = "pelicula"
        tarjetaPelicula.innerHTML = `
        <img src= ${pelicula.imgUrl} > 
        <h3> ${pelicula.nombre}</h3>
        <p>  Precio: ${pelicula.precio}$</p>        
        <button class="boton" id= ${pelicula.id}>+</button>
        `
    
        contenedor.append(tarjetaPelicula)
    }
    let botones = document.getElementsByClassName("boton")
    for (const boton of botones) {
        boton.addEventListener("click", agregarAlCarrito)
    }
}

function agregarAlCarrito(e) {
    let peliculaBuscada = peliculas.find(pelicula  => pelicula.id == e.target.id)
    let posicionDePeliculaBuscada = carrito.findIndex(pelicula => pelicula.id == peliculaBuscada.id)
    if (posicionDePeliculaBuscada != -1) {
        carrito[posicionDePeliculaBuscada].unidades++
        carrito[posicionDePeliculaBuscada].subtotal = carrito[posicionDePeliculaBuscada].unidades * carrito[posicionDePeliculaBuscada].precioUnitario
    } else {
        carrito.push({id: peliculaBuscada.id, nombre: peliculaBuscada.nombre, precioUnitario: peliculaBuscada.precio, unidades: 1, subtotal: peliculaBuscada.precio})
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
    alertPersonalizado("Producto agregado al carrito", "success", 1000)
}

function renderizarCarrito(arrayDePeliculas) {
    contenedorCarrito.innerHTML = ""
    for (const pelicula of arrayDePeliculas) {
        contenedorCarrito.innerHTML += `
        <div class="flex">
        <p> ${pelicula.nombre}</p>
        <p> ${pelicula.unidades}</p>
        <p> ${pelicula.subtotal}</p>
        </div>
        
        `
    }
    let total = carrito.reduce((acc, valorActual) => acc+ valorActual.subtotal, 0)
    contenedorCarrito.innerHTML += `
    <h3>TOTAL $${total}</h3>
    `
}

let botonComprar = document.getElementById("comprar")
botonComprar.addEventListener("click", () => {
    alertPersonalizado("Gracias por su compra", "success", 1000)

    localStorage.removeItem("carrito")
    carrito=[]
    renderizarCarrito(carrito)
})


function alertPersonalizado(texto, icono, tiempo) {
    Swal.fire({
        text: texto,
        icon: icono,
        showConfirmButton: false,
        timer: tiempo
    })
}
}