const contact = require('./contacts');
// const {tulisPertanyaan, simpanContact} = require('./contacts');
const main = async() => {
  const nama = await contact.tulisPertanyaan("Masukkan Nama Anda: ");
  const email = await contact.tulisPertanyaan("Masukkan Email Anda: ");
  const noHp = await contact.tulisPertanyaan("Masukkan noHp Anda: ");

  contact.simpanContact(nama, email, noHp)
}

main();



// Cara Kedua

// const pertanyaan1 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question('Masukkan Nama Anda : ', (nama) => {
//       resolve(nama);
//     })
//   })
// }

// const pertanyaan2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question('Masukkan Email Anda : ', (email) => {
//       resolve(email);
//     })
//   })
// }

// const main = async() => {
//   const nama = await pertanyaan1();
//   const email = await pertanyaan2();

//   const contact = {nama, email};
//   const file = fs.readFileSync('data/contacts.json', 'utf-8');
//   const contacts = JSON.parse(file);

//   contacts.push(contact);

//   fs.writeFileSync('data/contacts.json',  JSON.stringify(contacts));

//   console.log('Terima Kasih Sudah Mengisi');
  
//   rl.close();
// }
// main();


// Cara pertama

// rl.question('Masukkan Nama Anda : ', (nama) => {
//   rl.question('Masukkan Nomor HP : ', (noHp) => {
//     const contact = {nama, noHp};
//     const file = fs.readFileSync('data/contacts.json', 'utf-8');
//     const contacts = JSON.parse(file);

//     contacts.push(contact);

//     fs.writeFileSync('data/contacts.json',  JSON.stringify(contacts));

//     console.log('Terima Kasih Sudah Mengisi');
    
//     rl.close();
//   });
// });