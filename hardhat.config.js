require("@nomicfoundation/hardhat-toolbox");
const dotenv = require('dotenv')
dotenv.config()

require('./tasks/deploy')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID ?? ''}`,
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC ?? ''
      }
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY
    }
  },
}
