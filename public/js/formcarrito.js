const formCrearCarrito = document.querySelector('#formCrearCarrito')
const formCargarCarrito = document.querySelector('#formCargarCarrito')
const formVaciarCarrito = document.querySelector('#formVaciarCarrito')
const formGoCarrito = document.querySelector('#formGoCarrito')




if (formCrearCarrito instanceof HTMLElement) {
    formCrearCarrito.addEventListener('submit', async event => {
        event.preventDefault()
        const res = await fetch('/api/cart', { method: 'post' })
        const user = await res.json()
        document.getElementById('resCarrito').innerHTML = `se creo el carrito id: ${user}`
    })
}

if (formCargarCarrito instanceof HTMLElement) {
    formCargarCarrito.addEventListener('submit', async event => {
        event.preventDefault()
        const datos = new FormData(formCargarCarrito)
        const cid = datos.get('idCargarCarrito')//document.getElementById("input_idCargarCarrito").value
        const pid = datos.get('idCargarProducto')//document.getElementById("input_idCargarProducto").value
        const res = await fetch(`/api/cart/${cid}/product/${pid}`, { method: 'post' })
        const respuesta = await res.json()
        document.getElementById('resBCarrito').innerHTML = `${respuesta}`
    })
}
if (formVaciarCarrito instanceof HTMLElement) {
    formVaciarCarrito.addEventListener('submit', async event => {
        event.preventDefault()
        const data = document.getElementById("input_idVaciarCarrito").value;
        const res = await fetch(`/api/cart/${data}`, { method: 'delete' })
        const respuesta = await res.json()
        document.getElementById('resVCarrito').innerHTML = `${respuesta}`
    })
}
if (formGoCarrito instanceof HTMLElement) {
    formGoCarrito.addEventListener('submit', event => {
        event.preventDefault();
        const data = document.getElementById("input_idVGoCarrito").value;
        const apiLink = `/api/cart/${data}`;
        window.open(apiLink, '_blank');
    });
}