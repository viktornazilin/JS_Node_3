const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const pathJSON = path.join(__dirname, "countPage.json");

if (!fs.existsSync(pathJSON)) {
   const countPage = [
      {
         page: "/",
         count: 0
      },
      {
         page: "/about",
         count: 0
      },
   ]
   fs.writeFile(pathJSON, JSON.stringify(countPage, null, 2), (error) => {
      if (error) return console.log(error);
   });
}

app.get('/', (req, res) => {
   fs.readFile(pathJSON, "utf-8", (error, data) => {
      if (error) return console.log(error);
      let dataPage = JSON.parse(data, "utf-8");
      dataPage[0].count += 1;
      fs.writeFile(pathJSON, JSON.stringify(dataPage, null, 2), (error) => {
         if (error) return console.log(error);
      });
      res.send(`
         <h1>Главная страница</h1>
         <p>Просмотров ${dataPage[0].count}</p>
         <a href="/about">About</a>
      `);
   });
});

app.get('/about', (req, res) => {
   fs.readFile(pathJSON, "utf-8", (error, data) => {
      if (error) return console.log(error);
      let dataPage = JSON.parse(data, "utf-8");
      dataPage[1].count += 1;
      fs.writeFile(pathJSON, JSON.stringify(dataPage, null, 2), (error) => {
         if (error) return console.log(error);
      });
      res.send(`
         <h1>Страница About</h1>
         <p>Просмотров ${dataPage[1].count}</p>
         <a href="/">Главная страница</a>
      `);
   });
});

app.listen(3000, () => console.log("Сервер запущен"));