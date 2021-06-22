const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const { BigNumber } = require("@ethersproject/bignumber");

use(solidity);

describe("Trust Fund Dapp", function () {
  const provider = new ethers.providers.JsonRpcProvider();
  let trustFundManager;

  describe("TrustFundManager", function () {
    it("Should deploy TrustFundManager", async function () {
      const TrustFundManager = await ethers.getContractFactory(
        "TrustFundManager"
      );

      trustFundManager = await TrustFundManager.deploy();
    });

    describe("getTotalTrusts", function () {
      it("Should be able to get init amount of trusts made", async function () {
        const totalTrusts = await trustFundManager.totalTrusts();
        expect(await trustFundManager.totalTrusts()).to.be.equal(
          BigNumber.from(0)
        );
      });
    });

    describe("createTrust", function () {
      it("Should be able to make a trust fund", async function () {
        const block = await provider.getBlock(provider.getBlockNumber());
        await trustFundManager.createTrust(
          "0x28B83f82DCeE386a136672064b39FA0cD083B630",
          block.timestamp
        );
        expect(await trustFundManager.totalTrusts()).to.be.equal(
          BigNumber.from(1)
        );
      });
    });
  });
});
