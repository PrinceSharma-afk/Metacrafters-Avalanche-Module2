# Metacrafter-Avalanche-Module2
This is my project of module 2 of avalanche given to me by Metacrafters where i edited a template of a simple atm model.
# Description
This project acts as a framework for creating a decentralised application (DApp) that links a front-end interface (index.js) to a Solidity smart contract (assessment.sol). In order to conduct blockchain transactions, the project also has capabilities for connecting with cryptocurrency wallets (like MetaMask).
# Getting Started
Executing program
To run this program, you can use local IDE like VSCode or online IDEs like Gitpod. 
To get started, clone this repository using the following cmd in terminal: git clone url.

After cloning the github, you will want to do the following to get the code running on your computer.
(Make sure that you have node.js and other files which are needed for program executions installed.)
Inside the project directory, in the terminal type: npm i
Open two additional terminals in your VS code
In the second terminal type: npx hardhat node
In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
Back in the first terminal, type npm run dev to launch the front-end.
After this, the project will be running on your localhost. Typically at http://localhost:3000/
The changes made in initial template are listed below:
1. Currency Conversion
Added functionality to convert ETH balance to USD using CoinGecko API.
Implemented fetching of real-time ETH to USD exchange rate.
Displayed balance in both ETH and USD on the frontend.
2.Added a thank you message at the end of the user interface.
3. Added total amount deposited and withdrawn to be shown.
4. Added the option to send custom amount of eth upto 5.
5. Changed the frontend look.
