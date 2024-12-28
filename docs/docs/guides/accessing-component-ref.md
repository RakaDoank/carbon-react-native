---
slug: /guides/accessing-component-ref
sidebar_position: 4
---

# Accessing Component Ref

Like [using core component props](./using-core-component-props.md), all components of this library is also **inherits** and **extends** the primitive or core components ref of React Native. This is make developers are allowed to use ref methods or all ref members that available such as `.measure()` of a `View`, and also custom methods or members of a Carbon component, such as imperative handle

## Getting Component Ref

There is no difference on the React side, you can hold a ref of any [components](../components/index.md) using [`useRef`](https://react.dev/reference/react/useRef). As an example, you want to get `View` reference of a [`RadioButtonGroup`](../components/radio-button-group/index.md) component

```tsx
import {
  useRef,
} from 'react'

import {
  RadioButtonGroup,
  type RadioButtonGroupRef,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    radioButtonGroupRef =
      useRef<RadioButtonGroupRef>(null)

  return (
    <RadioButtonGroup
      ref={ radioButtonGroupRef }
    >
      <RadioButtonGroup.Item
        value="bbc"
        label="Radio 1"
      />
      <RadioButtonGroup.Item
        value="soho"
        label="Radio 2"
      />
      <RadioButtonGroup.Item
        value="prambors"
        label="Radio 3"
      />
    </RadioButtonGroup>
  )

}
```

You can use all members of View reference that available, like `.measure()`, et cetera since [`RadioButtonGroup`](../definitions/functions/RadioButtonGroup.md) is just a `View` as a wrapper for their radio button items.

For the component ref definitions, you can check any components ref at [definitions](../definitions/index.md) page. It likely on the interfaces section. It is named with prefix `ComponentName` and postfix `Ref` at the end. For example, you want to get ref definitions of [`Checkbox`](../definitions/functions/Checkbox.md) component, the ref is named [`CheckboxRef`](../definitions/interfaces/CheckboxRef.md).

## Using Methods/Members of Component Ref

In the example [getting component ref](#getting-component-ref) at above, [`RadioButtonGroupRef`](../definitions/interfaces/RadioButtonGroupRef.md) also **extends** the View reference to provide a handle to set which one of radio button items will be selected or not selected at all without React state, even you can get current selected value

```tsx
import {
  useRef,
} from 'react'

import {
  Button,
  RadioButtonGroup,
  type RadioButtonGroupRef,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    radioButtonGroupRef =
      useRef<RadioButtonGroupRef>(null),

    buttonGetSelectedValuePress: Button.SecondaryProps['onPress'] =
      event => {
        console.log(
          'Current selected radio value is: ',
          radioButtonGroupRef.current?.selectedValue,
        )

        radioButtonGroupRef.current?.measure((
          x,
          y,
          width,
          height,
          pageX,
          pageY,
        ) => {
          console.log(
            'I also want to know the height of RadioButtonGroup. The height is: ',
            height,
          )
        })
      },

    buttonResetSelectedValuePress: Button.PrimaryProps['onPress'] =
      event => {
        radioButtonGroupRef.current?.setSelectedValue(undefined) // it also accepts callback with value returned
      }

  return (<>
    <Button.Secondary
      text="Get Selected Value"
      onPress={ buttonGetSelectedValuePress }
    />

    <Button.PrimaryDanger
      text="Reset"
      onPress={ buttonResetSelectedValuePress }
    />

    <RadioButtonGroup
      ref={ radioButtonGroupRef }
    >
      <RadioButtonGroup.Item
        value="bbc"
        label="Radio 1"
      />
      <RadioButtonGroup.Item
        value="soho"
        label="Radio 2"
      />
      <RadioButtonGroup.Item
        value="prambors"
        label="Radio 3"
      />
    </RadioButtonGroup>
  </>)

}
```