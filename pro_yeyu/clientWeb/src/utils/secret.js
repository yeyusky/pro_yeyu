import CryptoJS from 'crypto-js'

// 获取AES所需要的参数
const getCryptoParse = (str) => {
  return CryptoJS.enc.Utf8.parse(str)
}

// 加密
const aesEncrypt = (word) => {
  const keyStr = 'absoietpasswrd12'
  const ivStr = 'absoietpasswrd12'
  const key = getCryptoParse(keyStr)
  const iv = getCryptoParse(ivStr)
  const password = getCryptoParse(word)
  const encrypted = CryptoJS.AES.encrypt(password, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return encrypted.toString()
}

// 解密
const aesDecrypt = (word) => {
  const keyStr = 'absoietpasswrd12'
  const ivStr = 'absoietpasswrd12'
  const key = getCryptoParse(keyStr)
  const iv = getCryptoParse(ivStr)
  const decrypted = CryptoJS.AES.decrypt(word, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

export default {
  aesEncrypt,
  aesDecrypt
}
