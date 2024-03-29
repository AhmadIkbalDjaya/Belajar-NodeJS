const express = require('express');
const { rmSync } = require('fs');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  // res.send('Hello World!');
  // res.json({
  //   nama: 'Ikbal',
  //   noHP: '081241250245'
  // });
  res.sendFile('./index.html', {root: __dirname});
});

app.get('/about', (req, res) => {
  // res.send('Ini halaman about!')
  res.sendFile('./about.html', {root: __dirname});
});

app.get('/contact', (req, res) => {
  // res.send('Ini halaman contact!');
  res.sendFile('./contact.html', {root: __dirname});
});

app.get('/product/:id', (req, res) => {
  res.send(`Produk ID: ${req.params.id} <br> Category: ${req.query.category}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404 Page Not Found</h1>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




// const http = require('http');
// const fs = require('fs');
// const port = 3000;

// const renderHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write('Error: File Not Found');
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// }

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       'Content-Type': 'text/html'
//     });
//     const url = req.url;
//     switch(url){
//       case '/about':
//         renderHTML('./about.html', res);
//         break;
//       case '/contact':
//         renderHTML('./contact.html', res);
//         break;
//       default:
//         renderHTML('./index.html', res);
//         break;
//     }
    
//     // if (url === '/about') {
//     //   renderHTML('./about.html', res);
//     //   // res.write('<h1>Ini adalah halaman about</h1>');
//     //   // res.end();

//     //   // fs.readFile('./about.html', (err, data) => {
//     //   //   if (err) {
//     //   //     res.writeHead(404);
//     //   //     res.write('Error: File Not Found');
//     //   //   } else {
//     //   //     res.write(data);
//     //   //   }
//     //   //   res.end();
//     //   // });

//     // } else if (url === '/contact') {
//     //   renderHTML('./contact.html', res);
//     // } else {
//     //   renderHTML('./index.html', res);
//     // }
//   })
//   .listen(port, () => {
//     console.log(`Server is listening on port ${port}`)
//   });