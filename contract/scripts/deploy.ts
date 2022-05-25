import { ethers } from "hardhat";

async function main() {
  const DomainsContract = await ethers.getContractFactory("Domains");
  const domainContract = await DomainsContract.deploy("kk");

  await domainContract.deployed();

  console.log("Contract address deployed to:", domainContract.address);

  // * CONTRACT ADDRESS : 0x6ECBC674AD7754A472335d427c4e9d33A99F3461
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
