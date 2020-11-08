const chatForm = document.getElementById('chat-form');

//Get Username and room from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io();

//Join Chat Room
socket.emit('joinRoom', {username, room});

//Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //Scroll Down
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Message Submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;
    e.target.elements.msg.value = '';

    //Emit message to server
    socket.emit('chatMessage', msg);
})

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}