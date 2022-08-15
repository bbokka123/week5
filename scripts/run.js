const main = async () => {
	const domainContractFactory = await hre.ethers.getContractFactory("Domains");
	const domainContract = await domainContractFactory.deploy("boomlabs");
	await domainContract.deployed();
	
	console.log("Contract deployed to:", domainContract.address);

	// 우리는 두 번째 파라미터를 함께 전달하겠습니다. 이건 진짜 돈입니다 돈!
	let txn = await domainContract.register("mark", {value: hre.ethers.utils.parseEther('0.1')});
	await txn.wait();
	
	const address = await domainContract.getAddress("mark");
	console.log("Onwer of domain mark: ", address);

	const balance = await hre.ethers.provider.getBalance(domainContract.address);
	console.log("Contract balance: ", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	}catch(error){
		console.log(error);
		process.exit(1);
	}
};

runMain();