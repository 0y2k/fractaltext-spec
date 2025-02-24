# FractalText Format Specification

## 1. Overview

FractalText is a plain-text data format designed to represent a recursive data model consisting of two basic kinds of items:

```haskell
type Key = Text
data Item
  = Item'EmptyList          -- An empty list
  | Item'List [Text]        -- A non-empty list of texts
  | Item'Dict [(Key, Item)] -- A non-empty dictionary mapping keys to Items
```

The recursive nature allows arbitrary nesting of lists and dictionaries. The design aims for human readability and ease of implementation, especially for parsers that support partial (in-place) editing.

---

## 2. Lexical Conventions

### 2.1. Indent and Newlines
- **Indent** (leading whitespace) is used to represent nesting each items.
  - As a character of indent, only the space character (` `; 0x20) is allowed.
  - A tab character (`\t`; 0x09) is not interpreted as a part of indent or whitespace. Cause errors immediately.
- A **newline** terminates a logical line. Blank lines may be used for visual separation and are preserved by the parser.
  - As a newline character, LF (0x0A), CRLF (0x0D, 0x0A) and CR (0x0D) are accepted in this order.

### 2.2. Lines
- A **line** is separated parts by newline character.
  - Each line may contain some indent.
- line includes `Line'Blank`, `Line'Comment`, `Line'Key` and `Line'String`.

#### 2.2.1. Blank lines
- **Blank line** contains only some indent or none.

#### 2.2.2. Comment lines
- **Comment line** begins with a hash (`#`; 0x23) and continue to the end of the line.
  - Comments after data are not interpreted.

#### 2.2.3. Key lines
- **Key line** begins with a colon (`:`; 0x3A).
- **key** is the remaining parts of key line.

#### 2.2.4. String lines
- **String line** has some contents following by indent.
- If double-quoted, quoted contents are true contents. This rule fires only one time.

---

under construction...
