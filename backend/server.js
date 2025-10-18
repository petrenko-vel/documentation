import express from 'express'
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import menuRouter from './routes/sidebar.js';

// Создаём сервер и порт 
dotenv.config({ path: './backend/.env' });
const PORT = process.env.PORT || 5000;
const app = express()


// Определение __dirname для ES-модулей: В ES-модулях (import/export) нет __dirname, поэтому так получают путь к файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Разрешаем CORS и парсим JSON
app.use(cors());
app.use(express.json());


// Подключаем роутер из ./routes/sidebar.js
app.use('/api', menuRouter);


// Отдаём dist и fallback на index.html для React Router
app.use(express.static(path.join(__dirname, '../dist')));
app.use((req, res) => {
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

start()







// // server.js
// import express from 'express';
// import { Router } from "express";
// const router = Router();
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import menuRouter from './models/sidebar.js';
// import dotenv from 'dotenv';
// import { MongoClient } from 'mongodb';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// app.use(cors());
// app.use(express.json());

// app.use('/api', menuRouter);                                           // API роуты

// // Раздаём фронт из папки dist
// app.use(express.static(path.join(__dirname, '../dist')));

// // Для всех остальных маршрутов — index.html (SPA)
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

// async function start() {
//   try {
//     const client = new MongoClient(process.env.MONGO_URL);
//     await client.connect();
//     app.locals.dbClient = client;

//     app.listen(PORT, () => {
//       console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error('Ошибка при подключении к MongoDB:', err);
//   }
// }

// router.get("/menu", async (req, res) => {
//   try {
//     const db = req.app.locals.dbClient.db("menu"); // название базы
//     const menu = await db.collection("menu").find().toArray();
//     res.json(menu);
//   } catch (err) {
//     console.error("Ошибка при получении меню:", err);
//     res.status(500).json({ error: "Ошибка при получении меню" });
//   }
// });




// export default router;
// start();