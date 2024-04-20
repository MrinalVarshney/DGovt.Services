import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";
import govBodyABI from "../ABI/govBody.json";
import signUpABI from "../ABI/signUpVerifier.json";
import storageABI from "../ABI/storage.json";
import LandNFTs from "../ABI/LandToken.json";
// Create the Web3 context
const Web3Context = createContext();

// Custom hook to use the Web3 context
export const useWeb3 = () => useContext(Web3Context);

// Web3 Provider component
export const Web3Provider = ({ children }) => {
  const [web3Local, setWeb3Local] = useState(null);
  const [web3Wallet, setWeb3Wallet] = useState(null);
  const [govContract, setgovContract] = useState(null);
  const [signupContract, setSignupContract] = useState(null);
  const [storageContract, setStorageContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [LandNFTsContract, setLandNFTSContract] = useState(null);
  const govBodyContractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
  const signUpVerifierContractAddress =
    "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";
  const storageContractAddress = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9";
  const LandNFTsContractAddress = "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707";

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
            const accounts = await web3Instance.eth.getAccounts();
            setWalletAddress(accounts[0]);
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

  // Load contract when web3Local changes
  useEffect(() => {
    const loadContract = async () => {
      if (web3Local) {
        var contractInstance = new web3Local.eth.Contract(
          govBodyABI.abi,
          govBodyContractAddress
        );

        setgovContract(contractInstance);
        contractInstance = new web3Local.eth.Contract(
          signUpABI.abi,
          signUpVerifierContractAddress
        );
        setSignupContract(contractInstance);
        contractInstance = new web3Local.eth.Contract(
          storageABI.abi,
          storageContractAddress
        );
        setStorageContract(contractInstance);
        console.log("Govt and auth contracts loaded");
        contractInstance = new web3Local.eth.Contract(
          LandNFTs.abi,
          LandNFTsContractAddress
        );
        setLandNFTSContract(contractInstance);
      }
    };

    loadContract();
  }, [web3Local]);

  useEffect(() => {
    const loadContract = async () => {
      if (web3Local) {
        var contractInstance = new web3Local.eth.Contract(
          govBodyABI.abi,
          govBodyContractAddress
        );

        setgovContract(contractInstance);
        contractInstance = new web3Local.eth.Contract(
          signUpABI.abi,
          signUpVerifierContractAddress
        );
        setSignupContract(contractInstance);
        console.log("Govt and auth contracts loaded");
      }
    };

    loadContract();
  }, [web3Local]);

  const values = {
    web3Local,
    web3Wallet,
    govContract,
    signupContract,
    walletAddress,
    storageContract,
    storageContractAddress,
    setWalletAddress,
  };

  return <Web3Context.Provider value={values}>{children}</Web3Context.Provider>;
};
