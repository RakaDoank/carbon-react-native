---
slug: /components/checkbox
---

# Checkbox

[`Checkbox`](../../definitions/functions/Checkbox.md) component is a composed component of [`CheckboxInput`](./checkbox-input.md) and [`FormLabel`](../../definitions/functions/FormLabel.md). You can build a checkbox quickly with this component

```tsx
import {
  Checkbox,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <Checkbox
      label="Tick me"
    />
  )
}
```

## Getting Value

Checkbox has simple true-false value which the input will be ticked / checked when the value is true. To get the value, just use the `onChange` prop of the checkbox

```tsx
import {
  useRef,
} from 'react'

import {
  Checkbox,
  type CheckboxProps,
} from '@rakadoank/carbon-react-native'

export default function Component() {

    const
      ref =
        useRef({
          checked: false,
        }),

      checkboxOnChange: CheckboxProps['onChange'] =
        value => {
          ref.current.checked = value
        }

  return (
    <Checkbox
      label="Tick me"
      onChange={ checkboxOnChange }
    />
  )
    
}
```

## Indeterminate State

While checkbox is showing two states in the box input which are ticked and unticked, another state which is **indeterminate** is showing a state in the box for some reasons in the between of ticked and unticked. See [checkbox states](https://carbondesignsystem.com/components/checkbox/usage/#states)

```tsx
import {
  Checkbox,
} from '@rakadoank/carbon-react-native'

export default function Checkbox() {
  return (
    <Checkbox
      indeterminate
      value
      label="Tick me"
    />
  )
}
```

### Indeterminate Behaviour

- Checkbox is only showing the indeterminate state if the value of the checkbox is also true (ticked)
- Checkbox is uncontrolled by default (see [Tick / Check Control](#tick--check-control)). It makes indeterminate state will be only showed once. If a checkbox was pressed by user from indeterminate state, the checkbox will be ticked / checked. If user pressed the checkbox again, it will be unticked / unchecked, instead of back to the indeterminate state

## Tick / Check Control

Checkbox is uncontrolled by default. Users should be able to interact to the checkbox by clicking the checkbox input area or its label to tick or untick the box input. If you want to control this behaviour, you can pass [`controlled`](../../definitions/interfaces/CheckboxProps.md#controlled) prop with true value and [`value`](../../definitions/interfaces/CheckboxProps.md#value-1) prop with your boolean state value

```tsx
import {
  useState,
} from 'react'

import {
  Button,
  Checkbox,
  type CheckboxProps,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const [value, setValue] = useState(false)

  return (<>
    <Button.Primary
      text="Unchecked"
      onPress={ () => setValue(false) }
    />

    <Checkbox
      text="Tick me"
      controlled
      value={ value }
      onPress={ () => setValue(state => !state) }
    />
  </>)
  
}
```

:::warning
If you don't pass `controlled` prop with true value, the `value` prop only be used once for initial render, either it's ticked (true) or unticked (false)
:::

### Imperative Handle

Somehow you don't want to use React state, you still can control the checkbox to be ticked or unticked on the box input, but imperatively. The checkbox components holds `View` ref and extends the ref to provide a method to tick or untick the box

```tsx
import {
  useRef,
} from 'react'

import {
  Button,
  Checkbox,
  type CheckboxRef,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    checkboxRef =
      useRef<CheckboxRef>(null),

    onPress: Button.PrimaryProps['onPress'] =
      event => {
        if(checkboxRef.current?.value) {
          // Get current value
          console.log('I already agree')
        } else {
          checkboxRef.current?.setValue(true) // it also accepts callback with boolean returned
        }
      }

  return (<>
    <Button.Primary
      text="I agree"
      onPress={ onPress }
    />

    <Checkbox
      label="I understand"
      ref={ checboxRef }
    />
  </>)
}
```

See [`CheckboxRef`](../../definitions/interfaces/CheckboxRef.md)

## Interactive States

> [**CheckboxInputInteractiveState**](../../definitions/type-aliases/CheckboxInputInteractiveState.md): `"normal"` \| `"disabled"` \| `"read_only"` \| `"error"` \| `"warning"`

Checkbox input has interactive states which determined the current input interactive behaviour either disabled, read only, and other states. Default is `"normal"`.

:::info
See group state information in the [checkbox behaviours](https://carbondesignsystem.com/components/checkbox/usage/#states).

According to the Carbon, the interactive state belongs to the group, but this library make it belongs to the [`CheckboxInput`](./checkbox-input.md). So when a checkbox currently in disabled, or read only, or error state, the checkbox input has special style, like the error state will make the box input with red bordered. But currently, `"warning"` state doesn't do anything to the box input, it's same modifier as the `"normal"`. If you intend to use checkbox with the warning helper text, use [`CheckboxGroup`](./checkbox-group.md) or use checkbox with [`FormHelperText`](../../definitions/functions/FormHelperText.md) component instead.
:::

## Group of Checkboxes

According to the [Carbon](https://carbondesignsystem.com/components/checkbox/usage/#anatomy), if there is a group of checkboxes, a group label can be added. So if you want to, use [`CheckboxGroup`](./checkbox-group.md) instead. The only difference is that [`CheckboxGroup`](./checkbox-group.md) is a view container of multiple checkboxes with group label and optionally with helper text. [Show me!](./checkbox-group.md)

## Box Only

Instead of using this component, you can just directly use the [`CheckboxInput`](./checkbox-input.md) to only use the box input to tick / untick. The only difference is the [`CheckboxInput`](./checkbox-input.md) doesn't has the `label` prop since the it's not importing the [`FormLabel`](../../definitions/functions/FormLabel.md) at all.

## Props

See [`CheckboxProps`](../../definitions/interfaces/CheckboxProps.md)