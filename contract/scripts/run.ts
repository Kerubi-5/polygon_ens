import { ethers } from "hardhat";

async function main() {
  const DomainsContract = await ethers.getContractFactory("Domains");
  const domainContract = await DomainsContract.deploy();

  await domainContract.deployed();

  const txn = await domainContract.register("doom");
  await txn.wait();

  const domainOwner = await domainContract.getAddress("doom");
  console.log(`Owner of doom is: ${domainOwner}`);

  console.log("Greeter deployed to:", domainContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
