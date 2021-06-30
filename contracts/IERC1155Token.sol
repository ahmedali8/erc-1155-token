// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IERC1155Token {
    function mint(
        address _beneficiary,
        uint256 _id,
        uint256 _value
    ) external;
}
