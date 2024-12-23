import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv"
dotenv.config()

const config: HardhatUserConfig = {
  defaultNetwork: "testnet",
  solidity: "0.8.19",
  networks: {
    testnet: {
      url: "https://testnet.coti.io/rpc",
      chainId: 7082400,
      accounts: process.env.SIGNING_KEYS ? process.env.SIGNING_KEYS.split(",") : [],
    },
  },
  mocha: {
    timeout: 100000000
  },
};

export default config;
