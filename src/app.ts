import express from 'express';
// import morgan from 'morgan'
import cors from 'cors'
import { connectDB } from './database'
import router from './routes/webpush.routes';
import { processNotification } from './classes/procesamientoNotificaciones';

const app = express();
const server = require('http').createServer(app);

//conexión a la bd
connectDB();

// app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use('/api/webpush', router);


setInterval(processNotification, 5000); 

server.listen(4001, () => {
    console.log('El servidor está escuchando en el puerto 4001');
});

export default app