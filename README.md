# FractalText Specification

FractalText: dead simple, human readable, machine editable, line-wise interpretable, recursive plaintext data format.

- [Full specification](./spec.en.md)
- [Full specification by Japanese](./spec.ja.md)

## What is this?

FractalText is a data format. It:
- only have two parts; list and dictionary.
- can write some comments.
- includes only string value as a element of list.
- aims in-place editing easily.

Restrictions:
- dictionary may contain list, but list may not contain dictionary.
- list element may not contain a newline character.
- dictionary key may not contain a newline character.

## Example

```fractaltext
:key 1
  value 1

# comment 1
:key 2
  value 2
  ""
  ":value 3"
:key 3
  :key 4
    value 4
```

Here, `value 1` and `value 4` represents a list which contains only one element.
