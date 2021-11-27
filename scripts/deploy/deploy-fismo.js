const hre = require("hardhat");
const ethers = hre.ethers;

/**
 * Deploy Fismo
 *
 * Reused between deployment script and unit tests for consistency
 *
 * @param owner - the owner address
 * @param gasLimit - gasLimit for transactions
 *
 * @returns {Promise<(*|*|*)[]>}
 *
 * @author Cliff Hall <cliff@futurescale.com> (https://twitter.com/seaofarrows)
 */
async function deployFismo(owner, gasLimit) {

    // Deploy Fismo
    const fismoArgs = [owner]
    const Fismo = await ethers.getContractFactory("Fismo");
    const fismo = await Fismo.deploy(...fismoArgs, {gasLimit});
    await fismo.deployed();

    // Return Fismo, its constructor args, and the guards
    return [fismo, fismoArgs];

}

if (require.main === module) {
    deployFismo()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error)
            process.exit(1)
        })
}

exports.deployFismo = deployFismo;