import * as CryptoJS from 'crypto-js';

const Cryptor = {
  aes_ecb_encrypt: (textI: any, keyI: any) => {
    const text = CryptoJS.enc.Utf8.parse(textI);
    const key = CryptoJS.enc.Utf8.parse(keyI);
    const cipher = CryptoJS.AES.encrypt(text, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString();
  },
  aes_ecb_decrypt: (cipherI: any, keyI: any) => {
    const key = CryptoJS.enc.Utf8.parse(keyI);
    const bytes = CryptoJS.AES.decrypt(cipherI, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return bytes.toString(CryptoJS.enc.Utf8).toString();
  },
  aes_cbc_encrypt: (textI: any, keyI: any, ivI: any) => {
    const text = CryptoJS.enc.Utf8.parse(textI);
    const key = CryptoJS.enc.Utf8.parse(keyI);
    const iv = CryptoJS.enc.Utf8.parse(ivI);
    const cipher = CryptoJS.AES.encrypt(text, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString();
  },
  aes_cbc_decrypt: (cipherI: any, keyI: any, ivI: any) => {
    const key = CryptoJS.enc.Utf8.parse(keyI);
    const iv = CryptoJS.enc.Utf8.parse(ivI);
    const bytes = CryptoJS.AES.decrypt(cipherI, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return bytes.toString(CryptoJS.enc.Utf8).toString();
  }
};

export default Cryptor;
