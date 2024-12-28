---
slug: /components/radio-button-input
---

# Radio Button Input

:::warning
In common usage, radio button usually represent a group of mutually exclusive choices, compared to checkboxes that user is able to select one or more.

Probably you only need [`RadioButtonGroup`](./index.md) instead of manually building group of radio buttons.
:::

This component provides only the circle input. Mostly, this component is suited your needs if you only want to render the circle

```tsx
import {
  RadioButtonInput,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <RadioButtonInput value="bbc"/>
  )
}
```

This component is actually similar as the [`RadioButton`](./radio-button.md). The only difference is you can't put label on this component.

## Props

See [`RadioButtonInputProps`](../../definitions/interfaces/RadioButtonInputProps.md)