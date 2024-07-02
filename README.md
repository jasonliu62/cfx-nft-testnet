# KwolfNFT Marketplace

This project is a Solidity smart contract for managing an NFT marketplace using the ERC721 standard. The smart contract allows minting, listing, buying, and canceling NFTs. This repository also includes scripts for interacting with the smart contract using Hardhat.

## Prerequisites

- Node.js
- npm
- Hardhat
- local meta service
- ngork

## Setup

1. Clone the repository:

```bash
git clone https://github.com/your-repo/kwolfnft-marketplace.git
cd kwolfnft-marketplace
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add the following environment variables:

```.env
PRIVATE_KEY=your_private_key
ENDPOINT=your_rpc_endpoint
CONTRACT_ADDRESS=your_contract_address
```

Replace your_private_key, your_rpc_endpoint, and your_contract_address with your actual private key, RPC endpoint, and deployed contract address.

## Deploying the Contract

To deploy the contract, you can use the following Hardhat script. Make sure to update the deployment script if necessary.

```bash
npx hardhat run scripts/deploy.js --network espaceTestnet
```

## Interacting with the Contract

Mint:

```bash
npx hardhat run scripts/mint.js --network espaceTestnet
```

List, query, cancel...



