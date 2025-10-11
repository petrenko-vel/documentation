import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// ES-модули: создаём __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Отдаём фронтенд сборку
app.use(express.static(path.join(__dirname, "../dist")));

// Поддержка React Router
app.all(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
