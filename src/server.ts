import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
app.use(express.static('dist/public')) // generated js files
app.use(express.static('public')) // has index.html

// creates an http server
const server = http.createServer(app);

// create WebSocket server instance
const io = new WebSocket.Server({ server })


io.on('connection', (socket: WebSocket) => {
    socket.on("message", (m: string) => {
        const msg = JSON.parse(m)
        console.log('msg from client:', msg)
    })
})

const PORT: number = 80
server.listen(PORT, () => console.log(`server running on PORT:${PORT}`));