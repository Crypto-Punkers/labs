module.exports = function(callback) {
  const { promisify } = require("util");
  const zlib = require("zlib");
  const inflate = promisify(zlib.inflate);
  const deflate = promisify(zlib.deflate);
  const loremIpsum = require("lorem-ipsum");

  const ARTICLE = loremIpsum({
    count: 100,
    units: "sentences"
  });

  const Example = artifacts.require("./Example.sol");

  /*
   * Write data to blockchain
   */
  (async () => {
    const instance = await Example.deployed();

    /*
     * inArray()
     */
    const inArrayCost = (await instance.inArray(ARTICLE)).receipt.gasUsed;

    /*
     * inEvent()
     */
    const inEventCost = (await instance.inEvent(ARTICLE)).receipt.gasUsed;

    /*
     * inTransaction()
     */
    const deflatedArticle = (await deflate(ARTICLE)).toString("hex");
    const encodedABI = instance.contract.methods.inTransaction().encodeABI();
    const hexLength = deflatedArticle.length.toString(16).padStart(16, "0");
    const txData = encodedABI + deflatedArticle + hexLength;
    // A bug in truffle-contract makes this impossible  https://github.com/trufflesuite/truffle/issues/1586
    // Using web3 directly
    const web3 = Example.web3;
    const inTransactionCost = (await web3.eth.sendTransaction({
      from: (await web3.eth.getAccounts())[0],
      to: instance.address,
      data: encodedABI,
      gas: 4000000 // Just a big number
    })).gasUsed;

    /*
     * Results
     */
    console.log(`${inArrayCost} gas for storing in array`);
    console.log(`${inEventCost} gas for storing in event`);
    console.log(`${inTransactionCost} gas for storing in transaction`);
  })()
    .then(callback)
    .catch(callback);
};