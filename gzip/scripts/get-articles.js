module.exports = function(callback) {
  const { promisify } = require("util");
  const zlib = require("zlib");
  const inflate = promisify(zlib.inflate);

  const Example = artifacts.require("./Example.sol");

  (async () => {
    const instance = await Example.deployed();

    /*
     * inArray()
     */
    const inArrayEvent = (await instance.getPastEvents("ArticleAddedInArray", {
      fromBlock: 0
    })).pop();
    const inArrayArticle = await instance.articleArray(inArrayEvent.args.id);

    /*
     * inEvent()
     */
    const inEventEvent = (await instance.getPastEvents("ArticleAddedInEvent", {
      fromBlock: 0
    })).pop();
    const inEventArticle = inEventEvent.args.content;

    /*
     * inTransaction()
     */
    const inTransactionEvent = (await instance.getPastEvents(
      "ArticleAddedInTransaction",
      { fromBlock: 0 }
    )).pop();
    const web3 = Example.web3;
    const inTransactionTx = await web3.eth.getTransaction(
      inTransactionEvent.transactionHash
    );
    const inTransactionData = inTransactionTx.input;
    // Length padded to 8 bytes of data
    const articleLength = parseInt(inTransactionData.slice(-16), 16);
    const inTransactionArticle = (await inflate(
      Buffer.from(inTransactionData.slice(-16 - articleLength, -16), "hex")
    )).toString();

    /*
     * Results
     */
    if (
      !(
        inArrayArticle == inEventArticle &&
        inEventArticle == inTransactionArticle
      )
    ) {
      throw new Error("Article mismatch");
    }

    console.log(
      `Articles match, first 100 characters: ${inTransactionArticle.substr(
        0,
        100
      )}`
    );
  })()
    .then(callback)
    .catch(callback);
};
