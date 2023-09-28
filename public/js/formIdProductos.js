const formAgregarCarrito = document.querySelector('#formAgregarCarrito')

if (formAgregarCarrito instanceof HTMLElement) {

    
    formAgregarCarrito.addEventListener('submit', async event => {
        event.preventDefault()
        const idCarrito = document.getElementById("input_carrito").value;
        const idProducto = document.getElementById("input_idProducto").value;
        const res = await fetch(`/api/cart/${idCarrito}/product/${idProducto}/`, { method: 'post' })
        const respuesta = await res.json()
        document.getElementById('resVCarrito').innerHTML = `${respuesta}`
    })
}