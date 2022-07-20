## Decentralized Exchange Limit Order App

This Node JS app will allow you to set a limit Buy / Sell order on PancakeSwap Crypto Decentralized Exchange.

### How does it work?

This app can run as a standalone app or Docker container.
There are **2 environment variables** that can be used: `Wallet Address` and `Private Key`.

> Note: If these two variables are not declared in the command line, this app will use the default values - this way you can test the app to see how it's working.

------------

#### Run from the Terminal

    wallet="YOUR WALLET ADDRESS" privateKey="YOUR PRIVATE KEY" node app

Or run `node app` to use the default values (Test Wallet).

------------

#### Run in Docker container

	docker run -e wallet="YOUR WALLET ADDRESS" -e privateKey="YOUR PRIVATE KEY" -it —rm —name dex iustin23/dex node app.js

Or run `docker run -it --rm --name dex iustin23/dex node app.js` to use the default values (Test Wallet).

------------


#### Examples

##### Buy order

*We want to set up a Buy limit order to exchange 1 BNB for BUSD.*

 **BUSD Contract Address** `0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee`

1. I'll run the command `node app` to use the test wallet.
2. Select "Buy" option
3. Type the target price. In this example I will use **0.5** BUSD per BNB - this is a high exchange rate, so the order will be executed immediately.
4. Type the contract address: **0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee**
5. Type how much you would like to spend. In this example I will use **1** BNB
6. Press Enter and wait for the app to scan for the price and execute your order.

*If your order has been successfully executed, you should see a link that will redirect you to BSCscan where you can see your transaction on the blockchain.*

##### Sell order

*We want to set up a Sell limit order to exchange 1 BUSD for BNB.*

 **BUSD Contract Address** `0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee`

1. I'll run the command `node app` to use the test wallet.
2. Select "Buy" option
3. Type the target price. In this example I will use **0.01** BUSD per BNB - this is a low exchange rate, so the order will be executed immediately.
4. Type the contract address: **0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee**
5. Type how much you would like to spend. In this example I will use **1** BUSD
6. Press Enter and wait for the app to scan for the price and execute your order.

*If your order has been successfully executed, you should see a link that will redirect you to BSCscan where you can see your transaction on the blockchain.*
