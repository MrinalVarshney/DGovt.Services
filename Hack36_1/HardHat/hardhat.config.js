/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-gas-reporter")
require("dotenv").config();

module.exports = {
  defaultNetwork: "hardhat",
  // networks: {
  //   Sepolia: {url:RPC_URL,
  //   accounts: [PRIVATE_KEY]},
  //   chainId: number,
  // },
  localhost:{
    url: "http://127.0.0.1:8545/",
    chainId: 31337,

  },
  solidity: "0.8.24",
  etherscan:{
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  gasReporter:{
    enabled:false,
    outputFile: "gas-report.txt",
    noColor: true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  }
};
