# Metacrafter-Avalanche-Module2
## Description
This project is a framework for creating a decentralized application (DApp) that links a front-end interface (index.js) to a Solidity smart contract (assessment.sol). It includes capabilities for connecting with cryptocurrency wallets (like MetaMask) to conduct transactions on a localhost.

## Getting Started
### Executing Program
To run this program, you can use a local IDE like VSCode or online IDEs like Gitpod. Follow these steps to get started:

1. Clone the Repository:
   git clone url
2. Install Dependencies:
  Note. Make sure that you have Node.js and other necessary dependencies installed.
  Inside the project directory, in the terminal, type:
  npm i
3.Set Up Development Environment:
Open two additional terminals in your VSCode.
Start Local Blockchain:
  In the second terminal, type:
  npx hardhat node
4. Deploy the Contract:
  In the third terminal, type:
  npx hardhat run --network localhost scripts/deploy.js
5. Launch the Front-End:
  Back in the first terminal, type:
  npm run dev
After completing these steps, the project will be running on your localhost, typically at http://localhost:3000/.


### Changes Made to the Initial Template
1. Currency Conversion:
Added functionality to convert ETH balance to USD using CoinGecko API.
Implemented fetching of real-time ETH to USD exchange rate.
Displayed balance in both ETH and USD on the frontend.
Thank You Message:
2. Added a thank you message at the end of the user interface.
3. Total Amount Display:
Added the total amount deposited and withdrawn to be shown.
4. Custom Amount Sending:
Added the option to send a custom amount of ETH up to 5.
5. Frontend Look:
Changed the frontend look.
## Help
Ensure that you have sufficient Ethereum in your account for deployment and transactions. For further assistance, you can refer to the Hardhat documentation.
## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
Ensure that you have sufficient Ethereum in your account for deployment and transactions. For further assistance, you can refer to the Hardhat documentation.
## Authors
Prince Sharma
sharmahprince@gmail.com
