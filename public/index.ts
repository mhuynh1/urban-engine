const serverUrl = 'ws://localhost';
let io: WebSocket;


const login = (): void => {
    io = new WebSocket(serverUrl);

    io.onopen = (e: Event): void => {
        io.send(JSON.stringify({ username: (document.getElementById("name") as HTMLInputElement).value }))
        console.log('socket connected');
        (document.getElementById("form") as HTMLElement).hidden = false;
        (document.getElementById("login") as HTMLElement).hidden = true;
    }
}

const addMessage = (e: Event): false => {
    const msgData = {
        username: (document.getElementById('name') as HTMLInputElement).value,
        body: (document.getElementById('message') as HTMLInputElement).value,
        likedBy: [],
        timestamp: Date.now(),
    }

    //must send payload as JSON formatted string
    io.send(JSON.stringify(msgData));

    // empty text input fields
    (document.getElementById('message') as HTMLInputElement).value = '';
    return false
}