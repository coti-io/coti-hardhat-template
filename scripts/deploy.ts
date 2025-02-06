import hre from "hardhat"
import { setupAccounts } from "./utils/accounts"

async function main() {
    const [owner, otherAccount] = await setupAccounts()

    const PrivateStorageFactory = await hre.ethers.getContractFactory("PrivateStorage")

    const privateStorage = await PrivateStorageFactory
        .connect(owner)
        .deploy()
    
    await privateStorage.waitForDeployment()

    console.log("Contract address: ", await privateStorage.getAddress())
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})