const { Blockchain, Transaction } = require('./blockchain3');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('dced68ba238bc283a7998d589abc82040a3091f45098436a3cb4212ff4b89973');
const myWalletAddress = myKey.getPublic('hex');

// create a new instance of the blockchain(a new chain)
let sonofmanCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransanction(myKey);
sonofmanCoin.addTransaction(tx1);



console.log('starting the miner...');
sonofmanCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of myWallet is', sonofmanCoin.getBalanceOfAddress(myWalletAddress));

console.log('is chain valid? ' + sonofmanCoin.isChainValid());
















