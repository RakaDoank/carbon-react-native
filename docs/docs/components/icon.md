---
slug: /components/icon
---

# Icon

In order to use `@carbon/icons`, you need to use this component

```tsx
import {
  Icon,
} from '@rakadoank/carbon-react-native'

import AddIcon from '@carbon/icons/es/add/20'

export default function Component() {
  return (
    <Icon
      src={ AddIcon }
      color="#ffffff" // white
      width={ 20 }
      height={ 20 }
    />
  )
}
```

[Icon](../definitions/classes/Icon.md) component inherits and extends the `SvgXml` component of [react-native-svg](https://github.com/software-mansion/react-native-svg). You can use all of `SvgXml` props that available, but the `xml` prop itself.

:::info
You can animate this component by using [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) if you want to. See [`createAnimatedComponent`](https://docs.swmansion.com/react-native-reanimated/docs/core/createAnimatedComponent)
:::

## Props

See [`IconProps`](../definitions/interfaces/IconProps.md)