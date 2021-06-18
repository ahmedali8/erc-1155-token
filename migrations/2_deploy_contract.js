var Petshop = artifacts.require("Petshop");

module.exports = async function (deployer, _network, [owner]) {
  // https://ipfs.io/ipfs/${hash}
  await deployer.deploy(Petshop, "Petshop", "PET", "https://ipfs.io/ipfs/", {
    from: owner,
  });
};
