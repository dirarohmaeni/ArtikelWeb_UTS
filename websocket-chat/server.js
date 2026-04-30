const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
    console.log('Client terhubung');

    ws.onmessage = function(event) {
    try {
        const data = JSON.parse(event.data);

        const div = document.createElement('div');
        div.classList.add("message");

        if (data.user === username) {
            div.classList.add("right");
        } else {
            div.classList.add("left");
        }

        div.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;

        const chat = document.getElementById('chat');
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;

    } catch (e) {
        console.error("Data bukan JSON:", event.data);
    }
};

    ws.on('close', () => {
        console.log('Client terputus');
    });
});

console.log('Server berjalan di ws://localhost:3000');