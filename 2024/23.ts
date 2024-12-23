interface Fn {
  args: unknown;
  arg0: this["args"] extends [infer F, ...unknown[]] ? F : never;
  return: unknown;
}

/** Apply */
type Apply<F extends Fn, A> = (F & { args: [A] })["return"];

/** Capitalize a string */
interface Cap extends Fn {
  return: Capitalize<this["arg0"]>;
}

/** Push an element to a tuple */
interface Push extends Fn {
  return: PushReturn<this["arg0"]>;
}

interface PushReturn<T> extends Fn {
  return: [...this["arg0"], T];
}

/** Filter a tuple */
interface Filter extends Fn {
  return: FilterImpl<this["arg0"]>;
}

interface FilterImpl<F extends Fn> extends Fn {
  return: TFilter<F, this["arg0"]>;
}

type TFilter<F extends Fn, T extends unknown[]> = T extends [
  infer Head,
  ...infer Tail,
]
  ? true extends Apply<F, Head>
    ? [Head, ...TFilter<F, Tail>]
    : TFilter<F, Tail>
  : [];

/** Determine if the given type extends another */
interface Extends extends Fn {
  return: ExtendsReturn<this["arg0"]>;
}

interface ExtendsReturn<T> extends Fn {
  return: this["arg0"] extends T ? true : false;
}

/** Apply an operation to all inputs */
interface ApplyAll extends Fn {
  return: ApplyAllImpl<this["arg0"]>;
}

interface ApplyAllImpl<F extends Fn> extends Fn {
  return: TApplyAll<F, this["arg0"]>;
}

type TApplyAll<F extends Fn, T extends unknown[]> = T extends [
  infer Head,
  ...infer Tail,
]
  ? [Apply<F, Head>, ...TApplyAll<F, Tail>]
  : [];

// ############## Test cases

import type { Expect, Equal } from "type-testing";

type t0_actual = Apply<Cap, "hello">; // =>
type t0_expected = "Hello"; // =>
type t0 = Expect<Equal<t0_actual, t0_expected>>;

type t1_actual = Apply<
  // =>
  Apply<Push, "world">,
  ["hello"]
>;
type t1_expected = ["hello", "world"]; // =>
type t1 = Expect<Equal<t1_actual, t1_expected>>;

type t2_actual = Apply<
  // =>
  Apply<ApplyAll, Cap>,
  Apply<Apply<Push, "world">, ["hello"]>
>;
type t2_expected = ["Hello", "World"]; // =>
type t2 = Expect<Equal<t2_actual, t2_expected>>;

type t3_actual = Apply<
  // =>
  Apply<Filter, Apply<Extends, number>>,
  [1, "foo", 2, 3, "bar", true]
>;
type t3_expected = [1, 2, 3]; // =>
type t3 = Expect<Equal<t3_actual, t3_expected>>;

type Station1 = Apply<Cap, "robot">; // =>
type Station2 = Apply<Apply<Push, Station1>, ["Tablet", "teddy bear"]>; // =>
type Station3 = Apply<
  Apply<Filter, Apply<Extends, Apply<Cap, string>>>,
  Station2
>;
type t4_actual = Station3;
type t4_expected = ["Tablet", "Robot"];
type t4 = Expect<Equal<t4_actual, t4_expected>>;
