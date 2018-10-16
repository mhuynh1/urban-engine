import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
let uniqueId = Date.now();
const app = express();
app.use(express.static('dist/public')) // generated js files
app.use(express.static('public')) // has index.html

// creates an http server
const server = http.createServer(app);

// create WebSocket server instance
const io = new WebSocket.Server({ server })
interface SocketIFace extends WebSocket {
    [key: string]: any
}

io.on('connection', (socket: SocketIFace) => {
    console.log('new connection opened')
    socket.send(`${JSON.stringify({ type: "id", id: uniqueId })}`);
    uniqueId++; // will be assigned to next connection

    socket.on("message", (m: string) => {
        const msg = JSON.parse(m)
        console.log('msg from client:', msg)

        if (msg.type === "username") {
            socket.username = msg.username

            //get list of usernames to send back to client to render
            const usernamesList: string[] = [];

            io.clients.forEach((client: SocketIFace) => {
                usernamesList.push(client.username)
            })

            io.clients.forEach(client => {
                client.send(`${JSON.stringify({ type: "usernamesList", namesList: usernamesList })}`)
            })

        } else if (msg.type === "message") {
            msg.username = socket.username
        }

        io.clients.forEach(client => {
            client.send(`${JSON.stringify(msg)}`)
        })
    })
})

const PORT: number = 80
server.listen(PORT, () => console.log(`server running on PORT:${PORT}`));