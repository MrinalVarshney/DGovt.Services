import React, { useState, useEffect } from "react";
import Web3 from "web3";
import govBodyABI from "../ABI/govBody.json";

function ContractInteraction() {
  const [web3Local, setWeb3Local] = useState(null); // For local Hardhat node
  const [web3Wallet, setWeb3Wallet] = useState(null); // For user's wallet
  const [contract, setContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const govBodyContractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

  // Initialize Web3 for local Hardhat node
  useEffect(() => {
    const initWeb3Local = async () => {
      const web3Instance = new Web3("http://127.0.0.1:8545"); // Assuming Hardhat is running on port 8545
      setWeb3Local(web3Instance);
      console.log("Web3 for local node initialized.");
    };

    // Connect to user's wallet
    const connectWallet = async () => {
      try {
        if (!web3Wallet) {
          if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            await window.ethereum.enable(); // Request user's permission to connect
            setWeb3Wallet(web3Instance);
            console.log("Web3 for wallet connected.");
          } else {
            console.log(
              "MetaMask not found. Please install MetaMask to connect your wallet."
            );
          }
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };

    initWeb3Local();
    connectWallet();
  }, []); // Only run once on component mount

  useEffect(() => {
    const loadContract = async () => {
      if (web3Local) {
        const contractInstance = new web3Local.eth.Contract(
          govBodyABI.abi,
          govBodyContractAddress
        );
        setContract(contractInstance);
        console.log("Contract loaded.");
      }
    };
    console.log("Loading contracts")
    loadContract();
  }, [web3Local]);

  console.log("Wallet ", web3Wallet);
  console.log(web3Local);

  const handleInteraction = async () => {
    if (!web3Wallet || !contract) {
      console.error("Web3 for wallet or contract not initialized.");
      return;
    }

    if (!walletAddress) {
      console.error("Wallet address not provided.");
      return;
    }

    try {
      const accounts = await web3Local.eth.getAccounts();
      const sender = accounts[0];
      console.log(sender)

      // Here, assuming you want to add user with the same wallet address
      const response = await contract.methods
        .checkUser(walletAddress).send({ from: sender });

      console.log(response);
      // console.log("Transaction hash:", response.transactionHash);
      alert("User added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction failed. See console for error.");
    }
  };

  return (
    <div>
      <h1>Contract Interaction</h1>
      <label htmlFor="walletAddress">Wallet Address:</label>
      <input
        type="text"
        id="walletAddress"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <button onClick={handleInteraction}>Interact with Contract</button>
    </div>
  );
}

export default ContractInteraction;
