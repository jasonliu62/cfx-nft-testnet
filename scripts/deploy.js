const { ethers } = require("hardhat");
const {writeFileSync, readFileSync} = require("node:fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const MyContract = await ethers.getContractFactory("KwolfNFT");
    const myContract = await MyContract.deploy();
    console.log("MyContract deployed to:", myContract.address);

    let envConfig = readFileSync('.env', 'utf8');
    envConfig = envConfig.split('\n').filter(line => !line.startsWith('CONTRACT_ADDRESS=')).join('\n');
    envConfig += `\nCONTRACT_ADDRESS=${myContract.address}\n`;
    writeFileSync('.env', envConfig);
    console.log("Contract address saved to .env file");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
