fetch("../javascript/info.json")
    .then(respuesta => respuesta.json())
    .then(items => principal(items))


function principal(items) {
    renderCardsItem(items, carrito)
    renderCardsItem(items)

    let buscarHtml = document.getElementById("buscarItem")
    console.log(buscarHtml)

    let btnBuscarHtml = document.getElementById("btnBuscar")
    btnBuscarHtml.addEventListener("click", () => filtRender(items))

}



function filtRender(items) {
    let itemsFiltrados = items.filter(item => item.nombre.toUpperCase().includes(buscarItem.value.toUpperCase()))
    renderCardsItem(itemsFiltrados)
    console.log(itemsFiltrados)
}

const formatoNumero = (number) => new Intl.NumberFormat("ch-CL").format(number)

function renderCardsItem(items, carrito) {
    carrito = []
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



function addItemC(items, carrito, e, sumPrecios) {
    let itemBuscado = items.find(item => item.id === Number(e.target.id))
    let itemAgregado = carrito.find(item => item.id === itemBuscado.id)

    if (itemBuscado.stock > 0) {
        if (itemAgregado) {
            itemAgregado.unidades++
            itemAgregado.subTotal = itemAgregado.unidades * itemAgregado.precioUnitario
            totalCarrito = sumPrecios
        } else {
            carrito.push({
                id: itemBuscado.id,
                nombre: itemBuscado.nombre,
                precioUnitario: itemBuscado.precio,
                unidades: 1,
                subTotal: itemBuscado.precio,
            })
        }
        itemBuscado.stock--
        /* localStorage.setItem("carrito", JSON.stringify(carrito)) */
        guardarCarrito(carrito)

    } else {
        ventanaAlerta('top-end', 'info', itemBuscado.nombre, 'No hay más stock disponible!', 'true', 'false', 'false', "300px", "250px")
    }
    total(carrito)
    renderCarrito(carrito)
}

function renderCarrito(itemAgregado) {
    let carritoHtml = document.getElementById("carrito")
    carritoHtml.innerHTML = ""
    carritoHtml.className = "ultimo_carrito carritoTienda container"

    if (carritoHtml) {

        let encabItemCarrito = document.createElement("div")
        encabItemCarrito.innerHTML = `
        <div class="titulosCarrito row">
        
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
            <div class="col-3"><p class="text-center col">$.${formatoNumero(item.precioUnitario)}</p></div>
            <div class="col-3"><p class="text-center col">${item.unidades}</p></div>
            <div class="col-3"><p class="text-center col">$.${formatoNumero(item.subTotal)}</p></div>
            </div>
            `

            carritoHtml.appendChild(listItemCarrito)

        }

        let tituloTotal = document.createElement("div")
        tituloTotal.innerHTML = `
        <div class="titulosCarrito row">
        <div class="col-3"><p>Total</p></div>
        <div class="col-3"><p class="text-center col">$.${formatoNumero(totalCarrito)}</p></div>
        </div>
        `
        console.log(totalCarrito)
        carritoHtml.appendChild(tituloTotal)

        let btnFinCompra = document.createElement("button")
        btnFinCompra.innerHTML = `
        <div class="row">
            <button type="submit" class="btn">Finalizar Compra</button>
        </div>
        `
        btnFinCompra.addEventListener("click", (carrito) => finCompra(carrito))
        carritoHtml.appendChild(btnFinCompra)
    }

}


function finCompra(carrito) {
    carrito = document.getElementById("carrito")
    carrito.innerHTML = ""
    carrito.className = ""
    carrito = "";
    localStorage.removeItem("carrito")
    let SCarrito = sessionStorage.key(carrito)
    sessionStorage.clear("SCarrito")

    ventanaAlerta('center', 'success', 'Compra realizada con éxito', 'Gracias por su Compra.!', 'true', 'true', 'Seguir Comprando', '350px', '300px')

}


function ventanaAlerta(position, icon, title, text, showConfirmButton, showDenyButton, denyButtonText, width, height) {
    Swal.fire({
        position,
        icon,
        title,
        text,
        showConfirmButton,
        showDenyButton,
        denyButtonText,
        width,
        height,
    }).then((result, Carrito) => {
        if (result.isConfirmed) {
            limpiarCarrito()
        }
    })

}

function total(carrito) {
    totalCarrito = 0
    sumPrecios = 0
    for (let i = 0; i < carrito.length; i++) {
        console.log(carrito[i].nombre, carrito[i].subTotal)
        sumPrecios = sumPrecios + Number(carrito[i].subTotal);

    }
    totalCarrito = sumPrecios

}


function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

/* 
function recuperaCarrito() {
    /* carrito = localStorage.key("carrito")
    let carritoRecuperado = localStorage.getItem("carrito")
    let carritoObjetoRecuperado = JSON.parse(carritoRecuperado)
    console.log(carritoRecuperado)
    console.log(carritoObjetoRecuperado)

    renderCarrito(carritoObjetoRecuperado)
}
 */

function limpiarCarrito(carrito) {
    localStorage.removeItem(carrito)
    sessionStorage.clear(carrito)
}


