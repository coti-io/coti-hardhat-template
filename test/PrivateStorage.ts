import hre from "hardhat";
import { expect } from "chai";
import { setupAccounts } from "./utils/accounts";
import { itUint } from "@coti-io/coti-ethers";

describe("PrivateStorage", function () {
  async function deployPrivateStorage() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await setupAccounts();

    const PrivateStorage = await hre.ethers.getContractFactory("PrivateStorage");
    const privateStorage = await PrivateStorage.deploy();

    await privateStorage.waitForDeployment()

    return { privateStorage, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the value of the encrypted number", async function () {
      const { privateStorage, owner } = await deployPrivateStorage();

      const itValue = await owner.encryptValue(
        123n,
        await privateStorage.getAddress(),
        privateStorage.setPrivateNumber.fragment.selector
      ) as itUint

      await (await privateStorage.setPrivateNumber(itValue)).wait()

      const ctValue = await privateStorage.privateNumber()

      const decryptedValue = await owner.decryptValue(ctValue)

      expect(decryptedValue).to.eq(123n)
    });
  });
});
