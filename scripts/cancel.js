// cancelListing.js
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    const contractAddress = process.env.contractAddress;
    const KwolfNFT = await ethers.getContractFactory("KwolfNFT");
    const nft = KwolfNFT.attach(contractAddress);

    const tokenID = 1; // Replace with your token ID
    const tx = await nft.cancelListing(tokenID);
    await tx.wait();

    console.log(`Listing for NFT with ID ${tokenID} canceled`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
