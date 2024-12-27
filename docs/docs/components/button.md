---
slug: /components/button
---

# Button

Button is a clickable or pressable element that are used to trigger actions. Button in this library is using [`Pressable`](https://reactnative.dev/docs/pressable) as the core components

```tsx
import {
  StyleSheet,
  View,
} from 'react-native'

import {
  Button,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const pressHandler: Button.PrimaryProps['onPress'] = event => {
    console.log('onPress')
  }

  return (
    <View>
      <Button.Primary
        text="Hello World"
        onPress={ pressHandler }
      />

      <Button.Tertiary
        text="Hello World 2"
        style={ style.tertiaryButton }
      />
    </View>
  )

}

const style = StyleSheet.create({
  tertiaryButton: {
    marginTop: 4,
  }
})
```

See other [variants](#variants) below

## Variants

Carbon Design System provides button in a lot of variants that have [specific purposes each variant](https://carbondesignsystem.com/components/button/usage/#variants)

- [`Ghost`](../definitions/namespaces/Button/functions/Ghost.md)
- [`GhostDanger`](../definitions/namespaces/Button/functions/GhostDanger.md)
- [`GhostIcon`](../definitions/namespaces/Button/functions/GhostIcon.md)
- [`Primary`](../definitions/namespaces/Button/functions/Primary.md)
- [`PrimaryDanger`](../definitions/namespaces/Button/functions/PrimaryDanger.md)
- [`Secondary`](../definitions/namespaces/Button/functions/Secondary.md)
- [`Tertiary`](../definitions/namespaces/Button/functions/Tertiary.md)
- [`TertiaryDanger`](../definitions/namespaces/Button/functions/TertiaryDanger.md)

### Base Variants

:::warning
Please, do not use this variants, unless you want to create your own button.
:::

Using these base variants will help your custom button component consistent as the original variants, but with other colors presumably.

- [`Base`](../definitions/namespaces/Button/functions/Base.md)

This is the base of button element as the core which the view is styled based on the [structure](https://carbondesignsystem.com/components/button/style/#structure) guide style

- [`BaseColor`](../definitions/namespaces/Button/functions/BaseColor.md)

This component inherits the [`Base`](../definitions/namespaces/Button/functions/Base.md) and extends with color state controller like focusing, hovering, disabled, etc. All those [preset variants](#variants) like [`Primary`](../definitions/namespaces/Button/functions/Primary.md) is using this element.

## Sizes

> [**ButtonSize**](../definitions/namespaces/Button/type-aliases/ButtonSize.md): `"small"` \| `"medium"` \| `"large_productive"` \| `"large_expressive"` \| `"extra_large"` \| `"2xl"`

Carbon provides size options. Simply, you can pass [`size`](../definitions/namespaces/Button/interfaces/BaseProps.md#size) prop value with one of the options. Default is `large_production`

```tsx
import {
  Button,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <Button.Primary
      size="extra_large"
      text="Add World"
    />
  )
}
```

## Render Icon

Button component provides a prop to render an icon with its correct color of icon in each variant and shrink or grow the icon size in each size option of button. You can just simply import an icon of `@carbon/icons` package, and pass it

```tsx
import {
  Button,
} from '@rakadoank/carbon-react-native'

import AddIcon from '@carbon/icons/es/add/20'

export default function Component() {
  return (
    <Button.Primary
      text="Add World"
      icon={ AddIcon }
    />
  )
}
```

### Icon Only

Meanwhile, you can use button with icon only. Just omit the text prop value

```tsx
import {
  Button,
} from '@rakadoank/carbon-react-native'

import AddIcon from '@carbon/icons/es/add/20'

export default function Component() {
  return (
    <Button.Primary
      // text="Add World"
      icon={ AddIcon }
      aria-label="Add World"
    />
  )
}
```

:::info
For accessibility reasons, it's better to provide [`aria-label`](https://reactnative.dev/docs/view#aria-label) prop value if button is only rendering an icon
:::

### Ghost Icon

Based on the [Carbon docs](https://carbondesignsystem.com/components/button/style/#ghost-button), ghost button have sub variant which only render an icon and with selected state

```tsx
import {
  useState,
} from 'react'

import {
  Button,
} from '@rakadoank/carbon-react-native'

import AddIcon from '@carbon/icons/es/add/20'

export default function Component() {

  const [isSelected, setIsSelected] = useState(false)

  return (
    <Button.GhostIcon
      icon={ AddIcon }
      selected={ isSelected }
    />
  )

}
```

### Custom Icon Node

If the `icon` prop doesn't suit your needs, you can render icon (can render anything basically) at the icon position with [`iconNode`](../definitions/namespaces/Button/interfaces/BaseProps#iconnode) prop. In a case probably you want to use [`react-native-svg-transformer`](https://github.com/kristerkari/react-native-svg-transformer) and use your own SVG

```tsx
import {
  useState,
} from 'react'

import {
  Button,
  ColorConstant,
  Icon,
} from '@rakadoank/carbon-react-native'

// Importing a SVG file
import AddIcon from '@carbon/icons/svg/add/32/add.svg'

export default function Component() {

  return (
    <Button.Primary
      text="Hello World"
      iconNode={ customIconRenderer }
    />
  )

}

const customIconRenderer: Button.PrimaryProps['iconNode'] = (
  iconColorState,
  iconSize,
  iconStyle,
) => {
  return (
    <AddIcon
      color={ iconColorState }
      width={ iconSize }
      height={ iconSize }
      /**
       * use the `iconStyle` to keep icon style nicely center aligned vertically with text
       */
      style={ iconStyle }
    />
  )
}
```

:::info
[`iconNode`](../definitions/namespaces/Button/interfaces/BaseProps#iconnode) prop takes precedence even if [`icon`](../definitions/namespaces/Button/interfaces/BaseProps.md#icon) prop is present
:::

## "Button" is a Namespace

Keep it in mind, that [`Button`](../definitions/namespaces/Button/index.md) is just a namespace, while the [`Button.Primary`](../definitions/namespaces/Button/functions/Primary.md), [`Button.Tertiary`](../definitions/namespaces/Button/functions/Tertiary.md), and other variants are the actual component. In addition, to import any button definitions like interfaces such as [`PrimaryProps`](../definitions/namespaces/Button/interfaces/PrimaryProps.md) or type aliases, you also use the `Button` keyword in the front, like [`Button.PrimaryProps`](../definitions/namespaces/Button/interfaces/PrimaryProps.md)

## Props

### BaseColorProps
See [`BaseColorProps`](../definitions/namespaces/Button/interfaces/BaseColorProps.md)

### BaseProps
Props definition of all button variants as the base button element.

See [`BaseProps`](../definitions/namespaces/Button/interfaces/BaseProps.md)

### GhostDangerProps
See [`GhostDangerProps`](../definitions/namespaces/Button/interfaces/GhostDangerProps.md)

### GhostIconProps
See [`GhostIconProps`](../definitions/namespaces/Button/interfaces/GhostIconProps.md)

### GhostProps
See [`GhostProps`](../definitions/namespaces/Button/interfaces/GhostProps.md)

### PrimaryDangerProps
See [`PrimaryDangerProps`](../definitions/namespaces/Button/interfaces/PrimaryDangerProps.md)

### PrimaryProps
See [`PrimaryProps`](../definitions/namespaces/Button/interfaces/PrimaryProps.md)

### SecondaryProps
See [`SecondaryProps`](../definitions/namespaces/Button/interfaces/SecondaryProps.md)

### TertiaryDangerProps
See [`TertiaryDangerProps`](../definitions/namespaces/Button/interfaces/TertiaryDangerProps.md)

### TertiaryProps
See [`TertiaryProps`](../definitions/namespaces/Button/interfaces/TertiaryProps.md)
