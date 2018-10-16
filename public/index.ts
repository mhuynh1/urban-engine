const serverUrl = 'ws://localhost';
let io: WebSocket = new WebSocket(serverUrl);

io.onopen = (e: Event): void => {
    io.send(JSON.stringify({ greeting: 'ahoy!' }))
    console.log('socket connected')
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