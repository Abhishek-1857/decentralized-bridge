// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BridgeEthImport{

    function mint(address from,address to, uint amount,uint otherChainNonce,bytes calldata signature) external
    {}
}

contract ServiceManagerEth{
    BridgeEthImport BE;
    uint total_services=2;
    mapping(address=>uint) service_count;
    uint count;
    constructor(address _Eth){
        BE=BridgeEthImport(_Eth);
    }

function recieved(address from, address to, uint amount,uint nonce,bytes calldata signature) external
{
count++;
service_count[from]=count;
if(service_count[from]>1)
{
    BE.mint(from, to, amount, nonce, signature);
    count=0;
}
}

}