const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    const contractAddress = process.env.contractAddress;
    const KwolfNFT = await ethers.getContractFactory("KwolfNFT");
    const nft = KwolfNFT.attach(contractAddress);

    const tokenID = 1; // Replace with your token ID
    const price = ethers.utils.parseEther("1.0");
    const tx = await nft.listNFT(tokenID, price);
    await tx.wait();

    console.log(`NFT with ID ${tokenID} listed for ${ethers.utils.formatEther(price)} ETH`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
