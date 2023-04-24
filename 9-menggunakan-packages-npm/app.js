var validator = require('validator');
var chalk = require('chalk');

// console.log(validator.isEmail('ikbaldjaya@gmail.com'))
// console.log(validator.isMobilePhone('081241250245','id-ID'))
// console.log(validator.isNumeric('081241250245'))

// console.log(chalk.blue('Hello Word'));
// console.log(chalk.bgBlue.red('Hello Word'));
// console.log(chalk.bold.underline.greenBright('Hello Word'));

const tgl = '26 November 2022';
const pesan = chalk`{bold hari ini} {italic saya} belajar menggunakan {bgBlue.red.underline packages NPM}. ${tgl}`;
console.log(pesan);