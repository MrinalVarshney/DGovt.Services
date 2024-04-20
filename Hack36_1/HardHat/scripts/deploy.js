//import
const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
  //User token distribution token deploy
  console.log("Deploying user token contract...");
  const userTokenFactory = await ethers.getContractFactory("MyToken");
  const userTokenContract = await userTokenFactory.deploy("Government Elections",10000);
  userTokenContract.waitForDeployment();
  const userTokenContractAddress = await userTokenContract.getAddress();
  console.log(await userTokenContractAddress);

  //Govt. body contract
  console.log("Deploying gov contract");
  const govFactory = await ethers.getContractFactory("govBody");
  const govBodyContract = await govFactory.deploy(
    await userTokenContractAddress
  );
  govBodyContract.waitForDeployment();
  const govBodyContractAddress = await govBodyContract.getAddress();
  console.log(await govBodyContractAddress);

  //Decentralized Auth contract deployment
  console.log("Auth contracts deployments");
  const signUpVerifierFactory = await ethers.getContractFactory(
    "VerifySignature"
  );
  const signUpVerifier = await signUpVerifierFactory.deploy(await govBodyContractAddress);
  await signUpVerifier.waitForDeployment();
  const signUpVerifierAddress = await signUpVerifier.getAddress();
  console.log(await signUpVerifier);

  const helloFactory = await ethers.getContractFactory("Hello");

  console.log(await signUpVerifier.getAddress());
  console.log("Deploying Hello...");
  const hello = await helloFactory.deploy();
  hello.waitForDeployment();
  console.log(await hello.getAddress());

  //   const response = await hello.sayHello();
  //   console.log(response);
}

async function verify(contractAddress, args) {
  console.log("verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
