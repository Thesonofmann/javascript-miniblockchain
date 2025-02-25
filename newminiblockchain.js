const SHA256 = require('crypto-js/sha256')


class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !==Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}



class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningRewards = 100;
    }

    createGenesisBlock(){
        return new Block("01/01/2024", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];

    }

    minePendingTransactions(miningRewardAddress){
        let blocks = new Block(Date.now(), this.pendingTransactions);
        blocks.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(blocks);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningRewards)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
    
    getBalanceOfAddress(address){
        let balance = 0;

        for (const block of this.chain){
            for (const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
isChainValid(){
    for(let i = 1; i <this.chain.length; i++){
        const currentBlock = this.chain[i];
        const prevBlock = this.chain[i - 1];
        
        if(currentBlock.hash !== currentBlock.calculateHash()){
            return false;
        }
        if(currentBlock.previousHash !==prevBlock.hash){
            return false;
        }
    }
    return true;
}

}


// create a new chain
let sonofmanCoin = new Blockchain();
sonofmanCoin.createTransaction(new Transaction('address1', 'address2', 100));
sonofmanCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('starting the miner...');
sonofmanCoin.minePendingTransactions('ashh-address');

console.log('\nBalance of ashh is', sonofmanCoin.getBalanceOfAddress('ashh-address'))

console.log('starting the miner again...');
sonofmanCoin.minePendingTransactions('ashh-address');

console.log('\nBalance of ashh is', sonofmanCoin.getBalanceOfAddress('ashh-address'))













// create new blocks on a chain
// console.log('Mining block 1...');
// sonofmanCoin.addBlock(new Block(1, "10/12/2024", { amount: 4}));

// console.log('Mining block 2...');
// sonofmanCoin.addBlock(new Block(2, "12/22/2024", { amount: 10}));







// console.log('Is blockchain valid? ' + sonofmanCoin.isChainValid());

// // making changes to the block to verify if it would remain valid
// sonofmanCoin.chain[1].data = {amount: 100};

// // recalculate the hash for the block that was edited...still false btw
// // solution might be to create a new block once the data is modified
// sonofmanCoin.chain[1].hash = sonofmanCoin.chain[1].calculateHash();


// console.log('Is blockchain valid? ' + sonofmanCoin.isChainValid());



// console.log(JSON.stringify(sonofmanCoin, null, 3));


