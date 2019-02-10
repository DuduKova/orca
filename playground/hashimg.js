// const crypto = require('crypto');
// const {SHA256} =  require('crypto-js');
//
// const mes = 'dudu kovalski';
// const hash = SHA256(mes).toString();
//
// console.log(mes);
// console.log(hash);
//
// const data = {
//     id: 4,
// };
//
// const token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'dudukovalski').toString()
// };
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// const resultHash = SHA256(JSON.stringify(token.data) + 'dudukovalski').toString();
//
// if ( resultHash === token.hash) {
//     console.log('ok');
// } else {
//     console.log('bad');
// }

// const jwt = require('jsonwebtoken');
//
// const data = {
//     id: 10
// };
//
// const token =jwt.sign(data, '123abc');
// const decoded = jwt.verify(token , '123abc');
//
// console.log(decoded);

