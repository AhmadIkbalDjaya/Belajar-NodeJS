const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', (req, res) => {
  // res.sendFile('./index.html', {root: __dirname});
  const mahasiswa = [
    {
      nama: 'Ikbal Djaya',
      email: 'ikbaldjaya@gmail.com'
    },
    {
      nama: 'Andi Rum',
      email: 'andirum@gmail.com'
    },
    {
      nama: 'Erron Lie',
      email: 'erronlie@gmail.com'
    },
  ]
  res.render('index', { 
    layout: 'layouts/main-layouts',
    nama: 'Ikbal Djaya', 
    title: 'Halaman Home',
    mahasiswa
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layouts',
    title: 'Halaman About'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'layouts/main-layouts',
    title: 'Halaman Contact'
  });
});

app.get('/product/:id', (req, res) => {
  res.send(`Produk ID: ${req.params.id} <br> Category: ${req.query.category}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404 Page Not Found</h1>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})