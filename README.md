# Linguist Colors

A small TypeScript library for getting GitHub language colors.

linguist-colors-list is automatically updated whenever a new language is added to the data

# Usage

There is a provided function `getLanguageColor()`

```ts
import { getLanguageColor } from "linguist-colors-list";

// Example: get color for a language
const color = getLanguageColor("TypeScript"); // "#3178c6"

// Fallback for unknown language/lanauges without colors
const unknown = getLanguageColor("NonExistentLang"); // "#ededed"
```

Or, you can do

```ts
import { linguistData } from "linguist-colors-list";

console.log(linguistData["JavaScript"].color); // "#f1e05a"
```

# Example usage

This package is intended to be used for frontend purposes, but you aren't restricted if you want it on the backend!

```ts
import React from "react"
import { getLanguageColor } from "linguist-colors-list"

export function LanguageBullet({ language }: { language: string }) {
  return (
    <span>
      <span style={{ color: getLanguageColor(language), marginRight: 4 }}>●</span>
      {language}
    </span>
  )
}
```
