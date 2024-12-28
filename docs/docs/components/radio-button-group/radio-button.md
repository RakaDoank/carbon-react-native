---
slug: /components/radio-button
---

# Radio Button

:::warning
In common usage, radio button usually represent a group of mutually exclusive choices, compared to checkboxes that user is able to select one or more.

Probably you only need [`RadioButtonGroup`](./index.md) instead of manually building group of radio buttons.
:::

[`RadioButton`](../../definitions/functions/RadioButton.md) component is a composed component of [`RadioButtonInput`](./radio-button-input.md) and [`FormLabel`](../../definitions/functions/FormLabel.md). You can build a radio button quickly with this component

```tsx
import {
  RadioButton,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <RadioButton
      value="bbc"
      label="Radio Label"
    />
  )
}
```

## Props

See [`RadioButtonProps`](../../definitions/interfaces/RadioButtonProps.md)