/**
 * @file TrustFund.sol
 * @author gagebachik <loser#gagebachik.com>
 * @date created 21 June 2021
 * @date last modified 4th July 2021
 */
 
//SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// import {ILendingPool, IprotocolDataProvider} from "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";

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

    AggregatorV3Interface internal priceFeed;

    //import aave contracts
    // ILendingPool constant lendingPool = ILendingPool(address(0x8dff5e27ea6b7ac08ebfdf9eb090f32ee9a30fcf)); // Polygon
    // IProtocolDataProvider constant dataProvider = IProtocolDataProvider(address(0x7551b5D2763519d4e37e8B81929D336De671d46d)); // Polygon
    //end
    
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
        priceFeed = AggregatorV3Interface(0xAB594600376Ec9fD91F8e885dADF0CE036862dE0);
    }


    // aave base functions

    // function depositCollateral(address asset, uint256 amount, bool isPull) public onlyOwner{
    //     if (isPull) {
    //         IERC20(asset).safeTransferFrom(msg.sender, address(this), amount);
    //     }
    //     IERC20(asset).safeApprove(address(lendingPool), amount);
    //     lendingPool.deposit(asset, amount, address(this), 0);
    // }

    // function withdrawCollateral(address asset) public onlyOwner{
    //     (address aTokenAddress,,) = dataProvider.getReserveTokensAddresses(asset);
    //     uint256 assetBalance = IERC20(aTokenAddress).balanceOf(address(this));
    //     lendingPool.withdraw(asset, assetBalance, owner);
    // }

    // aave functions end

    function getThePrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
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
        // uint256 maticPrice = uint256(getThePrice());
        // console.log(maticPrice);
        for (uint256 i = 0; i < currentTokens.length; i++) {
            console.log('currbalances', currBalances[i]);
            // if ( i == 0){
            //     currBalances[i] = t.balances[currentTokens[i]] * uint256(getThePrice());
            // }else {
                currBalances[i] = t.balances[currentTokens[i]];
            // }
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
    
    function safetyWithdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    fallback() external payable{
        console.log('fallback');
        // emit Log(gasleft());
    }

}