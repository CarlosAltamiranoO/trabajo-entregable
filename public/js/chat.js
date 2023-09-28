const socket = io()
const messagesContainer = document.getElementById('messagesContainer')
const messageInput = document.getElementById('messageInput')
const messageButton = document.getElementById('messageButton')
const notificationContainer = document.getElementById('notificationContainer')

const params = Qs.parse(window.location.search, {
    ignoreQueryPrefix: true
})
socket.emit('joinChat',params.username)

socket.on('notification', notification => {
    notificationContainer.innerHTML = notification
})
messageButton.addEventListener('click', (e) => {
    const message = messageInput.value
    if (message){
        socket.emit('newMessage',message)
    }
})
socket.on('message', messageObj => {
    const message = JSON.parse(messageObj)
    messagesContainer.innerHTML += `
    <div>${message.user}: ${message.message}</div>`
})
socket.on('messages', messagesString => {
    const messages = JSON.parse(messagesString)
    messagesContainer.innerHTML = ''
    messages.forEach(message => {
        messagesContainer.innerHTML += `
    <div>${message.user}: ${message.message}</div>`
    });
})