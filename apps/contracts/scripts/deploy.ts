import { ethers } from "hardhat";

async function main() {
    //
    const [deployer] = await ethers.getSigners();

    const feeReceiverAddress = process.env.FEE_RECEIVER_ADDRESS;
    const baseURI = process.env.BASE_URI || "https://basevatar.vercel.app/api/metadata/";
    const initialOwner = deployer.address;

    console.log("Deploying NFT contract with the following parameters:");
    console.log("  Fee Receiver:", feeReceiverAddress);
    console.log("  Base URI:", baseURI);
    console.log("  Initial Owner:", initialOwner);

    // Deploy the contract - send all necessary parameters
    const nft = await ethers.deployContract("NFT", [feeReceiverAddress, baseURI, initialOwner]);

    await nft.waitForDeployment();

    console.log("NFT Contract Deployed at " + nft.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
