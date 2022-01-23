const walletAddress = process.env.wallet || '0x7036B4dE2df2BBF3E9D8b7EDFC06C65AF7BaEB0d'
const privateKey = process.env.privateKey || '96500e6540837bcff174fd383ff5e7ca0aa2d0ee07685edb9fa91f65b12a6049'
const buyWith = '0xae13d989dac2f0debff460ac112a837c89baa7cd' // [TESTNET BNB] || Address of the token you're buying with - BUSD is: 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56

module.exports = {walletAddress, privateKey, buyWith}