// buyNFT.js
const { ethers } = require("hardhat");

async function main() {
    const [buyer] = await ethers.getSigners();
    const contractAddress = process.env.contractAddress;
    const KwolfNFT = await ethers.getContractFactory("KwolfNFT");
    const nft = KwolfNFT.attach(contractAddress);

    const tokenID = 3;
    const listingPrice = ethers.utils.parseEther("1.0"); // Replace with the listing price

    const tx = await nft.connect(buyer).buyNFT(tokenID, { value: listingPrice });
    await tx.wait();

    console.log(`NFT with ID ${tokenID} bought for ${ethers.utils.formatEther(listingPrice)} ETH`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
