import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv"
dotenv.config()

const config: HardhatUserConfig = {
  defaultNetwork: "coti-testnet",
  solidity: {
    version: "0.8.19",
    settings: {
      evmVersion: "paris"
    }
  },
  networks: {
    "coti-testnet": {
      url: "https://testnet.coti.io/rpc",
      chainId: 7082400,
      accounts: process.env.SIGNING_KEYS ? process.env.SIGNING_KEYS.split(",") : [],
    },
    "coti-mainnet": {
      url: "https://mainnet.coti.io/rpc",
      chainId: 2632500,
      accounts: process.env.SIGNING_KEYS ? process.env.SIGNING_KEYS.split(",") : [],
    },
  }
};

export default config;
