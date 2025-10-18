

export async function getMenu(req, res) {
  try {
    const db = req.app.locals.dbClient.db("menu");
    const menu = await db.collection("menu").find().toArray();
    res.json(menu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении меню' });
  }
}

































// import express from 'express';
// const router = express.Router();

// router.get('/menu', async (req, res) => {
//   try {
//     const db = req.app.locals.dbClient.db('menu');
//     const collection = db.collection('menu');
//     const menuItems = await collection.find({}).toArray();
//     res.json(menuItems);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Ошибка сервера при получении меню' });
//   }
// });

// export default router;
