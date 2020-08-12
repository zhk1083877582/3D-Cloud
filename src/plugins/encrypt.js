/* eslint-disable */
import CryptoJS from "crypto-js";
const aeskey = 'y2W89L6BkRAFljhN';
const aesiv= 'dMitHORyqbeYVE0o';
// const CryptoJS = require('crypto-js');  //引用AES源码js
const key = CryptoJS.enc.Utf8.parse(aeskey); //十六位十六进制数作为秘钥
const iv = CryptoJS.enc.Utf8.parse(aesiv); //十六位十六进制数作为秘钥偏移量

//解密方法
function Decrypt(word) {
    // 特殊字符处理
    word = word.replace(/\n/g,'');
    let encryptedHexStr = CryptoJS.enc.Base64.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
//加密方法
function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

export default {
	Decrypt ,
	Encrypt
}