import { ethers } from "hardhat";

async function main() {
  const DomainsContract = await ethers.getContractFactory("Domains");
  const domainContract = await DomainsContract.deploy("kk");

  await domainContract.deployed();

  const txn = await domainContract.register("doom", {
    value: ethers.utils.parseEther("0.1"),
  });

  await txn.wait();

  const domainOwner = await domainContract.getAddress("doom");
  console.log(`Owner of doom is: ${domainOwner}`);

  const balance = await ethers.provider.getBalance(domainOwner);
  console.log(`Balance of owner is: ${ethers.utils.formatEther(balance)}`);

  console.log("Greeter deployed to:", domainContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
