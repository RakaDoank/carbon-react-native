---
slug: /guides/accessing-color
sidebar_position: 2
---

# Accessing Color

This library provides two ways to how to access color, which are [Declarative Semantic Token](#declarative-semantic-token) and [Use Color Constant](#use-color-constant). Read on!

:::warning
To support [React Native for Web](https://necolas.github.io/react-native-web), this package provides custom `StyleSheet` that includes color token. This is better way to style UIs rather than inline styles. Read [Coloring in StyleSheet](./coloring-in-stylesheet).
:::

## Declarative Semantic Token

:::tip
Accessing color token declaratively is the most recommended way
:::

Carbon Design System provides its own semantic token that help interface communicate the intent of a given color and create predictable behavior, consistent, reusable, and scalable.

Technically, all token members that based on what color scheme are live in React Context which is [`ThemeContext`](../definitions/variables/ThemeContext.md). The context has been provided since you wrapped your React app with [`CarbonReactNative`](../definitions/functions/CarbonReactNative.md) on the root tree.

Example usage
```tsx
import {
  useContext,
} from 'react'

import {
  Text,
  ThemeContext,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  const themeContext = useContext(ThemeContext)

  return (
    <Text
      type="label_01"
      style={{ color: themeContext.color.support_error }}
    >
      Lorem ipsum dolor sit amet
    </Text>
  )
}
```

All color tokens can be accessed from the `themeContext.color` object that all members are named same as the [official color tokens](https://carbondesignsystem.com/elements/color/tokens/), but it is using underscore (_) instead of hyphen (-). From the example above, the `support_error` color token will return the correct color token dynamically based on current color scheme.

### Why this is the recommended way?

It's the nature of declarative. This is make you **less writing** and **less prone**. You can just simply access the color token without rewriting the logic of color scheme like the light or dark theme everytime you are writing a component. Even internally, the core components are also using the color tokens declaratively. This is make across interfaces consistent.

:::info
Good to know. You can learn [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context).
:::

## Use Color Constant

Although, accessing color declaratively by [`ThemeContext`](../definitions/variables/ThemeContext.md) is the most recommended. You can still access the color code and token in constants

```tsx
import {
  ColorConstant,
  Text,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <Text
      type="label_01"
      style={{ color: ColorsConstant.Tokens.gray_10.support_error }}
    >
      Lorem ipsum dolor sit amet
    </Text>
  )
}
```

or you can use the color code directly instead of color token

```tsx
import {
  ColorConstant,
  Text,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <Text
      type="label_01"
      style={{ color: ColorsConstant.Code.yellow40 }}
    >
      Lorem ipsum dolor sit amet
    </Text>
  )
}
```

:::warning
In those two examples above, the `support_error` token or the `yellow40` don't dynamically change across color scheme or theme like light or dark theme. You have to write your own logic for it.
:::

If you insist, [`ThemeContext`](../definitions/variables/ThemeContext.md) is also providing current color scheme system natively, which is `gray_10` or `gray_100`. This is below is an example how to import color token while still follow the current color scheme

```tsx
import {
  ColorConstant,
  Text,
  ThemeContext,
  type ThemeType,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <Text
      type="label_01"
      style={{ color: mapTextColor[colorScheme] }}
    >
      Lorem ipsum dolor sit amet
    </Text>
  )
}

const mapTextColor: Record<ThemeType.ColorScheme, string> = {
  gray_10: ColorConstant.Tokens.gray_10.support_error,
  gray_100: ColorConstant.Code.yellow40,
}
```