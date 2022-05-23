
const { ethers } = require("hardhat");
const Contract_Address="0xDD72D643D8036d99d5016fC1e50167B82a0e4212"
const Eth_Private_Key="e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"
const bridgeeth=require("../artifacts/contracts/BridgeEth.sol/BridgeEth.json")


const provider=new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/ed2ce2f16b8d4d9ab207346c9ce17dc4`)

const signer=new ethers.Wallet(Eth_Private_Key,provider);
const BridgeEth=new ethers.Contract(Contract_Address,bridgeeth.abi,signer)

async function main() {
    balance= await BridgeEth.getBalance(signer.address)
    console.log(balance.toString())
}
main()