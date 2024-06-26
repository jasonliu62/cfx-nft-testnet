// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyContract is ERC721 {
    address private owner;

    constructor() ERC721("MyCollectible", "MCO") public {
        owner = msg.sender;
    }

    //exposing the safe mint functionality
    function safeMint(address to, uint256 tokenId) public {
        require(msg.sender == owner, "NFTBase: Only owner can mint");
        _safeMint(to, tokenId);
    }

    function safeMint(address to, uint256 tokenId, bytes calldata _data) public {
        require(msg.sender == owner, "NFTBase: Only owner can mint");
        _safeMint(to, tokenId, _data);
    }

}
