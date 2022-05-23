// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BridgeEth{
    address public owner;
    string name;
    string symbol;
    uint Total_Supply;
      uint public nonce;
       mapping(address => mapping(uint => bool)) public processedNonces;
    mapping(address=>uint) public balances;
    mapping(address=>uint) public ServiceCount;
    uint count=0;
    uint total_services=4;
      
      //  mapping(address => mapping(uint => bool)) public processedNonces;
   
  event TransferBurnEth(
    address from,
    address to,
    uint amount,
    uint date,   
    uint nonce,
    bytes signature
  );

  event TransferMintEth(
    address from,
    address to,
    uint amount,
    uint date,
    uint nonce,
    bytes signature
  );

    constructor(uint _Supply)
    {
        name="EthToken";
        symbol="ETH";
        Total_Supply=_Supply;
        owner=msg.sender;
        balances[owner]=Total_Supply;
    }
    function getBalance(address _address) public view returns(uint){
      return balances[_address];
    }
    function transfer(address to,uint amount)payable external{
      balances[msg.sender]-=amount;
      balances[to]+=amount;
    }
    function burn(address to,uint amount,bytes calldata signature) external {
    
        balances[msg.sender]-=amount;

         emit TransferBurnEth(
      msg.sender,
      to,
      amount,
      block.timestamp,
      nonce,
      signature
    );
  nonce++;
    }

     function mint(address from,address to, uint amount,uint otherChainNonce,bytes calldata signature) internal {
    bytes32  message = prefixed(keccak256(abi.encodePacked(
      from, 
      to, 
      amount
    )));
     require(recoverSigner(message, signature) == from , 'wrong signature');
  require(processedNonces[from][otherChainNonce] == false, 'transfer already processed');
    processedNonces[from][otherChainNonce] = true;
    
    balances[to]+=amount;
    emit TransferMintEth(
      from,
      to,
      amount,
      block.timestamp,
      otherChainNonce,
      signature
    );
  }
   function prefixed(bytes32 hash) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(
      '\x19Ethereum Signed Message:\n32', 
      hash
    ));
  }

  function recoverSigner(bytes32 message, bytes memory sig)
    internal
    pure
    returns (address)
  {
    uint8 v;
    bytes32 r;
    bytes32 s;
  
    (v, r, s) = splitSignature(sig);
  
    return ecrecover(message, v, r, s);
  }

  function splitSignature(bytes memory sig)
    internal
    pure
    returns (uint8, bytes32, bytes32)
  {
    require(sig.length == 65);
  
    bytes32 r;
    bytes32 s;
    uint8 v;
  
    assembly {
        // first 32 bytes, after the length prefix
        r := mload(add(sig, 32))
        // second 32 bytes
        s := mload(add(sig, 64))
        // final byte (first byte of the next 32 bytes)
        v := byte(0, mload(add(sig, 96)))
    }
  
    return (v, r, s);
  }


function recieved(address from,address to, uint amount,uint comingnonce,bytes calldata signature) external {
 count++;
ServiceCount[from]=count;
if(ServiceCount[from]>total_services/2)
{
  mint(from,to,amount,comingnonce,signature);
   count=0;
}

  
  }
}
