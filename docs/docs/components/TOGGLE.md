---
slug: /components/toggle
---

# Toggle

Toggle component is composed component of [`Switch`](../definitions/functions/Switch.md) and [`FormLabel`](../definitions/functions/FormLabel.md). A toggle is used to quickly switch between two states which are **false/off** and **true/on**

```tsx
import {
  Toggle,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <Toggle.Default
      label="Label"
      value // make it true/on initially
      actionText="Action Text"
    />
  )
}
```

See Toggle's [anatomy](https://carbondesignsystem.com/components/toggle/usage/#anatomy)

## Variants

Currently, toggle component has two variants which are differentiated based on size

### Default
> [`<Toggle.Default>`](../definitions/namespaces/Toggle/functions/Default.md)

Default toggle is larger in size than the small one. It commons to be used in complete forms. Default toggles are required to display visible label and action text.

:::warning
Although, reports will be issued by TypeScript and ESLint if [`label`](../definitions/namespaces/Toggle/interfaces/DefaultProps.md#label) and [`actionText`](../definitions/namespaces/Toggle/interfaces/DefaultProps.md#actiontext) prop are not defined, empty string on those props will remove the reports, but it makes default toggle is not intended as how to be used according to the Carbon guide which should required to display a visible label and action text
:::

### Small
> [`<Toggle.Small>`](../definitions/namespaces/Toggle/functions/Small.md)

Small toggle commonly used in condensed spaces and appear inline with other components or content. In small toggle, [`label`](../definitions/namespaces/Toggle/interfaces/SmallProps.md#label) and [`actionText`](../definitions/namespaces/Toggle/interfaces/SmallProps.md#actiontext) prop are optional.

:::info
If you are never use the [`label`](../definitions/namespaces/Toggle/interfaces/SmallProps.md#label) and [`actionText`](../definitions/namespaces/Toggle/interfaces/SmallProps.md#actiontext) prop on small toggle, probably you want to use [`Switch`](../definitions/functions/Switch.md) component directly.
:::

## Getting Switch Value

To get boolean value of the switch, you can get it by using [`onChange`](../definitions/namespaces/Toggle/interfaces/BaseProps.md#onchange) prop. It will be invoked the callback when value is changed

```tsx
import {
  useRef,
} from 'react'

import {
  Toggle,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    ref =
      useRef({
        switchValue: false,
      }),

    onChange: Toggle.DefaultProps['onChange'] =
      value => {
        ref.current.switchValue = value
      }

  return (
    <Toggle.Default
      label="Label"
      actionText="Switch me"
      onChange={ onChange }
    />
  )

}
```

:::info
You can also get the current switch value to avoid saving another value in the useRef with [`Toggle.DefaultRef`](../definitions/namespaces/Toggle/interfaces/DefaultRef.md) or [`Toggle.SmallRef`](../definitions/namespaces/Toggle/interfaces/SmallRef.md). See [Imperative Handle](#imperative-handle) example
:::

## Switch Control

Toggle component is uncontrolled by default. Users should be able to interact to toggle by clicking or pressing in toggle's area (even label and action text) to switch to **true/on** or **false/off** state. If you want to control this behaviour, you can pass [`controlled`](../definitions/namespaces/Toggle/interfaces/BaseProps.md#controlled) prop with true value and [`value`](../definitions/namespaces/Toggle/interfaces/BaseProps.md#value-1) prop

```tsx
import {
  useState,
} from 'react'

import {
  Button,
  Toggle,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    [value, setValue] =
      useState<boolean>(false),

    togglePressHandler: NonNullable<Toggle.DefaultProps['pressableProps']>['onPress'] =
      event => {
        setValue(state => !state)
      }

  return (<>
    <Button.Primary
      text="Turn on"
      onPress={ () => setValue(true) }
    />

    <Toggle.Default
      label="Label"
      actionText="Switch me"
      pressableProps={{
        onPress: togglePressHandler,
      }}
    />
  </>)

}
```

### Imperative Handle

You can still control the toggle to **false/off** and **true/on** with your command without React state. This component holds a `View` ref and extends to provide a method to set the `value` state

```tsx
import {
  Button,
  Toggle,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    toggleDefaultRef =
      useRef<Toggle.DefaultRef>(null),

    switchFromButtonPress: Button.PrimaryProps['onPress'] =
      event => {
        toggleDefaultRef.current?.setValue(value => !value) // it also accepts boolean argument instead of callback with boolean returned
      }

  return (<>
    <Button.Primary
      text="Switch from this button"
      onPress={ switchFromButtonPress }
    />

    <Button.Secondary
      text="Get current switch value"
      onPress={ () => {
        console.log('Switch value is ', toggleDefaultRef.current?.value)
      } }
    />

    <Toggle.Default
      label="Label"
      actionText="Switch me"
      onChange={ onChange }
      ref={ ref }
    />
  </>)

}
```

## Props

### DefaultProps

It extends the [`BaseProps`](../definitions/namespaces/Toggle/interfaces/BaseProps.md), but it makes the `label` and `actionText` are required

See [`DefaultProps`](../definitions/namespaces/Toggle/interfaces/DefaultProps.md)

### SmallProps

See [`SmallProps`](../definitions/namespaces/Toggle/interfaces/SmallProps.md)