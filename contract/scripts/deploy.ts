import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const DomainsContract = await ethers.getContractFactory("Domains");
  const domainContract = await DomainsContract.deploy("kk");

  await domainContract.deployed();

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  let txn = await domainContract.register("webdev", {
    value: ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain webdev.kk");

  txn = await domainContract.setRecord("webdev", "Am I a webdev or a kk??");
  await txn.wait();
  console.log("Set record for webdev.kk");

  const address = await domainContract.getAddress("webdev");
  console.log("Owner of domain webdev:", address);

  const balance = await ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(balance));

  console.log("Contract address deployed to:", domainContract.address);

  // * CONTRACT ADDRESS : 0x6ECBC674AD7754A472335d427c4e9d33A99F3461
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
