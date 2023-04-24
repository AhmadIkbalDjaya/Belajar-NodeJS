const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contact');
const { findOne } = require('./model/contact');

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride('_method'))

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

// halaman form tambah contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Halaman Tambah Data Contact',
    layout: 'layouts/main-layouts',
  });
});

// proses tambah data contact
app.post('/contact', [
  body('nama').custom( async (value) => {
    const duplikat = await Contact.findOne({ nama: value });
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
    res.render('add-contact', {
      title: 'Tambah Data Contact',
      layout: 'layouts/main-layouts',
      errors: errors.array(),
    });
  } else {
    Contact.insertMany(req.body, (error, result) => {
      req.flash('msg', 'Data Kontak Berhasil Ditambahkan!');
      res.redirect('/contact');
    })
  }
});

// hapus data contact
// app.get('/contact/delete/:nama', async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });
//   // jika contact tidak ada
//   if(!contact){
//     res.status(404);
//     res.send('<h1>404</h1>');
//   } else {
//     Contact.deleteOne({ _id: contact._id }).then(result => {
//       req.flash('msg', 'Data Kontak Berhasil Dihapus!');
//       res.redirect('/contact');
//     });
//   }
// });
app.delete('/contact', (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then(result => {
    req.flash('msg', 'Data Kontak Berhasil Dihapus!');
    res.redirect('/contact');
  });
});

// halaman form ubah contact data contact
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({nama: req.params.nama});
  res.render('edit-contact', {
    title: 'Ubah Data Contact',
    layout: 'layouts/main-layouts',
    contact,
  }); 
});

// proses ubah data
app.put('/contact', [
  body('nama').custom( async (value, { req }) => {
    const duplikat = await Contact.findOne({ nama: value});
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
    res.render('edit-contact', {
      title: 'Ubah Data Contact',
      layout: 'layouts/main-layouts',
      errors: errors.array(),
      contact: req.body,
    });
  } else {
    Contact.updateOne(
      { _id: req.body._id},
      {
        $set: {
          nama: req.body.nama,
          email: req.body.email,
          nohp: req.body.nohp,
        }
      }
    ).then((result) => {
      req.flash('msg', 'Data Kontak Berhasil Diubah!');
      res.redirect('/contact');
    });
  }
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