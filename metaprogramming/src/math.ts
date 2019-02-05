type StringBool = "true" | "false";

interface AnyNumber {
  prev?: any;
  isZero: StringBool;
}

type IsZero<TNumber extends AnyNumber> = TNumber["isZero"];
type Next<TNumber extends AnyNumber> = { prev: TNumber; isZero: "false" };
type Prev<TNumber extends AnyNumber> = {
  true: _0;
  false: TNumber["prev"];
}[IsZero<TNumber>];

type _0 = { isZero: "true" };
type _1 = Next<_0>;
type _2 = Next<_1>;
type _3 = Next<_2>;
type _4 = Next<_3>;
type _5 = Next<_4>;
type _6 = Next<_5>;
type _7 = Next<_6>;
type _8 = Next<_7>;
type _9 = Next<_8>;

function forceEquality<T1, T2 extends T1>() {}
function forceTrue<T extends "true">() {}
function forceFalse<T extends "false">() {}

// Doesn't compile
// forceEquality<_1, _0>();
// Does compile
forceEquality<_3, _3>();
forceEquality<_1, Next<_0>>();

type Add<T1 extends AnyNumber, T2 extends AnyNumber> = {
  true: T1;
  false: Add<Next<T1>, Prev<T2>>;
}[IsZero<T2>];

forceEquality<Add<_2, _3>, _5>();
forceEquality<Add<_4, _3>, _7>();

// max(0, T1 - T2)
type Sub<T1 extends AnyNumber, T2 extends AnyNumber> = {
  true: T1;
  false: Sub<Prev<T1>, Prev<T2>>;
}[IsZero<T2>];

forceEquality<Sub<_5, _2>, _3>();
forceEquality<Sub<_5, _5>, _0>();

// Overflow but compiles
forceEquality<Sub<_1, _3>, _0>();

// Substract with overflow detection
interface SafeSubResult<
  TIsOverflow extends StringBool,
  TResult extends AnyNumber
> {
  isOverflowing: TIsOverflow;
  result: TResult;
}
type SafeSub<T1 extends AnyNumber, T2 extends AnyNumber> = {
  true: SafeSubResult<"false", T1>;
  false: {
    true: SafeSubResult<"true", T1>;
    false: SafeSub<Prev<T1>, Prev<T2>>;
  }[IsZero<T1>];
}[IsZero<T2>];

forceEquality<SafeSub<_1, _2>, { isOverflowing: "true"; result: _0 }>();
forceEquality<SafeSub<_3, _2>, { isOverflowing: "false"; result: _1 }>();
