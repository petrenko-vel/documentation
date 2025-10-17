// server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import menuRouter from './models/sidebar.js';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());

// // Подключаем MongoDB один раз и передаём клиент в роут
// const client = new MongoClient(process.env.MONGO_URL);
// await client.connect();
// app.locals.dbClient = client;

app.use('/api', menuRouter);                                           // API роуты

app.use(express.static(path.join(__dirname, '../dist')));              // Раздаём фронт из папки dist

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


async function start() {
  try {
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    app.locals.dbClient = client;

    app.listen(PORT, () => {
      console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Ошибка при подключении к MongoDB:', err);
  }
}