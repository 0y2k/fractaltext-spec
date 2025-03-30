---
title: FractalText Specification
created-at: 2025-03-29
updated-at: 2025-03-30
---

## 1. Overview

FractalText is a recursive plaintext data structure that can have the following items:
```haskell
type Key = Text
data Item
  = Item'List [Text]
  | Item'Dict [(Key, Item)]
```

## 2. Syntax Conventions

### 2.1. Lines
- **Lines** are the parts delimited by newlines.
  * Each line can contain an indent at the beginning of the line.
  * Lines are classified into four types: blank lines, comment lines, key lines, and string lines.
- **Newlines** terminate logical lines.
  * LF (`'\n'; 0x0A`), CRLF (`'\r\n'; 0x0D 0x0A`), and CR (`'\r'; 0x0D`) can be used as newline characters, in that order.
- **Indent** (white space at the beginning of a line) is used to express the recursive structure of each item.
  * Only space characters (`' '; 0x20`) are permitted as indent characters.
  * Tab characters (`'\t'; 0x09`) are not interpreted as indent or white space.
    The presence of a tab character as indent SHOULD cause an immediate error.

### 2.2. Line kinds

#### 2.2.1. Blank lines
- A **blank line** is a line that consists of only indentation, or a line that is surrounded by two consecutive newlines.

#### 2.2.2. Comment lines
- A **comment line** begins with a hash character (`'#'; 0x23`) and ends before the newline at the end of the line.
  * Comments at the end of a line are not interpreted. Only comments at the beginning of a line are ignored.

#### 2.2.3. Key lines
- A **key line** begins with a colon character (`':'; 0x3A`) and ends before the newline at the end of the line.
- A **key** is the part of a key line excluding the indent at the beginning of the line and the colon.

#### 2.2.4. Value lines
- A **value line** is any line that does not fall into the above three categories.
- A **value** is the part of a value line excluding the indent at the beginning of the line.
  * If the value is enclosed in double quotes (`'\"'; 0x22`), the value is obtained by removing the double quotes.
    This rule is applied only once.

## 3. Semantic rules

### 3.1. Parsing rules
- Parsing is performed line by line.
- Blank lines and comment lines are ignored.

### 3.2. Item rules
- An item is a list of values ​​or a list of entries.
  * A list of values ​​is interpreted as an `Item'List`, and a list of entries is interpreted as an `Item'Dict`.
  * Values ​​and entries cannot be mixed.
- An **entry** is a pair of a key line and a child item with a deeper indentation immediately after it.
  * It corresponds to each element of an `Item'Dict`.
  * All items in a direct child relationship must have the same indentation, and there must be no other children between the indentation of the key line and the indentation of the key line.
  * If there is no such line, the empty list is the direct child.

### 3.3. Document rules
- A document refers to a single item that the entire input represents.
  * The input must be a single item as a whole.
  * A mix of `Item'List` and `Item'Dict` is not allowed.
