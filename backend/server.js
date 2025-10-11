import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Пример API
app.get("/api/hello", (req, res) => {
  res.json({ message: "Привет с сервера Express 👋" });
});

// Если фронтенд собран (npm run build), раздаём статику
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => console.log(`🚀 Сервер запущен: http://localhost:${PORT}`));