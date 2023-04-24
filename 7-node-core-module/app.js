// Core Module
// File System
const fs = require('fs');
// console.log(fs);


// ---fs.writeFileSync('path', 'data')     => menulis string ke file (synchronous)
// fs.writeFileSync('test.txt', 'Hello world secara syncronous!'); //jika tidak ada file akan dibuatkan tapi jika ada akan d timpa.
// fs.writeFileSync('data/test.txt', 'Hello world secara syncronous!'); //tidak bisa menulis di dalam folder yang belum d buat
// try {
//   fs.writeFileSync('data/test.txt', 'Hello world secara syncronous!');
// } catch(e){
//   console.log(e);
// }

// ---fs.writeFile(path, data, (err) => ) => menulis string ke file (asynchronous)
// fs.writeFile('data/test.txt', 'Hello world Secara Asynchronous', (e) => {
//   console.log(e);
// })


// ---fs.readFileSync(path, encoding)   => membaca isi file (synchronous)
// const data = fs.readFileSync('data/test.txt');
// console.log(data); //menampilkan buffer
// const data = fs.readFileSync('data/test.txt');
// console.log(data.toString()); //konversi buffer ke string dengan function
// const data = fs.readFileSync('data/test.txt', 'utf-8'); ////konversi ke string dengan parameter tambahan
// console.log(data);


//  ---fs.readFile(path, endcoding, (err, data))    => membaca isi file (asynchronous)
// const data = fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//   if(err) throw(err);
//   console.log(data);
// });


// Readline
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.question('Masukkan Nama Anda : ', (nama) => {
//   console.log(`Terima kasih ${nama}`);
//   rl.close();
// })

// rl.question('Masukkan Nama Anda : ', (nama) => {
//   rl.question('Masukkan Nomor HP : ', (noHp) => {
//     console.log(`Terima Kasih ${nama}, Telah menginputkan ${noHp}`);
//     rl.close();
//   });
// });


rl.question('Masukkan Nama Anda : ', (nama) => {
  rl.question('Masukkan Nomor HP : ', (noHp) => {
    const contact = {nama, noHp};
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json',  JSON.stringify(contacts));

    console.log('Terima Kasih Sudah Mengisi');
    
    rl.close();
  });
});
