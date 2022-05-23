const Private_Key="e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"
const Contract_Address="0xDD72D643D8036d99d5016fC1e50167B82a0e4212"
// const Contract_Address_to="0xf2a6E0CF77AB7Dc47782d149057233342DA059FB"

const { keccak256, arrayify } = require("ethers/lib/utils");
const { ethers } = require("hardhat");



const contract=require("../artifacts/contracts/BridgeEth.sol/BridgeEth.json")


const provider=new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/ed2ce2f16b8d4d9ab207346c9ce17dc4`)


const signer=new ethers.Wallet(Private_Key,provider);

const BridgeEth=new ethers.Contract(Contract_Address,contract.abi,signer)
async function main() {
  const recipient= signer
  
  const from=signer
  const amount=100
  // console.log(from.address)
  // console.log(recipient.address)
  const message= ethers.utils.solidityKeccak256(["address","address","uint"],[from.address,recipient.address,amount]).toString("hex")
  const signature=await signer.signMessage(arrayify(message))
  console.log("Transfering your Assets....")
  const tx=await BridgeEth.burn(recipient.address,amount,signature,{gasLimit:3000000})
  console.log("Wait while transaction is processing....")
  await tx.wait()
  console.log("Transaction processed with Transaction hash ",tx.hash)
  // const balance=await BridgeEth.getBalance(signer.address)
  // console.log(balance)
  // const tx=await BridgeEth.transfer("0x0cAAF9f9e41d3Ef18b308a5DaFe907A189412Da4",100)
  // const bal=await BridgeEth.getBalance("0x0cAAF9f9e41d3Ef18b308a5DaFe907A189412Da4")
  // console.log(bal)
}
main()
