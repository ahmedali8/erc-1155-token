const ERC1155Token = artifacts.require("ERC1155Token");
const assert = require("chai").assert;
const truffleAssert = require("truffle-assertions");

function toWei(n) {
  return web3.utils.toWei(n, "ether");
}

function FromWei(n) {
  return web3.utils.fromWei(n, "ether").toString();
}

contract("ERC1155Token", ([owner, user, ...accounts]) => {
  let token;

  before(async () => {
    token = await ERC1155Token.new(
      "ERC1155Token",
      "SFT",
      "https://ipfs.io/ipfs/",
      { from: owner }
    );
    // console.log("token > ", token);
  });

  describe("check name and symbol", () => {
    it("check name", async () => {
      assert.equal(await token.name(), "ERC1155Token");
    });

    it("check symbol", async () => {
      assert.equal(await token.symbol(), "SFT");
    });
  });

  describe("owner creates tokens for himself", () => {
    it("creates first token", async () => {
      await token.mint(owner, 10, "ipfs hash 1", { from: owner });
      const balanceOfPet = await token.balanceOf(owner, "1");
      assert.equal(balanceOfPet.toString(), "10");
      const uri = await token.ipfsHashes("1");
      assert.equal(uri.toString(), "ipfs hash 1");
    });

    it("creates five tokens in batch", async () => {
      await token.batchMint(
        owner,
        "5",
        ["10", "20", "2", "4", "50"],
        [
          "ipfs hash 2",
          "ipfs hash 3",
          "ipfs hash 4",
          "ipfs hash 5",
          "ipfs hash 6",
        ],
        {
          from: owner,
        }
      );

      const balanceOfBatch = await token.balanceOfBatch(
        [owner, owner, owner, owner, owner],
        [2, 3, 4, 5, 6]
      );
      assert.equal(balanceOfBatch.toString(), "10,20,2,4,50");

      const uri = await token.ipfsHashes("4");
      assert.equal(uri.toString(), "ipfs hash 4");
    });

    it("should fail creating token by non-owner", async () => {
      await truffleAssert.reverts(
        token.mint(user, 10, "", { from: user }),
        "Ownable: caller is not the owner"
      );
    });
  });
});
