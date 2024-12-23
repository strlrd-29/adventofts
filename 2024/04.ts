const survivalRatio = (input: number | string) => {
  const data = annualData[input];
  if (!data) {
    throw new Error("Data not found");
  }
  return data.housingIndex / data.minimumWage;
};

type AnnualData = {
  [key: string]: {
    /** inflation corrected housing price index */
    housingIndex: number;

    /** inflation corrected North Pole minimum wage */
    minimumWage: number;
  };
};

const annualData: AnnualData = {
  2009: {
    housingIndex: 159.50891,
    minimumWage: 92.85234,
  },
  2010: {
    housingIndex: 143.02079,
    minimumWage: 100.50286,
  },
  2011: {
    housingIndex: 134.38007,
    minimumWage: 98.68833,
  },
  2012: {
    housingIndex: 128.14281,
    minimumWage: 96.31795,
  },
  2013: {
    housingIndex: 129.07457,
    minimumWage: 94.94066,
  },
  2014: {
    housingIndex: 133.94671,
    minimumWage: 93.72707,
  },
  2015: {
    housingIndex: 143.30408,
    minimumWage: 93.59833,
  },
  2016: {
    housingIndex: 150.21623,
    minimumWage: 92.9189,
  },
  2017: {
    housingIndex: 154.90384,
    minimumWage: 91.06557,
  },
  2018: {
    housingIndex: 161.67095,
    minimumWage: 89.39745,
  },
  2019: {
    housingIndex: 167.71417,
    minimumWage: 88.11883,
  },
  2020: {
    housingIndex: 173.5093,
    minimumWage: 86.81302,
  },
  2021: {
    housingIndex: 182.89259,
    minimumWage: 85.10033,
  },
  2022: {
    housingIndex: 199.43678,
    minimumWage: 79.80175,
  },
  2023: {
    housingIndex: 205.8372,
    minimumWage: 75.95666,
  },
  2024: {
    housingIndex: 214.9681,
    minimumWage: 73.98181,
  },
};

// ############## Test cases

import type { Expect, Equal } from "type-testing";

// We can pass numbers like `2009`:

const start = survivalRatio(2009);
type t0_actual = typeof start; // =>
type t0_expected = number; // =>
type t0 = Expect<Equal<t0_actual, t0_expected>>;

const now = survivalRatio(2024);
type t1_actual = typeof now; // =>
type t1_expected = number; // =>
type t1 = Expect<Equal<t1_actual, t1_expected>>;

// We can pass strings like `'2009 Q2'`:

const q1_2009 = survivalRatio("2009 Q1");
type t2_actual = typeof q1_2009; // =>
type t2_expected = number; // =>
type t2 = Expect<Equal<t2_actual, t2_expected>>;

const q2_2024 = survivalRatio("2024 Q2");
type t3_actual = typeof q2_2024; // =>
type t3_expected = number; // =>
type t3 = Expect<Equal<t3_actual, t3_expected>>;

// Other data types are not allowed by TypeScript:

// @ts-expect-error
survivalRatio(true);

// @ts-expect-error
survivalRatio([1]);

// @ts-expect-error
survivalRatio({ 1: 1 });
