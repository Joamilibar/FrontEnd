
let items = [
    { id: 1, nombre: "Featherbed Duvet", descripcion: "Mezcla de duvet y pluma de cuerpo para oponer resistencia el peso del cuerpo.", imagen: "featherbed.png", stock: 5, precio: 600000 },
    { id: 2, nombre: "Almohada Duvet", descripcion: "Permite un soporte ideal sin perder suavidad.", imagen: "almohadas.png", stock: 30, precio: 180000 },
    { id: 3, nombre: "Bata Luxury", descripcion: "Una bata ideal para un momento de relax.", imagen: "bata_luxury.png", stock: 25, precio: 60000 },
    { id: 4, nombre: "Juego Sábanas Crucero", descripcion: "100% Algodón de fibra extra larga de 500 hilos.", imagen: "sabana_crucero.png", stock: 10, precio: 220000 },
    { id: 5, nombre: "Juego Piecera Lino", descripcion: "Funda Piecera 120*220 + 2 Fundas de Cojín 50*70.", imagen: "piecera_lino.png", stock: 12, precio: 199000 },
    { id: 6, nombre: "Plumón Classic", descripcion: "100% Algodón 420 Hilos Downproof. 100% Duvet Ganso 750 FP.", imagen: "plumon_classic.png", stock: 10, precio: 780000 },
    { id: 7, nombre: "Plumón Premium", descripcion: "100% Algodón Premium Ultra light Downproof. 100% Duvet Ganso 850 FP.", imagen: "plumon_premium.png", stock: 17, precio: 1100000 },
    { id: 8, nombre: "Juego Sábana Doble Alforza", descripcion: "Juego Sábana Doble Alforza", imagen: "sabana_doblealforza.png", stock: 12, precio: 220000 },

]



let carrito = []

renderCardsItem(items, carrito)


let buscarHtml = document.getElementById("buscarItem")
console.log(buscarHtml)

let btnBuscarHtml = document.getElementById("btnBuscar")
btnBuscarHtml.addEventListener("click", () => filtRender(items))

function filtRender(items) {


    let itemsFiltrados = items.filter(item => item.nombre.toUpperCase().includes(buscarItem.value.toUpperCase()))
    renderCardsItem(itemsFiltrados)
    console.log(itemsFiltrados)
}

function renderCardsItem(items, carrito) {
    let prod_tienda = document.getElementById("CProductos")
    CProductos.className = "tienda_prod container"
    prod_tienda.innerHTML = ""

    items.forEach(item => {
        let tarjeta = document.createElement("div")
        tarjeta.className = "t_cards card"

        tarjeta.innerHTML = `
    <div><img class=card-img-top src="../assets/img/${item.imagen}"></img></div>
    <h4 class="text-center">${item.nombre}</h4>
    <p>${item.descripcion}</p>
    <p>$.${item.precio}</p>
    <div class="boton_tcompra">
        <button id=${item.id} type="submit" class="btn btn-primary">Agregar</button>
    </div>
    `

        prod_tienda.appendChild(tarjeta)

        let btnAdd = document.getElementById(item.id)
        btnAdd.addEventListener("click", (e) => addItemC(items, carrito, e))
    })
}



function addItemC(items, carrito, e) {
    let itemBuscado = items.find(item => item.id === Number(e.target.id))
    let itemAgregado = carrito.find(item => item.id === itemBuscado.id)

    if (itemBuscado.stock > 0) {
        if (itemAgregado) {
            itemAgregado.unidades++
            itemAgregado.subtotal = itemAgregado.unidades * itemAgregado.precioUnitario

            } else {
            carrito.push({
                id: itemBuscado.id,
                nombre: itemBuscado.nombre,
                precioUnitario: itemBuscado.precio,
                unidades: 1,
                subtotal: itemBuscado.precio,
            })
        }
        itemBuscado.stock--

        // alert("Se agregó item al carrito")
    } else {
        alert("No hay más stock del item seleccionado")
    }
    renderCarrito(carrito)
    guardarCarrito(carrito)

}



function renderCarrito(itemAgregado) {
    let carritoHtml = document.getElementById("carrito")
    carritoHtml.innerHTML = ""
    carritoHtml.className = "ultimo_carrito container"
    let encabItemCarrito = document.createElement("div")
    encabItemCarrito.innerHTML = `
        <div class="row">
    
        <div class="col-3"><span>Producto</span></div>
        <div class="col-3"><span>Precio/Unit</span></div>
        <div class="col-3"><span>Cantidad</span></div>
        <div class="col-3"><span>Sub-Total</span></div>
        </div>
        `
        carritoHtml.appendChild(encabItemCarrito)
        
    for (const item of itemAgregado) {
        let listItemCarrito = document.createElement("div")
        listItemCarrito.innerHTML = `
        <div class="row">        
        
        <div class="col-3"><p class="text-center col">${item.nombre}</p></div>
        <div class="col-3"><p class="text-center col">$.${item.precioUnitario}</p></div>
        <div class="col-3"><p class="text-center col">${item.unidades}</p></div>
        <div class="col-3"><p class="text-center col">$.${item.subtotal}</p></div>
        </div>
        `
        
        carritoHtml.appendChild(listItemCarrito)
    }
}


function guardarCarrito(carrito) {
    let carritoJSON = JSON.stringify(carrito)
    localStorage.setItem("ultimoCarrito", carritoJSON)
}

function recuperaCarrito(ultimoCarrito) {
    /* ultimoCarrito = localStorage.key("ultimoCarrito") */
    let carritoRecuperado = localStorage.getItem("ultimoCarrito")
    let carritoObjetoRecuperado = JSON.parse(carritoRecuperado)
    console.log(carritoRecuperado)
    console.log(carritoObjetoRecuperado)

    renderCarrito(carritoObjetoRecuperado)
}


function limpiarCarrito() {
    localStorage.removeItem("ultimoCarrito")
}
