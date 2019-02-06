type IsOpeningBracket<TBracket> = TBracket extends "(" ? "true" : "false";
type EndOfInput<TBracket> = TBracket extends "#" ? "true" : "false";
type Bracket = "(" | ")" | "#";

type State<TNumber extends AnyNumber> = {
  openBrackets: TNumber;
  valid: "true" | "false";
  halt: "true" | "false";
};

type BracketNextState<TInput, TState extends State<any>> = {
  true: {
    openBrackets: TState["openBrackets"];
    valid: TState["valid"];
    halt: "true";
  };
  false: {
    true: {
      openBrackets: Next<TState["openBrackets"]>;
      valid: "false";
      halt: "false";
    };
    false: {
      true: {
        openBrackets: TState["openBrackets"];
        valid: "false";
        halt: "true";
      };
      false: {
        openBrackets: Prev<TState["openBrackets"]>;
        valid: IsZero<Prev<TState["openBrackets"]>>;
        halt: "false";
      };
    }[IsZero<TState["openBrackets"]>];
  }[IsOpeningBracket<TInput>];
}[EndOfInput<TInput>];

type InputType = Bracket[];
type StateType = State<AnyNumber>;
type NextState<TInput, TState extends StateType> = BracketNextState<
  TInput,
  TState
>;
type Run<TInput extends InputType, TState extends StateType> = {
  true: TState;
  false: Run<Tail<TInput>, NextState<Head<TInput>, TState>>;
}[TState["halt"]];

type InitialState = { openBrackets: _0; halt: "false"; valid: "true" };
type validBrackets<TInput extends InputType> = Run<
  TInput,
  InitialState
>["valid"];

function expectTrue<T extends "true">() {}
function expectFalse<T extends "false">() {}
expectTrue<validBrackets<["#"]>>();
expectTrue<validBrackets<["(", ")", "#"]>>();
expectTrue<validBrackets<["(", ")", "(", ")", "#"]>>();
expectFalse<validBrackets<["(", "#"]>>();
expectFalse<validBrackets<[")", "#"]>>();
expectFalse<validBrackets<[")", "(", "#"]>>();
expectFalse<validBrackets<["(", ")", "(", "#"]>>();
