const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contact')

const app = express();
const port = 3000;

// setup ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
  ];
  res.render('index', {
    title: 'Halaman home',
    layout: 'layouts/main-layouts',
    nama: "Ahmad Ikbal Djaya",
    mahasiswa
  });
});

// Halaman About
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Halaman About',
    layout: 'layouts/main-layouts'
  });
});

// Halaman Contact
app.get('/contact', async (req, res) => {
  // Contact.find().then((contact) => {
  //   res.send(contact);
  // })
  const contacts = await Contact.find()
  res.render('contact', {
    title: 'Halaman Contact',
    layout: 'layouts/main-layouts',
    contacts,
    msg: req.flash('msg'),
  });
});

// halaman detail contact
app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render('detail', {
    title: 'Halaman Detail Contact',
    layout: 'layouts/main-layouts',
    contact
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});