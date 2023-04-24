const { ObjectID } = require('bson');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'bljrnodejs';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, client) => {
  if(err){
    return console.log('Koneksi Gagal!');
  }
  // console.log('Koneksi Berhasil!');
  // pilih database
  const db = client.db(dbName);

  // Menambahkan 1 data ke collection mahasiswa
  // db.collection('mahasiswa').insertOne(
  //   {
  //     nama: "Ond D",
  //     emial: 'oned@gmail.com',
  //   },
  //   (err, result) => {
  //     if(err){
  //       return console.log('Gagal menambahkan data');
  //     }
  //     console.log(result);
  //   }
  // );

  // Menmabhakan lebih dari 1 data
  // db.collection('mahasiswa').insertMany(
  //   [
  //     {
  //       nama: 'Agung Umar',
  //       email: 'agungumar@gmail.com',
  //     },
  //     {
  //       nama: 'Sidqi',
  //       email: 'sidqi@gmail.com',
  //     }
  //   ],
  //   (err, result) => {
  //     if(err){
  //       return console.log('Data gagal ditambahkan');
  //     }
  //     console.log(result);
  //   }
  // );

  // Menampilkan semua data yang ada pada collection 'mahasiswa'
  // console.log(
  //   db
  //     .collection('mahasiswa')
  //     .find()
  //     .toArray((err, result) => {
  //       console.log(result);
  //     })
  // )

  // Menampilkan data berdasarkan kriteria tertentu
  // console.log(
  //   db
  //     .collection('mahasiswa')
  //     // .find({ nama: 'Agung Umar'})
  //     .find({ _id: ObjectID('63cdc04d71539de88cf72e77')})
  //     .toArray((err, result) => {
  //       console.log(result);
  //     })
  // );
  
  // memngubah data berdasarkan id
  // const updatePromise = db.collection('mahasiswa').updateOne(
  //   {
  //     _id: ObjectID('63cdc32f9062344754313ca7',)
  //   },
  //   {
  //     $set: {
  //       nama: 'Ahmad Sidqi'
  //     },
  //   }
  // );

  // updatePromise
  //   .then(result => console.log(result))
  //   .catch(err => console.log(err))

  // Mengubah data lebih dari 1, berdasarkan kriteria
  // db.collection('mahasiswa').updateMany(
  //   {
  //     nama: 'One D'
  //   },
  //   {
  //     $set: {
  //       nama: 'Riswan'
  //     },
  //   }
  // );

  // Menghapus 1 data
  // db.collection('mahasiswa')
  //   .deleteOne({
  //     _id: ObjectID('63cdc07271539de88cf72e78'),
  //   })
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err))

  // Menghapus lebih dari 1 data
  db.collection('mahasiswa')
    .deleteMany({
      nama: 'Riswan',
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
});
