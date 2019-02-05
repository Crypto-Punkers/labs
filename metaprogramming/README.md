# Typescript Metaprogramming

This project is a result of research to understand Typescript metaprogramming capabilities. Resulting in showcase that Typescript Types are Turing Complete.

We showcase this by first simulating Addition and Substraction in [`math.ts`](./src/math.ts) and moving further into a more complext algorithm. Inside [`brackets.ts`](./src/brackets.ts) we run an algorith to detect whether a given bracket statement is valid or not.

For example `()(()())` is valid while `()())(` is not.

# Run the example

The best way to explore the examples is to use Visual Studio Code which can show you the result of each Type by hovering above it, as well as highlighting wrong results.

Otherwise you can use `tsc` to verify that it compiles:

```bash
yarn install
yarn build
```
