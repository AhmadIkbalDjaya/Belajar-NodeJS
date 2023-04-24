const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require('./utils/contacts');
const app = express();
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs');
// Third-party Middleware 
app.use(expressLayouts);
// Buld-in Middleware
app.use(express.static('public'))

app.get('/', (req, res) => {
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
  const contacts = loadContact();
  res.render('contact', {
    layout: 'layouts/main-layouts',
    title: 'Halaman Contact',
    contacts
  });
});

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', {
    title: 'Halaman Detail Contact',
    layout: 'layouts/main-layouts',
    contact
  });
});

app.use((req, res) => {
  res.status(404)
  res.send('<h1>404 Page Not Found</h1>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Link: http://localhost:${port}`);
})