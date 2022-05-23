
const { ethers } = require("hardhat");
const Contract_Address="0x84c2bA776Ad399115a42498Da4B59d084A14B070"
const Bsc_Private_Key="e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"
const bridgeBsc=require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json")


const provider=new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545")

const signer=new ethers.Wallet(Bsc_Private_Key,provider);
const BridgeBsc=new ethers.Contract(Contract_Address,bridgeBsc.abi,signer)

async function main() {
    balance= await BridgeBsc.getBalance(signer.address)
    console.log(balance.toString())
}
main()