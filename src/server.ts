import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import https from 'https';
import http from 'http';
import siteRoutes from './routes/site';
import adminRoutes from './routes/admin';
import {requestIntercept} from "./utils/requestIntercept";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Intercepta todas as requisições e adiciona um log para facilitar o debug
app.all('*', requestIntercept);

app.use('/admin', adminRoutes);
app.use('/', siteRoutes);

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(`Server listening on port ${port} started at ${new Date().toLocaleString()}`);
    });
};

const devServer = http.createServer(app);

if (process.env.NODE_ENV === 'production') {
    // TODO: Configurar servidor de produção
} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, devServer);
}

