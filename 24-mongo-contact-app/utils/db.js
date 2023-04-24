const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/bljrnodejs');



















// // membuat schema
// const Contact = mongoose.model('Contact', {
//   nama: {
//     type: String,
//     required: true,
//   },
//   nohp: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//   }
// });

// // menambah 1 data
// const contact1 = new Contact({
//   nama: 'Ahmad Ikbal Djaya',
//   nohp: '081241250245',
//   email: 'ikbaldjaya@gmail.com',
// });

// // simpan ke collection
// contact1.save().then((contact) => console.log(contact))