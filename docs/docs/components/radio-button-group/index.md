---
slug: /components/radio-button-group
---

# Radio Button Group

In common usage, radio button usually represent a group of mutually exclusive choices, compared to checkboxes that user is able to select one or more.

## Usage

Instead of manually build multiple radio buttons with their controller, you can simply build a group of radio buttons quickly with this component

```tsx
import {
  RadioButtonGroup,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <RadioButtonGroup
      legend="Group Label"
      selectedValue="soho" // second item will be selected initially
    >
      <RadioButtonGroup.Item value="bbc"/>
      <RadioButtonGroup.Item value="soho"/>
      <RadioButtonGroup.Item value="prambors"/>
    </RadioButtonGroup>
  )
}
```

Value of radio button can also be number. You can make it one or more item value with numbering value

```tsx
import {
  RadioButtonGroup,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <RadioButtonGroup
      legend="Group Label"
      selectedValue="soho" // still, second item will be selected initially
    >
      <RadioButtonGroup.Item value={ 9 }/>
      <RadioButtonGroup.Item value="soho"/>
      <RadioButtonGroup.Item value={ 11 }/>
    </RadioButtonGroup>
  )
}
```

:::warning
Value prop in the `RadioButtonGroup.Item` is marked as optional in component definitions. `undefined` value is also a value. If multiple `RadioButtonGroup.Item` in a group have `undefined` value, those items will be selected.
:::

## Getting Selected Value

Each of radio button item has string or number value, you can get the current selected value by use the callback in the [`onChange`](../../definitions/interfaces/RadioButtonGroupProps.md#onchange) prop in the [`RadioButtonGroup`](../../definitions/functions/RadioButtonGroup.md) component

```tsx
import {
  useRef,
} from 'react'

import {
  RadioButtonGroup,
  type RadioButtonGroupProps,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    ref =
      useRef<{
        selectedValue: RadioButtonGroupProps['selectedValue'],
      }>({
        selectedValue: undefined,
      }),

    selectedRadioHandler: RadioButtonGroupProps['onChange'] =
      value => {
        ref.current.selectedValue = value
      }

  return (
    <RadioButtonGroup
      legend="Group Label"
      onChange={ selectedRadioHandler }
    >
      <RadioButtonGroup.Item
        value="bbc"
      />
      <RadioButtonGroup.Item
        value="soho"
      />
      <RadioButtonGroup.Item
        value="prambors"
      />
    </RadioButtonGroup>
  )

}
```

:::info
You can also get the current selected value to avoid saving another value in the useRef with [`RadioButtonGroupRef`](../../definitions/interfaces/RadioButtonGroupRef.md#selectedvalue). See [Imperative Handle](#imperative-handle) example
:::

## Select Control

Radio Button Group is uncontrolled by default. Users should be able to interact to radio buttons by clicking or pressing one of the item to select, and automatically unselect other items. If you want to control this behaviour, you can pass [`controlled`](../../definitions/interfaces/RadioButtonGroupProps.md#controlled) prop with true value and [`selectedValue`](../../definitions/interfaces/RadioButtonGroupProps.md#selectedvalue) prop


```tsx
import {
  useState,
} from 'react'

import {
  Button,
  RadioButtonGroup,
  type RadioButtonGroupProps,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    [selectedValue, setSelectedValue] =
      useState<RadioButtonGroupProps['selectedValue']>(undefined)

  return (<>
    <Button.Primary
      text="Reset"
      onPress={ () => setSelectedValue(undefined) }    
    />

    <RadioButtonGroup
      legend="Group Label"
      selectedValue={ selectedValue }
    >
      <RadioButtonGroup.Item
        value="bbc"
        onPress={ () => setSelectedValue('bbc') }
      />
      <RadioButtonGroup.Item
        value="soho"
        onPress={ () => setSelectedValue('soho') }
      />
      <RadioButtonGroup.Item
        value="prambors"
        onPress={ () => setSelectedValue('prambors') }
      />
    </RadioButtonGroup>
  </>)

}
```

:::info
Probably, you don't want this. If you are intend to unselect the radio buttons with another component, alternatively you can set the `selectedValue` imperatively with ref. See [Imperative Handle](#imperative-handle)
:::

### Imperative Handle

You can still control which one of the radio buttons would be selected or no radios selected at all with your command without React state. This component holds a `View` ref and extends to provide a method to set the `selectedValue`

```tsx
import {
  useRef,
} from 'react'

import {
  Button,
  RadioButtonGroup,
  type RadioButtonGroupProps,
  type RadioButtonGroupRef,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    radioButtonGroupRef =
      useRef<RadioButtonGroupRef>(null),

    ref =
      useRef<{
        selectedValue: RadioButtonGroupProps['selectedValue'],
      }>({
        selectedValue: undefined,
      }),

    clearButtonHandler: Button.PrimaryProps['onPress'] =
      () => {
        /**
         * You can also get current value
         */
        console.log('currentValue: ', radioButtonGroupRef.current?.selectedValue)

        // set to undefined to unselect radio buttons
        radioButtonGroupRef.current?.setSelectedValue(undefined) // it also accepts callback with value returned
      },

    selectedRadioHandler: RadioButtonGroupProps['onChange'] =
      value => {
        ref.current.selectedValue = value
      }

  return (<>
    <Button.Primary
      text="Clear All"
      onPress={ clearButtonHandler }
    />

    <RadioButtonGroup
      legend="Group Label"
      onChange={ selectedRadioHandler }
      ref={ radioButtonGroupRef }
    >
      <RadioButtonGroup.Item
        value="bbc"
      />
      <RadioButtonGroup.Item
        value="soho"
      />
      <RadioButtonGroup.Item
        value="prambors"
      />
    </RadioButtonGroup>
  </>)
}
```

## Helper Text

You can show user a information about the group, like static description, or error and warning description. See the group state on the [checkbox behaviours](https://carbondesignsystem.com/components/checkbox/usage/#behaviors)

```tsx
import {
  RadioButtonGroup,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <RadioButtonGroup
      legend="Group Label"
      helperText="Description of the group"
    >
      <RadioButtonGroup.Item
        label="bbc"
      />
      <RadioButtonGroup.Item
        label="prambors"
      />
    </RadioButtonGroup>
  )
}
```

### Helper Text Mode

> [**RadioButtonGroupHelperTextMode**](../../definitions/type-aliases/RadioButtonGroupHelperTextMode.md): `"normal"` \| `"error"` \| `"warning"`

You can also show information about error or warning description of the group. Default is `"normal"`

```tsx
import {
  useState,
} from 'react'

import {
  RadioButtonGroup,
  type RadioButtonGroupHelperTextMode,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    [helperTextMode, setHelperTextMode] =
      useState<RadioButtonGroupHelperTextMode>('normal')

  return (
    <RadioButtonGroup
      legend="Group Label"
      helperText={ mapHelperText[helperTextMode] }
      helperTextMode={ helperTextMode }
    >
      <RadioButtonGroup.Item
        label="bbc"
        // you can reuse helperTextMode for interactiveState of CheckboxInput
        interactiveState={ helperTextMode }
      />
      <RadioButtonGroup.Item
        label="prambors"
        interactiveState={ helperTextMode }
      />
    </CheckboxGroup>
  )
}

const mapHelperText: Record<CheckboxGroupHelperTextMode, string> = {
  normal: 'Description of the group',
  error: 'You are doing something wrong',
  warning: 'Please, don\'t do this',
}
```

## Props

### RadioButtonGroupProps

See [`RadioButtonGroupProps`](../../definitions/interfaces/RadioButtonGroupProps.md)

### RadioButtonGroupItemProps

The `<RadioButtonGroup.Item>` inherits from the `<RadioButton>` component, but it omitted some props

See [`RadioButtonGroupItemProps`](../../definitions/interfaces/RadioButtonGroupItemProps.md)