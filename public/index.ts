const serverUrl = 'ws://localhost';
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

        if (msg.type === "id") {
            clientId = msg.id
            setusername();
        } else if (msg.type === "username") {
            let html = "";
            const ts = new Date(msg.timestamp).toLocaleTimeString()
            html =
                (`<div class="io">
                    <em>${msg.username} ${msg.status} ${ts}</em>
                </div>`);
            (document.getElementById('messages') as HTMLElement).insertAdjacentHTML('beforeend', html);

        }
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