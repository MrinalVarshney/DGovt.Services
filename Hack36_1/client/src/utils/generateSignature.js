import Web3 from "web3";
import { keccak256 } from "web3-utils";

const generateSignature = async (privateKey, voterId, username) => {
  try {
    // Create a new Web3 instance
    const web3 = new Web3();

    // Create a wallet instance from the private key
    const wallet = web3.eth.accounts.privateKeyToAccount(privateKey);

    // Sign the hashed message with the private key
    const signature = await wallet.sign(
      "0xf36e97054da6c7fff4253cdd1fa99186a3eeb7dea9700fc522995224e06105a4"
    );

    return signature;
  } catch (error) {
    console.error("Error generating signature:", error);
    throw error;
  }
};

// 0xa7dfc688d577a806eecfaee2516b72350b02c944e2a36ace8653d7951309eafd

export default generateSignature;
