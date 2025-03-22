---
slug: /guides/using-core-component-props
sidebar_position: 4
---

# Using Core Component Props

All components of Carbon React Native are created using the React Native primitive or core components, such as [View](https://reactnative.dev/docs/view), [Pressable](https://reactnative.dev/docs/pressable), etc, but it also **inherits** and **extends** all the base props of those primitive components. So, all props of the core component are available to use, but with some exceptionals.

## Keep it in mind!
As an example, the [Accordion](../components/accordion.md) component is using [View](https://reactnative.dev/docs/view) as the container of its children and has `flushAlignment`, and `size` props, but it also has all the member of [View's Props](https://reactnative.dev/docs/view#props) such as `onLayout`, `style`, and other props

```tsx
import {
  StyleSheet,
} from 'react-native'

import {
  Accordion,
  SpacingConstant,
  type AccordionProps,
} from '@rakadoank/carbon-react-native'

export interface ComponentProps {
  /**
   * Same as ViewProps['style']
   */
  style?: AccordionProps['style'],
}

export default function Component({
  style,
}: ComponentProps) {

  /**
   * AccordionProps['onLayout'] is same as ViewProps['onLayout']
   */
  const onLayout: AccordionProps['onLayout'] = event => {
    console.log('Layout: ', event.nativeEvent.layout)
  }

  return (
    <Accordion
      size="large"
      onLayout={ onLayout }
      style={ [
        baseStyle.exampleStyle,
        style,
      ] }
    >
      <Accordion.Item
        title="Item 1"
        onMagicTap={ event => console.log('onMagicTap only for iOS') }
      >
        { /* content */ }
      </Accordion.Item>
    </Accordion>
  )

}

const baseStyle = StyleSheet.create({
  exampleStyle: {
    marginVertical: SpacingConstant.spacing_05,
  },
})
```

## Omitted Props
Although, this library inherits and extends all the core component props. There is also some exceptionals that you can't use like on the core component props.

For example, [Button](../components/button.md) component inherits and extends from the [Pressable](https://reactnative.dev/docs/pressable) component. While, it has all the props available on [Pressable's Props](https://reactnative.dev/docs/pressable#props), it doesn't has the `children` prop, since [Button](../components/button.md) component is not intended to be filled with any children

```tsx
import {
  Button,
  Text,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <Button.Primary
      text="Hello World"
      onLongPress={ event => console.log('on long pressed ', event) }
    >
      { /* Error reports will be issued by TypeScript compiler and ESLint */ }
      { /* Even if you only use JavaScript without ESLint, this child means nothing */ }
      <Text>
        Lorem Ipsum
      </Text>
    </Button.Primary>
  )
}
```

:::info
You can check each component props in the [definitions](/definitions) page, likely on the interfaces section.
:::