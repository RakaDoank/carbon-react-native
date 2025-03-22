---
slug: /components/checkbox-input
---

# Checkbox Input

This component provides only the box input. Mostly, this component is suited your needs if you only want to render the box

```tsx
import {
  CheckboxInput,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <CheckboxInput
      value // make it ticked initially
    />
  )
}
```

This component is actually similar as the [`Checkbox`](./index.md), even in usage. The only difference is you can't put label on this component.

See [`Checkbox`](./index.md) for usage informations.

## Props

See [`CheckboxInputProps`](../../definitions/interfaces/CheckboxInputProps.md)