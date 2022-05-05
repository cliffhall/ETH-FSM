const environments = require('../../environments');
const gasLimit = environments.gasLimit;
const hre = require("hardhat");
const ethers = hre.ethers;
const network = hre.network.name;
const {deployFismo} = require("./deploy-fismo");
const {deployOperator} = require("./deploy-operator");
const {deployExample} = require("./deploy-example");
const {delay, deploymentComplete, verifyOnEtherscan} = require("./report-verify");
const {LockableDoor} = require("../config/lab-examples");

async function main() {

    // Compile everything (in case run by node)
    await hre.run('compile');

    // Deployed contracts
    let contract, contracts = [];

    // Get accounts
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    // Report header
    const divider = "-".repeat(80);
    console.log(`${divider}\n💥 Deploy Fismo and Examples\n${divider}`);
    console.log(`⛓  Network: ${network}\n📅 ${new Date()}`);
    console.log("🔱 Deployer account: ", deployer ? deployer.address : "not found" && process.exit() );
    console.log(divider);

    // Deploy Fismo
    [fismo] = await deployFismo(gasLimit);
    deploymentComplete('Fismo', fismo.address, [], contracts);

    // Deploy basic Operator
    [basicOperator, operatorArgs] = await deployOperator(fismo, gasLimit);
    deploymentComplete('Operator', basicOperator.address, operatorArgs, contracts);

    // Deploy examples
    const examples = [LockableDoor];
    for (const example of examples) {
        console.log(`\n📦 EXAMPLE: ${example.machine.name}`);
        try {
            [operator, operatorArgs, guards, machine] = await deployExample(deployer.address, fismo.address, example, basicOperator, gasLimit);
            console.log(`✅  ${machine.name} machine added to Fismo contract.`);
            if (operator) {
                deploymentComplete(example.operator, operator.address, operatorArgs, contracts);
            } else {
                console.log(`👉 Basic Operator used: ${basicOperator.address}`);
            }
            guards.forEach(guard => deploymentComplete(guard.contractName, guard.contract.address, [], contracts));
        } catch (e) {
            console.log(`❌  ${e}`);
        }
    }

    // Bail now if deploying locally
    if (hre.network.name === 'hardhat') process.exit();

    // Wait a minute after deployment completes and then verify contracts on etherscan
    console.log('⏲ Pause one minute, allowing deployments to propagate to Etherscan backend...');
    await delay(60000).then(
        async () => {
            console.log('🔍 Verifying contracts on Etherscan...');
            while(contracts.length) {
                contract = contracts.shift()
                await verifyOnEtherscan(contract);
            }
        }
    );

    console.log("\n");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });