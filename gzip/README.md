# Gzip Proof of Concept

Decreasing costs of putting data on blockchain

===

This project is a result of research into how to put articles on the blockchain on the cheap while still allowing to later get an index of all articles and retrieve them.

Three methods are compared.

1. Brute force way of putting article inside the smart-contract array
2. Utilizing Ethereum events, which are cheaper to store than the smart-contract Storage
3. Gzipping the content and appending it into the function call itself

# Run the example

Set-up the environment

```bash
yarn install
```

Then you need to run the simulated blockchain in another window.

```bash
yarn truffle develop
```

Afterwards you can put the Example smart contract on the blockchain, write articles to it and then retrieve their contents back again

```bash
yarn truffle migrate
# Write articles to blockchain
yarn truffle exec scripts/show-costs.js
# Read articles from blockchain
yarn truffle exec scripts/get-articles.js
```

# Example cost difference

```
4697672 gas for storing in array
 532119 gas for storing in event
 153292 gas for storing in transaction
```

That's a **97%** reduction of costs! In other words, we save \$1.18 per **each** article.
