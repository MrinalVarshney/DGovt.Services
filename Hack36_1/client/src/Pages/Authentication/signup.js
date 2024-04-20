//Decentralized registration page for new users to create an account
import React, { useState, useEffect } from "react";
import generateSignature from "../../utils/generateSignature";

const Signup = () => {
  const [username, setUsername] = useState("Mrinal");
  const [password, setPassword] = useState("");
  const [voterId, setVoterId] = useState("1");
  const [validUser, setValidUser] = useState(true);
  const [hasWallet, setHasWallet] = useState(false);
  const [privateKey, setPrivateKey] = useState("");

  useEffect(() => {
    // Check if MetaMask is installed
    const checkMetaMask = async () => {
      if (window.ethereum) {
        // MetaMask is installed
        setHasWallet(true);
      }
    };

    checkMetaMask();

    // Add event listener for changes in wallet connection status
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    // Handle changes in wallet connection status
    if (accounts.length === 0) {
      // Wallet disconnected
      setHasWallet(false);
    } else {
      // Wallet connected
      setHasWallet(true);
    }
  };

  console.log(hasWallet);

  const handleRegister = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(privateKey)
    const signature = await generateSignature(privateKey, voterId, username);
    console.log(signature);
  };

  const handleVerifyUser = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {!validUser ? (
        <div>
          <h1>Signup</h1>
          <form onSubmit={handleVerifyUser}>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Voter-Id "
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
            />
            {/* OTP input */}
            <input
              type="text"
              placeholder="Enter OTP"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Next</button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleRegister}>
            <input
              type="password"
              placeholder="Enter your private key "
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
