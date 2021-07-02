/**
 * @file TrustFund.sol
 * @author gagebachik <loser#gagebachik.com>
 * @date created 21 June 2021
 * @date last modified 22th June 2021
 */
 
//SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TrustFundManager is Ownable{
    using Address for address payable;

    // variables for dev -- remove in production
    uint256 public totalTrusts;
    // end

    address public chainTokenAddress = address(0x0);
    uint256 public chainTokenBalance;
    address[] public tokenList;

    mapping(address => Trust) private trustFunds;
    mapping(address => uint256) public balances;

    
    event TrustCreated(address beneficiary, uint256 timelock);
    event TrustWithdrawn(address beneficiary);
    
    struct Trust {
        bool active;
        uint256 timelock;
        uint256 chainTokenBalance;
        address[] tokensList;
        mapping(address => uint256) tokens;
        mapping(address => uint256) balances;
    }
    
    constructor(){
        tokenList.push(chainTokenAddress);
        balances[chainTokenAddress] = 0;
    }
    
    function getBankBalance() public view returns(address[] memory,uint256[] memory){
        address[] memory currentTokens = tokenList;
        uint256[] memory allBalances = new uint256[](currentTokens.length);
        // allBalances[0] = chainTokenBalance;
        for (uint256 i = 0; i < currentTokens.length; i++) {
            allBalances[i] = balances[currentTokens[i]];
        }
        return (currentTokens, allBalances);
    }    
    
    function deposit(address _token, address _beneficiary, uint256 _amount) public payable{
        Trust storage t = trustFunds[_beneficiary];
        if (_token == chainTokenAddress) {
            t.balances[_token] += msg.value;
        }else {
            IERC20(_token).transfer(address(this), _amount);
            if(t.tokens[_token] == 0){
                t.tokensList.push(_token);
                t.tokens[_token] = 1;
            }
            t.balances[_token] += _amount;
        }
    }
    
    function createTrust(address _beneficiary, uint256 _timelock) public{
        Trust storage t = trustFunds[_beneficiary];
        require(t.timelock == 0, "You Already Have A Trust");
        t.active = true;
        console.log('timelock', _timelock);
        t.timelock = _timelock;
        t.tokensList.push(chainTokenAddress);
        totalTrusts++;
        emit TrustCreated(_beneficiary, _timelock);
    }
    
    function getActiveTrust(address _beneficiary) view public returns(address, uint256, address[] memory, uint256[] memory) {
        Trust storage t = trustFunds[_beneficiary];
        address[] memory currentTokens = t.tokensList;
        uint256[] memory currBalances = new uint256[](currentTokens.length);
        // currBalances[0] = t.chainTokenBalance;
        for (uint256 i = 0; i < currentTokens.length; i++) {
            console.log('currbalances', currBalances[i]);
            currBalances[i] = t.balances[currentTokens[i]];
        }
        return (_beneficiary, t.timelock, currentTokens, currBalances);
    }
    
    function withdrawTrust(address _beneficiary) public{
        require(_beneficiary == msg.sender, "You're not the beneficiay of this trust");
        Trust storage t = trustFunds[_beneficiary];
        require(block.timestamp > t.timelock, "Trust not mature yet.");
        require(t.active == true, "Trust already payed out.");

        t.active = false;
        t.timelock = 0;

        address payable payee = payable(msg.sender);

        uint256 amount = t.balances[chainTokenAddress]; 
        t.balances[chainTokenAddress] = 0;
        payee.transfer(amount);

        for (uint256 i = 1; i < t.tokensList.length; i++) {
            address currToken = t.tokensList[i];
            uint256 total = t.balances[currToken];
            t.balances[currToken] = 0;
            IERC20(currToken).transferFrom(address(this), payee, total);
        }
        
        emit TrustWithdrawn(_beneficiary);
    }
}