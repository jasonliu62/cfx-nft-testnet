require("@nomiclabs/hardhat-waffle");
require('dotenv').config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    espaceTestnet: {
      chainId: 71,
      url: process.env.ENDPOINT,
      accounts:
          process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
};
