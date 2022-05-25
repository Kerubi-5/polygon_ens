import { ethers } from "hardhat";

async function main() {
  const [owner, superCoder] = await ethers.getSigners();
  const domainContractFactory = await ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("kk");
  await domainContract.deployed();

  console.log("Contract owner:", owner.address);

  let txn = await domainContract.register("a16z", {
    value: ethers.utils.parseEther("1234"),
  });
  await txn.wait();

  const balance = await ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(balance));

  try {
    txn = await domainContract.connect(superCoder).withdraw();
    await txn.wait();
  } catch (error) {
    console.log("Could not rob contract");
  }

  // Let's look in their wallet so we can compare later
  let ownerBalance = await ethers.provider.getBalance(owner.address);
  console.log(
    "Balance of owner before withdrawal:",
    ethers.utils.formatEther(ownerBalance)
  );

  // Oops, looks like the owner is saving their money!
  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();

  // Fetch balance of contract & owner
  const contractBalance = await ethers.provider.getBalance(
    domainContract.address
  );
  ownerBalance = await ethers.provider.getBalance(owner.address);

  console.log(
    "Contract balance after withdrawal:",
    ethers.utils.formatEther(contractBalance)
  );
  console.log(
    "Balance of owner after withdrawal:",
    ethers.utils.formatEther(ownerBalance)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
