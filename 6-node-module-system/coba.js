function cetakNama(nama) {
  return `Halo, nama saya ${nama}`;
}
const PI = 3.14;

const mahasiswa = {
  nama : 'Ahmad Ikbal',
  umur : 20,
  cetakMhs() {
    return `Nama saya ${this.nama} dan saya ${this.umur} tahun.`;
  }
}

class Orang{
  constructor(){
    console.log('objek orang telha dibuat');
  }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// module.exports = {
//   cetakNama: cetakNama,
//   PI: PI,
//   mahasiswa: mahasiswa,
//   Orang: Orang,
// }

module.exports = {cetakNama, PI, mahasiswa, Orang}