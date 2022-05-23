require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const Private_Key = "e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"
const Bsc_Private_Key="e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"
const ropsten_Private_Key="e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"
const substrate_Private_Key="f9f4045c23367315799ee02ccea04d10f91dee4c882d5c7a696dd85b2edffbd8"

module.exports = {
  solidity: "0.8.0",
  networks: {
  	goerli: {
  		url: `https://goerli.infura.io/v3/ed2ce2f16b8d4d9ab207346c9ce17dc4`,
  		accounts: [`0x${Private_Key}`],  
  	},
    bscTestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [`0x${Bsc_Private_Key}`]    
   },
  ropsten: {
    url: `https://ropsten.infura.io/v3/ed2ce2f16b8d4d9ab207346c9ce17dc4`,
    accounts: [`0x${ropsten_Private_Key}`],  
  }
}
};