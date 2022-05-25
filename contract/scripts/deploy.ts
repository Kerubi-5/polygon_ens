import { ethers } from "hardhat";

async function main() {
  const DomainsContract = await ethers.getContractFactory("Domains");
  const domainContract = await DomainsContract.deploy("kk");

  await domainContract.deployed();

  console.log("Contract address deployed to:", domainContract.address);

  // * CONTRACT ADDRESS : 0x66B411f27B39151a2BAC505e775C0D087b65b044
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
