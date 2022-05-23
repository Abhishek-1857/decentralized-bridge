async function main() {

	const [deployer] = await ethers.getSigners();

	console.log(
	"Deploying contracts with the account:",
	deployer.address
	);

	console.log("Account balance:", (await deployer.getBalance()).toString());

	const HelloWorld = await ethers.getContractFactory("BridgeBsc");
	const contract = await HelloWorld.deploy(0);

	console.log("BridgeBsc contract deployed at:", contract.address);

	// const Contract= await ethers.getContractFactory("ServiceManagerBsc");
	// const contract2=await Contract.deploy(contract1.address)
	// console.log("ServiceManagerBsc contract deployed at:", contract2.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
	console.error(error);
	process.exit(1);
  });
