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
 */
export type PickFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

/**------------------------
 * SYNTACTIC SUGAR TYPES 
 *------------------------/

/**
 * Primitive types that can be compared
 */
export type Comparables = number | string | undefined | null | BigInteger;

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
