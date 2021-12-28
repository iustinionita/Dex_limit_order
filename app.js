const Web3 = require('web3')
const { stdout } = require('process')
const inquirer = require('inquirer')
const questions = require('./menu')
const PCSjson = require('./PCS.json')
const TOKENjson = require('./TOKEN.json')
const { walletAddress, privateKey, buyWith } = require('./wallet')

//SETUP
const web3 = new Web3('https://bsc-dataseed.binance.org/')
const PCScontract = new web3.eth.Contract(PCSjson, '0x10ED43C718714eb63d5aA57B78B54704E256024E')

//CONFIG
// const token = '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82' // Cake
let tokenContract;
let tokenSymbol;
let event;
let targetPrice;
let contractAddress;
let amount;
let eventComplete = false;

//MENU
inquirer.prompt(questions).then(async answers => {
    event = Object.values(answers)[0][0]
    targetPrice = answers.targetPrice
    contractAddress = web3.utils.toChecksumAddress(answers.address)
    tokenContract = new web3.eth.Contract(TOKENjson, contractAddress)
    tokenSymbol = await tokenContract.methods.symbol().call().then(symbol => symbol)
    amount = web3.utils.toWei(answers.amount, 'ether')
    
    //Message for the user
    console.log(`\nWaiting to ${event} ${tokenSymbol} at the rate of ${targetPrice} ${tokenSymbol}/BNB for a total amount of ${answers.amount} BNB`)
    
    const priceInterval = setInterval(() => {
        if(eventComplete === false) {
            scanPrices(contractAddress)
        } else {
            clearInterval(priceInterval)
        }
    }, 1000)
})

function scanPrices(address) {
    PCScontract.methods.getAmountsOut(web3.utils.toWei('1', 'ether'), [web3.utils.toChecksumAddress(address), buyWith])
    .call().then(data => {
        let price = Number(web3.utils.fromWei(data[1])).toFixed(12);
        stdout.write(` Current rate: ${price} ${tokenSymbol}/BNB`)
        stdout.cursorTo(0)
        // console.log(price)
        if(event === 'Buy' && price <= targetPrice) {
            console.log("BUY Target price met! " + price)
            eventComplete = true
            buy()
        } else if (event === "Sell" && price >= targetPrice) {
            console.log("SELL Target price met! " + price)
            eventComplete = true
            sell()
        }}    
    )
}

function buy() {
    const encodedData = PCScontract.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(
        0,
        [buyWith, contractAddress],
        walletAddress,
        Date.now() + 1000 * 60 * 10
    ).encodeABI()
    // console.log(encodedData)

    const rawTransaction = {
        "from": walletAddress,
        "gas": 550000,
        "to": "0x10ED43C718714eb63d5aA57B78B54704E256024E", //PCS Router Address
        "value": amount,
        "data": encodedData
    }

    const signedTx = web3.eth.accounts.signTransaction(rawTransaction, privateKey)
    .then(signed => {
        web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', receipt => {
            // console.log(receipt)
            console.log(`https://bscscan.com/tx/${receipt.transactionHash}`)
        })
    })
}

function sell() {
    const hashApprove = tokenContract.methods.approve('0x10ED43C718714eb63d5aA57B78B54704E256024E', amount).encodeABI()
    const signedApprove = web3.eth.accounts.signTransaction({
        "from": walletAddress,
        "to": contractAddress,
        "gas": 290000,
        "data":hashApprove
    }, privateKey)
    .then(signed => {
        web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', receipt => {
            // console.log(receipt)
            const encodedData = PCScontract.methods.swapExactTokensForETHSupportingFeeOnTransferTokens(
                amount,
                10,
                [contractAddress, buyWith],
                walletAddress,
                Date.now() + 1000 * 60 * 10
            ).encodeABI()
            const rawTransaction = {
                "from": walletAddress,
                "gas": 500000,
                "to": "0x10ED43C718714eb63d5aA57B78B54704E256024E",
                "data": encodedData,
            }
            const signedTx = web3.eth.accounts.signTransaction(rawTransaction, privateKey)
            .then(signed => {
                web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', receipt => {console.log})
            })
        })
    })
}