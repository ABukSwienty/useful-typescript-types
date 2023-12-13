# `useful-typescript-types` <!-- omit in toc -->

Types I'm tired of rewriting.

## Table of Contents <!-- omit in toc -->

- [Utility Types](#utility-types)
  - [`ObjectPath<T>`](#objectpatht)
    - [Example](#example)
  - [`DeepPartial<T>`](#deeppartialt)
  - [`ArrayItem<T>`](#arrayitemt)
  - [`Tuple<T, N>`](#tuplet-n)
    - [Example](#example-1)
  - [`VariadicTuple<T>`](#variadictuplet)
    - [Example](#example-2)
  - [`Nullable<T>`](#nullablet)
  - [`RequiredProperties<T>`](#requiredpropertiest)
  - [`OmitFunctionKeys<T>`](#omitfunctionkeyst)
  - [`PickKeysByValue`](#pickkeysbyvalue)
    - [`PickFunctionKeys<T>`](#pickfunctionkeyst)
    - [`PickObjectKeys<T>`](#pickobjectkeyst)
    - [`PickArrayKeys<T>`](#pickarraykeyst)
    - [`PickStringKeys<T>`](#pickstringkeyst)
    - [`PickNumberKeys<T>`](#picknumberkeyst)
- [Syntactic Sugar Types](#syntactic-sugar-types)
  - [`Comparables`](#comparables)
  - [`Callback<T>`](#callbackt)
    - [Example](#example-3)
  - [`CallbackWithArgs<T, Args>`](#callbackwithargst-args)
    - [Example](#example-4)
  - [`Result<Success, Error>`](#resultsuccess-error)
    - [Example](#example-5)
    - [Example](#example-6)
  - [`Action<Type, Payload>`](#actiontype-payload)
    - [Example](#example-7)

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

## Syntactic Sugar Types

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
