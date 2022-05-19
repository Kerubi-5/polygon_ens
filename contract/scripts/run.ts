import { ethers } from "hardhat";

async function main() {
  const DomainsContract = await ethers.getContractFactory("Domains");
  const domainContract = await DomainsContract.deploy();

  await domainContract.deployed();

  console.log("Greeter deployed to:", domainContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
