import * as ethers from "ethers";

import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-web3";
import dotenv from "dotenv";

dotenv.config();

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the TokenZK contract`);

  // Initialize the wallet.
  const wallet = new Wallet(process.env.PRIVATE_KEY as string);

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("TokenZK");

  // Estimate contract deployment fee
  const args = ["TokenZK", "TKZK", 1000000];
  const deploymentFee = await deployer.estimateDeployFee(artifact, args);

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `args` is an argument for contract constructor.
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const tokenZKContract = await deployer.deploy(artifact, args);

  //obtain the Constructor Arguments
  console.log("constructor args:" + tokenZKContract.interface.encodeDeploy(args));

  // Show the contract info.
  const contractAddress = tokenZKContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}

// 0x2C736346e1ADf40b7BB8B466beF3662BA6eDDD4c
