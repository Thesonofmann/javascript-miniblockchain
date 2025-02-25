const SHA256 = require('crypto-js/sha256')


class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
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
        this.difficulty = 7;
    }

    createGenesisBlock(){
        return new Block("01/01/2024", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];

    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock);

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

// create new blocks on a chain
console.log('Mining block 1...');
sonofmanCoin.addBlock(new Block(1, "10/12/2024", { amount: 4}));

console.log('Mining block 2...');
sonofmanCoin.addBlock(new Block(2, "12/22/2024", { amount: 10}));







// console.log('Is blockchain valid? ' + sonofmanCoin.isChainValid());

// // making changes to the block to verify if it would remain valid
// sonofmanCoin.chain[1].data = {amount: 100};

// // recalculate the hash for the block that was edited...still false btw
// // solution might be to create a new block once the data is modified
// sonofmanCoin.chain[1].hash = sonofmanCoin.chain[1].calculateHash();


// console.log('Is blockchain valid? ' + sonofmanCoin.isChainValid());



// console.log(JSON.stringify(sonofmanCoin, null, 3));


