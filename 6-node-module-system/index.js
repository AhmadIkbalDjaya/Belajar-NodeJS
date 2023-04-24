// 1. core module
// 2. local module
// 3. npm module
// const fs = require('fs'); //core module
// const cetakNama = require('./coba'); //local module     ./ = relatif url
// const moment = require('moment') // third party module/npm module. berada di dalam folder node_modules

// const cetakNama = require('./coba');
// const PI = require('./coba');
const coba = require('./coba');
console.log(coba);
console.log(
  coba.cetakNama('Ikbal'), 
  coba.PI, 
  coba.mahasiswa.cetakMhs(), 
  new coba.Orang()
);