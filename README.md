# `useful-typescript-types` <!-- omit in toc -->

Types I'm tired of rewriting.

## Table of Contents <!-- omit in toc -->

- [Utility Types](#utility-types)
  - [`ObjectPath<T>`](#objectpatht)
    - [Example](#example)
  - [`ObjectPathContainsKey<T, Key>`](#objectpathcontainskeyt-key)
    - [Example](#example-1)
  - [`ValueAtObjectPath`](#valueatobjectpath)
    - [Example](#example-2)
  - [`DeepPartial<T>`](#deeppartialt)
  - [`ArrayItem<T>`](#arrayitemt)
  - [`Tuple<T, N>`](#tuplet-n)
    - [Example](#example-3)
  - [`VariadicTuple<T>`](#variadictuplet)
    - [Example](#example-4)
  - [`Nullable<T>`](#nullablet)
  - [`RequiredProperties<T>`](#requiredpropertiest)
  - [`OmitFunctionKeys<T>`](#omitfunctionkeyst)
  - [`PickKeysByValue`](#pickkeysbyvalue)
    - [`PickFunctionKeys<T>`](#pickfunctionkeyst)
    - [`PickObjectKeys<T>`](#pickobjectkeyst)
    - [`PickArrayKeys<T>`](#pickarraykeyst)
    - [`PickStringKeys<T>`](#pickstringkeyst)
    - [`PickNumberKeys<T>`](#picknumberkeyst)
  - [`Mutable<T>`](#mutablet)
  - [`Immutable<T>`](#immutablet)
- [Syntactic Sugar Types](#syntactic-sugar-types)
  - [`Primitives`](#primitives)
  - [Json](#json)
    - [`JsonObject`](#jsonobject)
    - [`JsonArray`](#jsonarray)
    - [`Json Value`](#json-value)
  - [`Comparables`](#comparables)
  - [`Callback<T>`](#callbackt)
    - [Example](#example-5)
  - [`CallbackWithArgs<T, Args>`](#callbackwithargst-args)
    - [Example](#example-6)
  - [`Result<Success, Error>`](#resultsuccess-error)
    - [Example](#example-7)
    - [Example](#example-8)
  - [`Action<Type, Payload>`](#actiontype-payload)
    - [Example](#example-9)

## Utility Types

### `ObjectPath<T>`

Get the path keys of an object as string literals.

#### Example

```typescript
const myObj = {
  foo: {
    bar: "hi",
    baz: "hello",
  },
};

type MyObjPath = ObjectPath<typeof myObj>; // "foo" | "foo.bar" | "foo.baz"
```

### `ObjectPathContainsKey<T, Key>`

Get the path keys of an object that **contains** a certain key.

#### Example

```typescript
const myObj = {
  foo: {
    bar: {
      baz: "hi",
    },
  },
};

type findBazPath = ObjectPathContainsKey<typeof myObj, "baz">; // "foo.bar"
```

### `ValueAtObjectPath`

Get the value of an object at a certain path (using dot notation)

#### Example

```typescript
const myObj = {
  foo: {
    bar: {
      baz: "hi",
    },
  },
} as const;

type baz = ValueAtPath<typeof myObj, "foo.bar.baz">; // "hi"
```

### `DeepPartial<T>`

Make all properties and nested properties of an object optional.

### `ArrayItem<T>`

Get the type of an array item.

### `Tuple<T, N>`

Define a tuple with exactly 2 elements of types `T` and `N`.

#### Example

```typescript
const tuple: Tuple<string, number> = ["foo", 1];
```

### `VariadicTuple<T>`

Define a tuple with a variable number of elements.

#### Example

```typescript
const vTuple: VariadicTuple<string, number, boolean> = ["foo", 1, true];
```

### `Nullable<T>`

Define a type that can be `null` or of type `T`.

### `RequiredProperties<T>`

Make all properties of an object required, removing optional modifiers.

### `OmitFunctionKeys<T>`

Omit keys of an object that have function values.

### `PickKeysByValue`

Pick keys of an object that have `Type` values

```typescript
const obj = { foo: "bar", baz: 42 };

type MyKeys = PickKeysByValue<typeof obj, string>; // "foo"
```

#### `PickFunctionKeys<T>`

Pick keys of an object that have function values.

#### `PickObjectKeys<T>`

Pick keys of an object that have object values.

#### `PickArrayKeys<T>`

Pick keys of an object that have array values.

#### `PickStringKeys<T>`

Pick keys of an object that have string values.

#### `PickNumberKeys<T>`

Pick keys of an object that have number values.

### `Mutable<T>`

Remove readonly modifier from all properties of an object

### `Immutable<T>`

Make all properties of an object readonly

## Syntactic Sugar Types

### `Primitives`

Primitive types. Builds on top of `Comparables`.

### Json

Json types.

#### `JsonObject`

A Json object consists of a `JsonObject` or `JsonArray`, which in turn consist of `JsonValue`s.

#### `JsonArray`

A Json array consists of `JsonValue`s.

#### `Json Value`

A Json value can be a `string`, `number`, `boolean`, `null`, `JsonObject`, or `JsonArray`.

### `Comparables`

Primitive types that can be compared, including `number`, `string`, `undefined`, `null`, and `BigInteger`.

### `Callback<T>`

A function that returns type `T` or `void`.

#### Example

```typescript
const myCallback: Callback<string> = () => "foo";
```

### `CallbackWithArgs<T, Args>`

A function that returns type `T` or `void` and takes arguments of type `Args`.

#### Example

```typescript
const myCallback: CallbackWithArgs<string, [number, string]> = (num, str) =>
  "foo";
```

### `Result<Success, Error>`

A result type that can be either a success or an error.

#### Example

```typescript
const myResult: Result<string, number> = { success: true, value: "foo" };
const myResult: Result<string, number> = { success: false, error: 101 };
```

#### Example

```typescript
const myDict: Dictionary<string> = { foo: "bar" };
```

### `Action<Type, Payload>`

For state management systems like Redux, representing an action with a type and payload.

#### Example

```typescript
type Actions = Action<"INCREMENT", number> | Action<"DECREMENT", number>;
```
