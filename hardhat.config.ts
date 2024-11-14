import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv"
dotenv.config()

const config: HardhatUserConfig = {
  defaultNetwork: "devnet",
  solidity: "0.8.19",
  networks: {
    devnet: {
      url: "https://devnet.coti.io/rpc",
      chainId: 13068200,
      accounts: process.env.SIGNING_KEYS ? process.env.SIGNING_KEYS.split(",") : []
    },
  }
};

export default config;
