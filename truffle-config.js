/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const path = require("path");
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  // contracts_directory: "./allMyStuff/someStuff/theContractFolder",
  // migrations_directory: "./allMyStuff/someStuff/theMigrationsFolder",
  // contracts_build_directory: path.join(__dirname, "./allMyStuff/someStuff/theContractBuildFolder"),

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    /* ETHEREUM TESTNETS */
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
          providerOrUrl: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        }),
      network_id: "3",
      gas: 5500000,
      skipDryRun: true,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
          providerOrUrl: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        }),
      gas: 5000000,
      network_id: "4",
      skipDryRun: true,
    },
    goerli: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
          providerOrUrl: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        }),
      gas: 5000000,
      network_id: "5",
      skipDryRun: true,
    },
    /* BINANCE SMART CHAIN */
    bscMainnet: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
          providerOrUrl: process.env.BSC_MAINNET_RPC_URL,
        }),
      network_id: "56",
      confirmations: 10,
      timeoutBlocks: 20,
      skipDryRun: true,
    },
    bscTestnet: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
          providerOrUrl: process.env.BSC_TESTNET_RPC_URL,
        }),
      network_id: "97",
      confirmations: 10,
      timeoutBlocks: 20,
      skipDryRun: true,
    },
    /* MATIC L2 */
    maticMainnet: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
          providerOrUrl: process.env.MATIC_MAINNET_RPC_URL,
        }),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    maticTestnet: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
          providerOrUrl: process.env.MATIC_MUMBAI_TESTNET_RPC_URL,
        }),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
  },
  plugins: ["truffle-plugin-verify"],

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  //
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  db: {
    enabled: false,
  },
};
