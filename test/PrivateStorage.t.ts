import hre from "hardhat"
import { expect } from "chai"
import { setupAccounts } from "../scripts/utils/accounts"
import { itUint } from "@coti-io/coti-ethers"

const GAS_LIMIT = 12000000

describe("PrivateStorage", function () {
  async function deployPrivateStorage() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await setupAccounts()

    const PrivateStorage = await hre.ethers.getContractFactory("PrivateStorage");
    const privateStorage = await PrivateStorage
      .connect(owner)  
      .deploy({ gasLimit: GAS_LIMIT })
    
    await privateStorage.waitForDeployment()

    return { privateStorage, owner, otherAccount }
  }

  describe("Deployment", function () {
    it("Should set the value of the encrypted number", async function () {
      const { privateStorage, owner } = await deployPrivateStorage();

      const itValue = await owner.encryptValue(
        123n,
        await privateStorage.getAddress(),
        privateStorage.setPrivateNumber.fragment.selector
      ) as itUint

      await (
        await privateStorage
          .connect(owner)
          .setPrivateNumber(itValue, { gasLimit: GAS_LIMIT })
      ).wait()

      const ctValue = await privateStorage.privateNumber()

      const decryptedValue = await owner.decryptValue(ctValue)

      expect(decryptedValue).to.eq(123n)
    });
  });
});
