import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [totalDeposited, setTotalDeposited] = useState(undefined);
  const [totalWithdrawn, setTotalWithdrawn] = useState(undefined);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [ethToUsdRate, setEthToUsdRate] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;
  const currencyConverterAPI = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balance = await atm.getBalance();
      const totalDeposited = await atm.getTotalDeposited();
      const totalWithdrawn = await atm.getTotalWithdrawn();

      setBalance(ethers.utils.formatEther(balance));
      setTotalDeposited(ethers.utils.formatEther(totalDeposited));
      setTotalWithdrawn(ethers.utils.formatEther(totalWithdrawn));

    //Fetch
      try {
        const response = await fetch(currencyConverterAPI);
        if (!response.ok) {
          throw new Error("Failed to fetch ETH to USD rate");
        }
        const data = await response.json();
        const ethToUsdRate = data.ethereum.usd;
        setEthToUsdRate(ethToUsdRate);
      } catch (error) {
        console.error("Failed to fetch ETH to USD rate:", error.message);
      }
    }
  };

  const deposit = async () => {
    if (atm && depositAmount > 0) {
      const amountInWei = ethers.utils.parseEther(depositAmount);
      let tx = await atm.deposit(amountInWei);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm && withdrawAmount > 0) {
      const amountInWei = ethers.utils.parseEther(withdrawAmount);
      let tx = await atm.withdraw(amountInWei);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH (~{ethToUsdRate ? (balance * ethToUsdRate).toFixed(2) : "?"} USD)</p>
        <p>Total Deposited: {totalDeposited} ETH (~{ethToUsdRate ? ( totalDeposited* ethToUsdRate).toFixed(2) : "?"} USD)</p>
        <p>Total Withdrawn: {totalWithdrawn} ETH (~{ethToUsdRate ? (totalWithdrawn * ethToUsdRate).toFixed(2) : "?"} USD)</p>
        <input
          type="number"
          placeholder="Amount to deposit"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={deposit}>Deposit</button>
        <input
          type="number"
          placeholder="Amount to withdraw"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={withdraw}>Withdraw</button>
        <p>Thank you for your visit!</p>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the CeSh ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
        main {
          margin: 0 auto;
          width: 50%;
          min-width: 300px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f8f9fa;
        }
      `}</style>
    </main>
  )
}
  