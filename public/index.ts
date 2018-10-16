const serverUrl = 'ws://localhost';
let io: WebSocket = new WebSocket(serverUrl);

io.onopen = (e: Event): void => {
    io.send(JSON.stringify({greeting: 'ahoy!'}))
    console.log('socket connected')
}
