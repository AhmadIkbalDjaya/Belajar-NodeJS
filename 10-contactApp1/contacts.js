const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// membuat folder data jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (result) => {
      resolve(result);
    })
  })
}

const simpanContact = (nama, email, noHp) => {
  const contact = {nama, email, noHp};
  const file = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(file);

  contacts.push(contact);

  fs.writeFileSync('data/contacts.json',  JSON.stringify(contacts));

  console.log('Terima Kasih Sudah Mengisi');
  
  rl.close();
}

module.exports = {tulisPertanyaan, simpanContact}