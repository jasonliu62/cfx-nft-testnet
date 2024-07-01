const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const kwolfNFTAddress = process.env.CONTRACT_ADDRESS;
    const KwolfNFT = await ethers.getContractFactory("KwolfNFT");
    const kwolfNFT = await KwolfNFT.attach(kwolfNFTAddress);

    const toAddress = deployer.address;
    const tokenURI = "http://localhost:9998/metadata/1"

    const tx = await kwolfNFT.mint(toAddress, tokenURI);
    const receipt = await tx.wait();

    console.log("NFT Minted to self: ", receipt.events[0].args.tokenId.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
