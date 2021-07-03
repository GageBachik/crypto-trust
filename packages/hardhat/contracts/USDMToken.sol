// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDMToken is ERC20 {
    constructor() ERC20("USDMToken", "USDM") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }
}
