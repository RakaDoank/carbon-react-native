---
slug: /components/checkbox-group
---

# Checkbox Group

Checkbox group component is a view container of multiple checkboxes with group label and optionally with helper text. You can see the [anatomy](https://carbondesignsystem.com/components/checkbox/usage/#anatomy)

```tsx
import {
  CheckboxGroup,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  return (
    <CheckboxGroup legend="Group Label">
      <CheckboxGroup.Item
        label="Checkbox 1"
      />
      <CheckboxGroup.Item
        label="Checkbox 2"
      />
    </CheckboxGroup>
  )

}
```

Do not be confused of that `<CheckboxGroup.Item>`. It is same as the [`<Checkbox>`](./index.md)

:::warning
Currently, it doesn't support of [nesting](https://carbondesignsystem.com/components/checkbox/usage/#nesting) the checkbox item. It will be supported later.
:::

## Stack Orientation

> [**CheckboxGroupProps['orientation']**](../../definitions/interfaces/CheckboxGroupProps.md#orientation)?: `"vertical"` \| `"horizontal"`

Checkboxes in a group will be stacked vertically, but also you can stacked horizontally. Default is `"vertical"`

```tsx
import {
  CheckboxGroup,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <CheckboxGroup
      orientation="horizontal"
      label="Group Label"
    >
      <CheckboxGroup.Item
          label="Checkbox 1"
      />
      <CheckboxGroup.Item
          label="Checkbox 2"
      />
    </CheckboxGroup>
  )
}
```

## Helper Text

You can show user a information about the group, like static description, or error and warning description. See the group state on the [checkbox behaviours](https://carbondesignsystem.com/components/checkbox/usage/#behaviors)

```tsx
import {
  CheckboxGroup,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <CheckboxGroup
      legend="Group Label"
      helperText="Description of the group"
    >
      <CheckboxGroup.Item
        label="Checkbox 1"
      />
      <CheckboxGroup.Item
        label="Checkbox 2"
      />
    </CheckboxGroup>
  )
}
```

### Helper Text Mode

> [**CheckboxGroupHelperTextMode**](../../definitions/type-aliases/CheckboxGroupHelperTextMode.md): `"normal"` \| `"error"` \| `"warning"`

You can also show information about error or warning description of the group. Default is `"normal"`

```tsx
import {
  useState,
} from 'react'

import {
  CheckboxGroup,
  type CheckboxGroupHelperTextMode,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    [helperTextMode, setHelperTextMode] =
      useState<CheckboxGroupHelperTextMode>('normal')

  return (
    <CheckboxGroup
      legend="Group Label"
      helperText={ mapHelperText[helperTextMode] }
      helperTextMode={ helperTextMode }
    >
      <CheckboxGroup.Item
        label="Checkbox 1"
        // you can reuse helperTextMode for interactiveState of CheckboxInput
        interactiveState={ helperTextMode }
      />
      <CheckboxGroup.Item
        label="Checkbox 2"
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

### CheckboxGroupProps

See [`CheckboxGroupProps`](../../definitions/interfaces/CheckboxGroupProps.md)

### CheckboxProps

The `<CheckboxGroup.Item>` is actually same as the `<Checkbox`> component

See [`CheckboxProps`](../../definitions/interfaces/CheckboxProps.md)