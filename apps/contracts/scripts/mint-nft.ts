import { ethers } from "hardhat";

async function main() {
    // get the contract address from the environment variable
    const contractAddress = process.env.CONTRACT_ADDRESS as string;

    const [signer] = await ethers.getSigners();
    const recipientAddress = signer.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = NFT.attach(contractAddress);
    const mintFee = ethers.parseEther("0.001");

    console.log(`Minting NFT (${contractAddress}) for recipient: ${recipientAddress}...`);

    // Call the mint function
    const tx = await nft.mint(recipientAddress, { value: mintFee });

    // Wait for the transaction to be confirmed by miners
    const receipt = await tx.wait();

    console.log("NFT successfully minted!");
    console.log("Transaction Hash:", tx.hash);

    if (receipt?.logs) {
        try {
            const transferEvent = nft.interface.parseLog(receipt.logs[0]);
            if (transferEvent && transferEvent.name === "Transfer") {
                console.log("Minted Token ID:", transferEvent.args.tokenId.toString());
            }
        } catch (error) {
            console.log("Token ID could not be extracted from logs, but minting was successful.");
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
