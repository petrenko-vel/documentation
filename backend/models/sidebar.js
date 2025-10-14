import express from 'express';
import { MongoClient } from 'mongodb';

const router = express.Router();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function getMenuItems() {
  try {
    await client.connect();
    const db = client.db('menu'); // Замените на имя вашей базы
    const collection = db.collection('menuItems');
    const menuItems = await collection.find({}).toArray();
    return menuItems;
  } finally {
    await client.close();
  }
}

router.get('/menu', async (req, res) => {
  try {
    const menuItems = await getMenuItems();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера при получении меню' });
  }
});

export default router;