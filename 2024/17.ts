const compose =
  <T, $FReturn, $GReturn, $HReturn>(
    f: (x: T) => $FReturn,
    g: (x: $FReturn) => $GReturn,
    h: (x: $GReturn) => $HReturn,
  ) =>
  (a: T) =>
    h(g(f(a)));

const upperCase = <S extends string>(x: S): Uppercase<S> =>
  x.toUpperCase() as Uppercase<S>;
const lowerCase = <S extends string>(x: S): Lowercase<S> =>
  x.toLowerCase() as Lowercase<S>;
const firstChar = <S extends string>(
  x: S,
): S extends `${infer F}${string}` ? F : never => x[0] as any;
const firstItem = <A extends any[]>(
  x: A,
): A extends [infer First, ...any[]] ? First : never => x[0];
const makeTuple = <T extends string>(x: T): [T] => [x];
const makeBox = <T>(value: T): { value: T } => ({ value });

// ############## Test cases

import type { Equal, Expect } from "type-testing";

const t0 = compose(upperCase, makeTuple, makeBox)("hello!").value[0];
//    ^?
type t0_actual = typeof t0; // =>
type t0_expected = "HELLO!"; // =>
type t0_test = Expect<Equal<t0_actual, t0_expected>>;

const t1 = compose(makeTuple, firstItem, makeBox)("hello!" as const).value;
type t1_actual = typeof t1; // =>
type t1_expected = "hello!"; // =>
type t1_test = Expect<Equal<t1_actual, t1_expected>>;

const t2 = compose(upperCase, firstChar, lowerCase)("hello!");
type t2_actual = typeof t2; // =>
type t2_expected = "h"; // =>
type t2_test = Expect<Equal<t2_actual, t2_expected>>;
