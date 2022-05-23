A Decenralized Bridge between ETH and BSC with multiple services Listening to events from both the chains.

**********************************************************************************************************

To deploy the contracts on both chains run :

npx hardhat run/scripts deployEth.js --network ropsten 
npx hardhat run/scripts deployBsc.js --network bscTestnet

To run services :

node scripts.service.js

To transfer token from ETH to BSC :

node scripts/transferEth.js

To transfer token from BSC to ETH :

node scripts/transferBsc.js

To check balance :

node scripts/BalanceEth.js
node scripts/BalanceBsc.js

**********************************************************************************************************