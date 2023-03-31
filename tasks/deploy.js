// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

task('deployContract', 'Deploy new contract')
    .addParam('owner', 'the owner')
    .setAction(async ({ owner }, hre) => {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(
    unlockTime, 
    owner, 
    { value: lockedAmount }
    );

  await lock.deployed(60);
  await lock.deployTransaction.wait(9)

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );


  await hre.run("verify:verify", {
    address: lock.address,
    constructorArguments: [
        unlockTime,
        owner
    ],
  })

  return lock.address
})