// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, Ownable {
    using Strings for uint256;

    uint256 public currentTokenId;

    // Contract creation time
    uint256 public immutable creationTime;

    // Minting period - 24 hours
    uint256 public constant MINT_PERIOD = 1 days;

    // Minting fee - 0.001 ETH
    uint256 public constant MINT_FEE = 0.001 ether;

    // Fee receiver address
    address public feeReceiver;

    // Base URI for token metadata
    string private _baseTokenURI;

    constructor(
        address _feeReceiver,
        string memory baseURI,
        address initialOwner //
    ) ERC721("Basevatar", "Basevatar") Ownable(initialOwner) {
        creationTime = block.timestamp;
        feeReceiver = _feeReceiver;
        _baseTokenURI = baseURI;
    }

    function mint(address recipient) public payable returns (uint256) {
        // Check if minting is still active
        require(
            block.timestamp <= creationTime + MINT_PERIOD,
            "Minting period has ended - minting is only allowed within 24 hours after contract creation"
        );

        // Check if the minting fee has been paid
        require(msg.value >= MINT_FEE, "Insufficient payment: 0.001 ETH required");

        uint256 newItemId = ++currentTokenId;
        _safeMint(recipient, newItemId);

        // Send the fee to the feeReceiver
        (bool success, ) = feeReceiver.call{value: MINT_FEE}("");
        require(success, "Fee transfer failed");

        // Refund excess payment
        uint256 excess = msg.value - MINT_FEE;

        if (excess > 0) {
            (bool refundSuccess, ) = msg.sender.call{value: excess}("");
            require(refundSuccess, "Refund failed");
        }

        return newItemId;
    }

    // Override the _baseURI function to return the base URI
    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        require(ownerOf(tokenId) != address(0), "ERC721Metadata: URI query for nonexistent token");

        string memory currentBaseURI = _baseTokenURI;
        return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, tokenId.toString())) : "";
    }

    // This function allows the contract owner to change the fee receiver address
    function setFeeReceiver(address _newFeeReceiver) public onlyOwner {
        feeReceiver = _newFeeReceiver;
    }

    // Function to get the minting deadline
    function mintDeadline() public view returns (uint256) {
        return creationTime + MINT_PERIOD;
    }

    // Function to check if minting is still active
    function isMintingActive() public view returns (bool) {
        return block.timestamp <= creationTime + MINT_PERIOD;
    }
}
