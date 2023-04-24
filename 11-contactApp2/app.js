const yargs = require("yargs");
const contacts = require("./contacts");
// meengambil argument dari command line
// console.log(process.argv[2]);
// const command = process.argv[2];
// if (command === 'add') {


// } else if (command === 'remove') {

// } else if (command === 'list') {

// }

yargs.command({
  command: 'add',
  describe: 'Menambahkan Kontak baru',
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: "Email",
      demandOption: false,
      type: 'string'
    },
    noHP: {
      describe: "nomor handphone",
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    contacts.simpanContact(argv.nama, argv.email, argv.noHP);
  }
})

yargs.parse();