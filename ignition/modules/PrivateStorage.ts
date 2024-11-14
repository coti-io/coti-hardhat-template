// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PrivateStorageModule = buildModule("PrivateStorageModule", (m) => {
  const privateStorage = m.contract("PrivateStorage", [], {});

  return { privateStorage };
});

export default PrivateStorageModule;
