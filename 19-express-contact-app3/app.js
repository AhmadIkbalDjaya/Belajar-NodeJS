const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContacts, findContact, addContact, cekDuplikat, deleteContact, updateContact } = require('./utils/contacts');
const { body, validationResult, check, cookie } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
const port = 3000;


app.set('view engine', 'ejs'); // gunakan ejs
app.use(expressLayouts); // Third-party Middleware 
app.use(express.static('public')); // Buld-in Middleware
app.use(express.urlencoded({extended: true}));

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
  const contacts = loadContacts();
  res.render('contact', {
    layout: 'layouts/main-layouts',
    title: 'Halaman Contact',
    contacts,
    msg: req.flash('msg'),
  });
});

// halaman form tambah contact data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Tambah Data Contact',
    layout: 'layouts/main-layouts',
  }); 
});

// proses tambah data contact
app.post('/contact', [
  body('nama').custom((value) => {
    const duplikat = cekDuplikat(value);
    if(duplikat){
      throw new Error('Nama Sudah Terdaftar')
    }
    return true;
  }),
  check('email', 'Email tidak valid').isEmail(), 
  check('nohp', 'No HP tidak valid').isMobilePhone('id-ID')
], 
(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    // return res.status(400).json({ errors: errors.array() });
    res.render('add-contact', {
      title: 'Tambah Data Contact',
      layout: 'layouts/main-layouts',
      errors: errors.array(),
    });
  } else {
    addContact(req.body);
    // kirimkan flash massage
    req.flash('msg', 'Data Kontak Berhasil Ditambahkan!');
    res.redirect('/contact');
  }
});

// hapus data contact
app.get('/contact/delete/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  // jika contact tidak ada
  if(!contact){
    res.status(404);
    res.send('<h1>404</h1>');
  } else {
    deleteContact(req.params.nama);
    req.flash('msg', 'Data Kontak Berhasil Dihapus!');
    res.redirect('/contact');
  }
});

// halaman detail contact
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', {
    title: 'Halaman Detail Contact',
    layout: 'layouts/main-layouts',
    contact
  });
});

// halaman form ubah contact data contact
app.get('/contact/edit/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('edit-contact', {
    title: 'Ubah Data Contact',
    layout: 'layouts/main-layouts',
    contact,
  }); 
});

// proses ubah data
app.post('/contact/update', [
  body('nama').custom((value, { req }) => {
    const duplikat = cekDuplikat(value);
    if(value !== req.body.oldNama && duplikat){
      throw new Error('Nama Sudah Terdaftar')
    }
    return true;
  }),
  check('email', 'Email tidak valid').isEmail(), 
  check('nohp', 'No HP tidak valid').isMobilePhone('id-ID')
], 
(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    // return res.status(400).json({ errors: errors.array() });
    res.render('edit-contact', {
      title: 'Ubah Data Contact',
      layout: 'layouts/main-layouts',
      errors: errors.array(),
      contact: req.body,
    });
  } else {
    // res.send(req.body);
    updateContact(req.body);
    // kirimkan flash massage
    req.flash('msg', 'Data Kontak Berhasil Diubah!');
    res.redirect('/contact');
  }
});

app.use((req, res) => {
  res.status(404)
  res.send('<h1>404 Page Not Found</h1>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Link: http://localhost:${port}`);
})