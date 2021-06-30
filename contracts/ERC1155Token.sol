// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./IERC1155Token.sol";

contract ERC1155Token is Ownable, ERC1155 {
    using Counters for Counters.Counter;

    // tokenId tracker using lib
    Counters.Counter private _tokenIdTracker;

    string public name;
    string public symbol;

    mapping(uint256 => string) public ipfsHashes;

    // "https://game.example/api/item/223.json"
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri
    ) public ERC1155(_uri) {
        name = _name;
        symbol = _symbol;
    }

    function mint(
        address _beneficiary,
        uint256 _value,
        string memory _uri
    ) public onlyOwner() returns (uint256) {
        require(_beneficiary != address(0), "caller cannot be zero address");
        require(_value != 0, "value cannot be zero");

        // increment the tokenId
        _tokenIdTracker.increment();

        uint256 _id = _tokenIdTracker.current();

        _mint(_beneficiary, _id, _value, "");
        _setURI(_id, _uri);
        return _id;
    }

    function batchMint(
        address _to,
        uint256 _idsQuantity,
        uint256[] memory _quantities,
        string[] memory _uris
    ) public onlyOwner() {
        require(_to != address(0), "caller cannot be zero address");
        require(
            _idsQuantity == _quantities.length && _idsQuantity == _uris.length,
            "ids quantity must be equal to _quantities & _uris"
        );

        uint256[] memory _ids = new uint256[](_idsQuantity);

        for (uint256 i = 0; i < _idsQuantity; i++) {
            // increment the tokenId
            _tokenIdTracker.increment();

            uint256 _id = _tokenIdTracker.current();

            _ids[i] = _id;
            _setURI(_id, _uris[i]);
        }
        _mintBatch(_to, _ids, _quantities, "");
    }

    function _setURI(uint256 _tokenId, string memory _uri) internal {
        ipfsHashes[_tokenId] = _uri;
    }
}
