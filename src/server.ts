import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import https from 'https';
import http from 'http';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
};

const devServer = http.createServer(app);

if (process.env.NODE_ENV === 'production') {
    // TODO: Configurar servidor de produção
} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, devServer);
}

