/**
 * Get the path keys of an object
 *
 * @example
 * const myObj = {
 *  foo: {
 *   bar: "hi",
 *   baz: "hello"
 *  }
 * }
 *
 * type MyObjPath = ObjectPath<typeof myObj> // "foo" | "foo.bar" | "foo.baz"
 */
export type ObjectPath<T> = T extends object
  ? {
      [K in keyof T]: K extends string ? K | `${K}.${ObjectPath<T[K]>}` : never;
    }[keyof T]
  : never;

/**
 * Get the path keys of an object that __contains__ a certain key.
 *
 * @example
 * const myObj = {
 *  foo: {
 *   bar: {
 *     baz: "hi"
 *   }
 *  }
 * }
 *
 * type findBaz = ObjectPathContainsKey<typeof myObj, "baz"> // "foo.bar"
 */
export type ObjectPathContainsKey<T, Key extends string> = {
  [K in keyof T]: T[K] extends object
    ? K extends string
      ?
          | `${K}.${ObjectPathContainsKey<T[K], Key>}`
          | (Key extends keyof T[K] ? K : never)
      : never
    : never;
}[keyof T];

/**
 * Get the value of an object at a certain path (using dot notation)
 *
 * @example
 * const myObj = {
 *  foo: {
 *   bar: {
 *     baz: "hi"
 *   }
 *  }
 * } as const;
 *
 * type baz = ValueAtPath<typeof myObj, "foo.bar.baz"> // "hi"
 *
 */
export type ValueAtObjectPath<
  T,
  Path extends string
> = Path extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? ValueAtObjectPath<T[First], Rest>
    : never
  : Path extends keyof T
  ? T[Path]
  : never;

/**
 * Make all properties and nested properties of an object optional
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

/**
 * Get the type of an array item
 */
export type ArrayItem<T extends any[]> = T extends (infer U)[] ? U : never;

/**
 * A tuple with 2 elements
 *
 * @example
 *
 * const tuple: Tuple<string, number> = ["foo", 1]
 */
export type Tuple<T, N> = [T, N];

/**
 * A tuple with n elements
 *
 * @example
 * const vTuple: VariadicTuple<string, number, boolean> = ["foo", 1, true]
 */
export type VariadicTuple<T extends any[]> = [...T];

/**
 * Nullable type
 */
export type Nullable<T> = T | null;

/**
 * Make all properties of an object required
 */
export type RequiredProperties<T> = T extends object
  ? {
      [K in keyof T]-?: T[K];
    }
  : never;

/**
 * Omit keys of an object with function values
 */
export type OmitFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

/**
 * Pick Keys of an object that have function values
 *
 * Based on {@link PickKeysByValue}
 */
export type PickFunctionKeys<T> = PickKeysByValue<T, Function>;

/**
 * Pick Keys of an object that have string values
 *
 * Based on {@link PickKeysByValue}
 */
export type PickStringKeys<T> = PickKeysByValue<T, string>;

/**
 * Pick Keys of an object that have number values
 *
 * Based on {@link PickKeysByValue}
 */
export type PickNumberKeys<T> = PickKeysByValue<T, number>;

/**
 * Pick Keys of an object that have object values
 *
 * Based on {@link PickKeysByValue}
 */
export type PickObjectKeys<T> = PickKeysByValue<T, Object>;

/**
 * Pick Keys of an object that have array values
 *
 * Based on {@link PickKeysByValue}
 */
export type PickArrayKeys<T> = PickKeysByValue<T, Array<any>>;

/**
 * Pick Keys of an object that have `Type` values
 *
 * @example
 *
 * const obj = { foo: "bar", baz: 42 };
 * type MyKeys = PickKeysByValue<typeof obj, string> // "foo"
 */
export type PickKeysByValue<T, Type> = {
  [K in keyof T]: T[K] extends Type ? K : never;
}[keyof T];

/**
 * Remove readonly modifier from all properties of an object
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Make all properties of an object readonly
 */
export type Immutable<T> = {
  readonly [P in keyof T]: T[P];
};

// SYNTACTIC SUGAR TYPES

/**
 * Primitive types that can be compared
 */
export type Comparables = number | string | BigInteger;

/**
 * A JSON object
 */
export interface JsonObject {
  [key: string | number]: JsonValue;
}

/**
 * A JSON value
 */
export type JsonValue =
  | string
  | number
  | boolean
  | JsonObject
  | JsonArray
  | null;

/**
 * A JSON array
 */
export interface JsonArray extends Array<JsonValue> {}

/**
 * All primitive types
 */
export type Primitives = Comparables | boolean | symbol | null | undefined;

/**
 * A function that returns T or void
 *
 * @example
 * const myCallback: Callback<string> = () => "foo"
 */
export type Callback<T = void> = () => T;

/**
 * A function that returns T or void and takes Args as arguments
 *
 * @example
 * const myCallback: CallbackWithArgs<string, [number, string]> = (num, str) => "foo"
 */
export type CallbackWithArgs<T = void, Args = any> = (...args: Args[]) => T;

/**
 * A result type that can be either a success or an error
 *
 * @example
 * const myResult: Result<string, number> = { success: true, value: "foo" }
 * const myResult: Result<string, number> = { success: false, error: "bar" }
 */
export type Result<Success, Error = string> =
  | { success: true; value: Success }
  | { success: false; error: Error };

/**
 * For state management systems like Redux
 *
 * @example
 * type Actions = Action<"INCREMENT", number> | Action<"DECREMENT", number>
 */
export type Action<Type, Payload> = Payload extends undefined | void | null
  ? {
      type: Type;
      payload?: Payload;
    }
  : { type: Type; payload: Payload };

/**
 * Make some properties of an object optional
 *
 * @example
 *
 * const myObj = {
 *  foo: "hi",
 *  bar: "hello"
 * }
 *
 * type MyObj = PartialBy<typeof myObj, "foo"> // { foo?: string, bar: string }
 */
export type PartialBy<T extends object, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
