// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LandToken is ERC721, Ownable {
    uint256 private tokenIdCounter;
    mapping(uint256 => uint256) public landIdToTokenId;
    mapping(uint256 => address) public landIdToSeller;
    
    struct propTransfer {
        address from;
        address to;
        uint256 timestamp;
    }
    mapping(uint256 => propTransfer[]) private tokenTransfers;
    
    event LandTokenPurchased(address indexed buyer, uint256 landId, uint256 tokenId);
    event LandTokenTransfer(address indexed from, address indexed to, uint256 landId, uint256 tokenId);

    constructor()
        ERC721("LandToken", "Land")
        Ownable(0xE45906e02C97CD21Ddde013f778d7e04A2F4A88B)
    {}
    address ow = 0xE45906e02C97CD21Ddde013f778d7e04A2F4A88B;


    function mintLandToken(address _owner, uint256 _landId) external onlyOwner returns (uint256) {
        require(_owner != address(0), "Invalid owner address");
        require(landIdToTokenId[_landId] == 0, "Land already has a token");
        require(_owner == ow, "not owner");

        tokenIdCounter++;
        uint256 newTokenId = tokenIdCounter;
        _mint(_owner, newTokenId);
        landIdToTokenId[_landId] = newTokenId;
        landIdToSeller[_landId] = _owner;

        return newTokenId;
    }

    function buyLandToken(uint256 _landId) external payable {
        require(landIdToTokenId[_landId] != 0, "Land token does not exist");
        require(msg.value > 0, "Ether value must be greater than zero");
        require(msg.sender != landIdToSeller[_landId], "You cannot buy your own land");

        address seller = landIdToSeller[_landId];
        uint256 tokenId = landIdToTokenId[_landId];

        // Store transfer information
        tokenTransfers[tokenId].push(propTransfer({
            from: seller,
            to: msg.sender,
            timestamp: block.timestamp
        }));

        // Transfer token ownership to buyer
        _transfer(seller, msg.sender, tokenId);

        // Transfer ether to seller
        payable(seller).transfer(msg.value);

        // Emit event
        emit LandTokenPurchased(msg.sender, _landId, tokenId);
        emit LandTokenTransfer(seller, msg.sender, _landId, tokenId);
    }

    function getTokenTransfers(uint256 _tokenId) external view returns (propTransfer[] memory) {
        return tokenTransfers[_tokenId];
    }
}
