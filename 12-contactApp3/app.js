const { string } = require("yargs");
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
}).demandCommand();

// menampilkan daftar semua nama dan no HP contact
yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama dan no HP contact',
  handler() {
    contacts.listContact();
  }
})

// menampilkan detail sebuah  contac berdasarkan nama
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail dari sebuah contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama Contact',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  }
});

// menghapus sebuah contact berdasarkan nama
yargs.command({
  command: 'delete',
  describe: 'Menghapus contact berdasaarkan nama',
  builder: {
    nama: {
      describe: 'Nama Contact',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  }
})



yargs.parse();