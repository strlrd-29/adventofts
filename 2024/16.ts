declare function DynamicParamsCurrying<
  $Input extends any[],
  $Output extends any,
>(
  targetFn: (...args: $Input) => $Output,
): <T extends any[]>(
  ...args: T
) => $Input["length"] extends 0
  ? $Output
  : $Input extends [...T, ...infer Rest]
    ? ReturnType<typeof DynamicParamsCurrying<Rest, $Output>>
    : never;

// ############## Test cases

const originalCurry = (
  ingredient1: number,
  ingredient2: string,
  ingredient3: boolean,
  ingredient4: Date,
) => true;

const spikedCurry = DynamicParamsCurrying(originalCurry);

// Direct call
const t0 = spikedCurry(0, "Ziltoid", true, new Date());

// Partially applied
const t1 = spikedCurry(1)("The", false, new Date());

// Another partial
const t2 = spikedCurry(0, "Omniscient", true)(new Date());

// You can keep callin' until the cows come home: it'll wait for the last argument
const t3 = spikedCurry()()()()(0, "Captain", true)()()()(new Date());

// currying is ok
const t4 = spikedCurry(0, "Spectacular", true);

// @ts-expect-error arguments provided in the wrong order
const e0 = spikedCurry("Nebulo9", 0, true)(new Date());
