const { ethers } = require("hardhat");

async function main() {
    const kwolfNFTAddress = process.env.CONTRACT_ADDRESS;
    const KwolfNFT = await ethers.getContractFactory("KwolfNFT");
    const kwolfNFT = await KwolfNFT.attach(kwolfNFTAddress);

    const tokenId = 2;

    const tokenURI = await kwolfNFT.tokenURI(tokenId);
    console.log("Token URI:", tokenURI);

    const owner = await kwolfNFT.ownerOf(tokenId);
    console.log("Owner of token:", owner);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
