import * as express from 'express';
import * as http from 'http';

const app = express();


// creates an http server
const server = http.createServer(app);

const PORT: number = 80
server.listen(PORT, () => console.log(`server running on PORT:${PORT}`));