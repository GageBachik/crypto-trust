/**
 * @file TrustFund.sol
 * @author gagebachik <loser#gagebachik.com>
 * @date created 21 June 2021
 * @date last modified 22th June 2021
 */
 
//SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "./lib/SafeMath.sol";
import "./lib/Address.sol";
import "./lib/EnumerableMap.sol";

contract TrustFundManager {
    using Address for address payable;
    using SafeMath for uint256;
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    
    EnumerableMap.UintToAddressMap private activeBeneficiaries;
    mapping(address => Trust) private trustFunds;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public tokens;

    uint256 public totalTrusts;
    uint256 public totalTokens = 1;
    
    event TrustCreated(address beneficiary, uint256 timelock);
    event TrustWithdrawn(address beneficiary);
    
    struct Trust {
        bool active;
        uint256 key;
        uint256 timelock;
        uint256[] tokenKeys;
        uint256[] balances;
    }
    
    function addToken(address _token) public{
        if(tokens[_token] == 0){
            tokens[_token] = totalTokens;
            totalTokens.add(1);
        }
    }    
    
    // function removeToken(address _token) public{
    //     for (uint256 i = 0; i < activeTokens.length(); i++) {
    //         address currToken = activeTokens.get(i);
    //         if (currToken == _token) {
    //             activeTokens.remove(i);
    //             totalTokens = totalTokens.sub(1);
    //         }
    //     }
    // }
    
    function getBankBalance(address _token) public view returns(uint256){
        return balances[_token];
    }    
    
    // function getTrustBalance(address _token, address _beneficiary) public view returns(uint256){
    //     Trust storage currentTrust = trustFunds[_beneficiary];
    //     return currentTrust.balances[_token];
    // }
    
    function deposit(address _token, address _beneficiary) public payable{
        // require(trustFunds[_beneficiary] == null, "You already setup a fund");
        Trust storage t = trustFunds[_beneficiary]; // TODO: handle trust not existing

        t.tokenKeys.push(tokens[_token]);
        t.balances.push(uint256(0).add(msg.value));

        balances[_token] = balances[_token].add(msg.value);
    }
    
    function createTrust(address _beneficiary, uint256 _timelock) public{
        Trust storage t = trustFunds[_beneficiary];
        t.active = true;
        t.timelock = _timelock;
        totalTrusts = totalTrusts.add(1);
        t.key = totalTrusts;
        activeBeneficiaries.set(totalTrusts, _beneficiary);
        
        emit TrustCreated(_beneficiary, _timelock);
    }
    
    function getActiveTrust(address _beneficiary) view public returns(address, uint256, uint256[] memory, uint256[] memory) {
        Trust storage t = trustFunds[_beneficiary];
        return (_beneficiary, t.timelock, t.tokenKeys, t.balances);
    }
    
    // pulling arrays is solidity sucks (dog waterrrrr)
    // function getActiveTrusts() public{
    //   Trust[] storage allTrusts;
    //   for (uint256 i = 0; i < activeBeneficiaries.length(); i++) {
    //       Trust storage t = trustFunds[activeBeneficiaries.get(i)];
    //       allTrusts.push(t);
    //   }
    //   return (allTrusts);
    // }
    
    function withdrawTrust(address _beneficiary) public{
        require(_beneficiary == msg.sender, "You're not the beneficiay of this trust");
        Trust storage t = trustFunds[_beneficiary];
        require(block.timestamp > t.timelock, "Trust not mature yet.");
        require(t.active == false, "Trust already payed out.");

        activeBeneficiaries.remove(t.key);
        t.active = false;

        address payable payee = payable(msg.sender);
        //fix withdraw
        // for (uint256 i = 0; i < activeTokens.length(); i++) {
        //     address currToken = activeTokens.get(i);
        //     payee.sendValue(t.balances[currToken]);
        // }
        
        emit TrustWithdrawn(_beneficiary);
    }
}