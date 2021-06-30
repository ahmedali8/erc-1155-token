var ERC1155Token = artifacts.require("ERC1155Token");

module.exports = async function (deployer, _network, [owner]) {
  await deployer.deploy(
    ERC1155Token,
    "ERC1155Token",
    "SFT",
    "https://ipfs.io/ipfs/{id}.json",
    {
      from: owner,
    }
  );
};
