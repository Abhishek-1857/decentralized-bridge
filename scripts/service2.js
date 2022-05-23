const { ethers } = require("hardhat");




const bridgeEth=require("../artifacts/contracts/BridgeEth.sol/BridgeEth.json")
const bridgeBsc=require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json");
const ethService=require("../artifacts/contracts/ServiceManagerEth.sol/ServiceManagerEth.json")
const bscService=require("../artifacts/contracts/ServiceManagerBsc.sol/ServiceManagerBsc.json")


const Contract_Address_Eth="0xDD72D643D8036d99d5016fC1e50167B82a0e4212"
const Contract_Address_Bsc="0x84c2bA776Ad399115a42498Da4B59d084A14B070"
// const Contract_Address_ServiceManagerEth="0x1A906713D3Dc0454E8d6f38c2aC530E4e9e8Af3D"
// const Contract_Address_ServiceManagerBsc="0xD9Ec66d1C697e5D05D4bC69B7Acce27dAc2ECb0C"

const Private_Key = "34a75e2ebd063de6911d6c5478dd7259043beddd7567159a23be99b4021cc651"



const EThProvider=new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/ed2ce2f16b8d4d9ab207346c9ce17dc4`)
const BscProvider=new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545")

const EthSigner=new ethers.Wallet(Private_Key,EThProvider);
const BscSigner=new ethers.Wallet(Private_Key,BscProvider);
// const EthServiceSigner=new ethers.Wallet(Private_Key,EThProvider);
// const BscServiceSigner=new ethers.Wallet(Private_Key,BscProvider);


const BridgeEth=new ethers.Contract(Contract_Address_Eth,bridgeEth.abi,EthSigner)
const BridgeBsc=new ethers.Contract(Contract_Address_Bsc,bridgeBsc.abi,BscSigner)
// const ServiceEth=new ethers.Contract(Contract_Address_ServiceManagerEth,ethService.abi,EthServiceSigner)
// const ServiceBsc=new ethers.Contract(Contract_Address_ServiceManagerBsc,bscService.abi,BscServiceSigner)

async function main()
{
   //  Nonce Manager For BSC Transactions
   let BscbaseNonce = BscProvider.getTransactionCount(BscSigner.getAddress());
   let BscnonceOffset = 0;
   function getNonceBsc() {
     return BscbaseNonce.then((nonce) => (nonce + (BscnonceOffset++)));
   }
   //  Nonce Manager For Eth Transactions
   let EthbaseNonce = EThProvider.getTransactionCount(EthSigner.getAddress());
   let EthnonceOffset = 0;
   function getNonceEth() {
     return EthbaseNonce.then((nonce) => (nonce + (EthnonceOffset++)));
   }

   BridgeEth.on("TransferBurnEth", (from, to, amount,date,nonce,signature,event) => {
       
       async function run(){
           const tx= await BridgeBsc.recieved(from,to,amount,nonce,signature,{nonce:getNonceBsc() ,gasLimit:3000000})
       console.log("Processing ...⏲")
       await tx.wait()
       console.log(" 🎉 Transaction Hash : ",tx.hash)
       console.log(`${ from } sent ${amount } to ${ to}  ETH ===> BSC`);
         }
         run()
   
     });

     BridgeBsc.on("TransferBurnBsc", (from, to, amount,date,nonce,signature,event) => {
       
       async function run(){
           const tx= await BridgeEth.recieved(from,to,amount,nonce,signature,{nonce:getNonceEth() ,gasLimit:3000000})
       console.log("Processing ...⏲")
       await tx.wait()
       console.log(" 🎉 Transaction Hash : ",tx.hash)
       console.log(`${ from } sent ${amount } to ${ to}  BSC ===> ETH`);
         }
         run()
   
     });
}
main()