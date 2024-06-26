// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("MyContract", "MNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function createNFT() public onlyOwner returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        tokenCounter += 1;
        return newItemId;
    }
}
