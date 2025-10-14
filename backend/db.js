// import { MongoClient } from "mongodb";
// const uri = process.env.MONGODB_URI;

// // Асинхронная функция для подключения
// async function connectDB() {
//   // Создаём клиент MongoDB (опции можно не указывать)
//   const client = new MongoClient(uri);

//   try {
//     // Подключаемся к серверу
//     await client.connect();

//     console.log("Подключено к MongoDB:", client.options.srvHost);
//   } catch (error) {
//     console.error("Ошибка подключения:", error);
//   } finally {
//     await client.close();
//   }
// }


// connectDB();
