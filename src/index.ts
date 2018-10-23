const serverUrl = 'wss://basic-node-express-websocket.herokuapp.com';
let io: WebSocket;
let clientId: number;

interface MsgIFace {
    body?: string,
    id?: number
    likedBy?: any[],
    messageId?: number,
    namesList?: string[]
    status?: string,
    type: string | undefined,
    timestamp?: number
    uid?: number,
    username?: string,
}
const setusername = (): void => {
    let msg: MsgIFace = {
        username: (document.getElementById("name") as HTMLInputElement).value,
        status: "joined at",
        timestamp: Date.now(),
        uid: clientId,
        type: "username"
    }

    io.send(JSON.stringify(msg));
}

const login = (): void => {
    io = new WebSocket(serverUrl);

    io.onopen = (e: Event): void => {
        (document.getElementById("form") as HTMLElement).hidden = false;
        (document.getElementById("login") as HTMLElement).hidden = true;
    }
    io.onmessage = (e: MessageEvent) => {
        const msg = JSON.parse(e.data)
        let html = "";
        const ts = new Date(msg.timestamp).toLocaleTimeString()

        if (msg.type === "id") {
            clientId = msg.id
            setusername();
        } else if (msg.type === "username") {
            html =
                (`<div class="io">
                    <em>${msg.username} ${msg.status} ${ts}</em>
                </div>`);

        } else if (msg.type === "message") {
            html =
                (`<div class="message">
                    <div class="name">
                        ${msg.username}
                    </div>
                    <p>
                        ${msg.body}
                    </p>
                    <span class="ts">
                        ${ts}
                    </span>
                </div>`);
        } else if (msg.type === "usernamesList") {
            const list: string[] = msg.namesList
            let namesList = ""
            list.forEach(n => {
                namesList += `<li class="name">${n}</li>`
            });
            (document.getElementById('usersList') as HTMLElement).innerHTML = namesList
        }

        if (html.length) {
            (document.getElementById('messages') as HTMLElement).insertAdjacentHTML('beforeend', html);

        }
    }

    io.onclose = (e: Event) => {
        console.warn('server disconnected :(');
        (document.getElementById('messages') as HTMLElement).innerHTML = 'server disconnected :('
    }
}

const addMessage = (e: Event): false => {
    const msgData: MsgIFace = {
        body: (document.getElementById('message') as HTMLInputElement).value,
        likedBy: [],
        timestamp: Date.now(),
        type: 'message',
        uid: clientId,
    }

    //must send payload as JSON formatted string
    io.send(JSON.stringify(msgData));

    // empty text input fields
    (document.getElementById('message') as HTMLInputElement).value = '';
    return false
}