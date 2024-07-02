// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct NFTListing {
    uint256 price;
    address seller;
}

contract KwolfNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    mapping(uint256 => NFTListing) private _listings;

    event NFTTransfer(uint256 tokenID, address from, address to, string tokenURI, uint256 price);

    constructor() ERC721("KwolfNFT", "kNFT") Ownable(msg.sender) {}

    function mint(address _to, string calldata _uri) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(_to, tokenId);
        _setTokenURI(tokenId, _uri);
        emit NFTTransfer(tokenId, address(0), msg.sender, tokenURI, 0);
        return tokenId;
    }

    function listNFT(uint256 tokenID, uint256 price) public {
        require(price > 0, "KwolfNFT: price must be greater than 0");
        transferFrom(msg.sender, address(this), tokenID);
        _listings[tokenID] = NFTListing(price, msg.sender);
        emit NFTTransfer(tokenID, msg.sender, address(this), "", price);
    }

    function buyNFT(uint256 tokenID) public payable {
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "KwolfNFT: nft not listed for sale");
        require(msg.value == listing.price, "KwolfNFT: incorrect price");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        payable(listing.seller).transfer((listing.price * 95) / 100);
        emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    function cancelListing(uint256 tokenID) public {
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "KwolfNFT: nft not listed for sale");
        require(listing.seller == msg.sender, "KwolfNFT: you're not the seller");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    function clearListing(uint256 tokenID) private {
        _listings[tokenID].price = 0;
        _listings[tokenID].seller = address(0);
    }
}
