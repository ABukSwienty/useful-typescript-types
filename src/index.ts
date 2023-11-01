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
