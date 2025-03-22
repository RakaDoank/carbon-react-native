---
slug: /components/accordion
---

# Accordion

Accordion is a group of vertically list of headers that can reveal or hide associated sections of content. You can use accordion by using [`Accordion`](../definitions/functions/Accordion.md) as parent, and `Accordion.Item` as children.

```tsx
import {
    Accordion,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  return (
    <Accordion
      size="medium"
      flushAlignment={ false }
    >
      <Accordion.Item
        title="Item 1 Title"
        open // let open by default
      >
        {/* content */}
      </Accordion.Item>

      <Accordion.Item
        title="Item 2 Title"
      >
        { /* content */ }
      </Accordion.Item>
    </Accordion>
  )

}
```

While you can write like the example above, you probably want to create custom component for any readibility reasons or to improve rendering performance in case for the specific accordion item has its own logic, something like with updating state

```tsx
import {
  Accordion,
} from '@rakadoank/carbon-react-native'

export default function Accordion() {

  return (
    <Accordion>
      <SpecialAccordionItem/>

      <Accordion.Item
        title="Non special accordion item"
      >
        { /* content */ }
      </Accordion.Item>
    </Accordion>
  )

}

function SpecialAccordionItem() {

  // any logics here

  return (
    <Accordion.Item title="Special Accordion">
      { /* content */ }
    </Accordion.Item>
  )

}
```

## Revealing / Hiding Control

`Accordion.Item` component is **uncontrolled by default**. Users should be able to interact to the item by clicking the header to reveal or hide its content. If you want to control this behaviour, you can pass [`controlled`](../definitions/interfaces/AccordionItemProps.md#controlled) prop with true value and [`open`](../definitions/interfaces/AccordionItemProps.md#open) prop to the `Accordion.Item`

```tsx
import {
  useState,
} from 'react'

import {
  View,
} from 'react-native'

import {
  Accordion,
  Button,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    [items, setItems] =
      useState<boolean[]>([false, false]),

    toggleItem =
      (index: number) => {
        setItems(currentItems => {
          const newItems = currentItems.slice()
          newItems[index] = !newItems[index]
          return newItems
        })
      }

  return (
    <View> 
      <Button.Primary
        text="Open All"
        onPress={ () => setItems([true, true]) }
      />

      <Accordion>
        <Accordion.Item
          controlled
          open={ items[0] }
          onPressHeader={ () => toggleItem(0) }
        >
            { /* content */ }
        </Accordion.Item>

        <Accordion.Item
          controlled
          open={ items[1] }
          onPressHeader={ () => toggleItem(1) }
        >
            { /* content */ }
        </Accordion.Item>
      </Accordion>
    </View>
  )

}
```

:::warning
If you don't pass `controlled` prop with true value, the `open` prop value only be used once for initial render, either expanded or closed
:::

### Imperative Handle

If you doesn't want re-rendering like updating state, you still can control the accordion item to reveal or hide its content, but imperatively. The `Accordion.Item` component holds `View` ref and extends the ref to provide a method to reveal or hide its content

```tsx
import {
  useRef,
} from 'react'

import {
  View,
} from 'react-native'

import {
  Accordion,
  Button,
  type AccordionItemRef,
} from '@rakadoank/carbon-react-native'

export default function Component() {

  const
    accordionFirstItemRef =
      useRef<AccordionItemRef>(null),

    toggleAccordionFirstItem =
      () => {
        accordionFirstItemRef.current?.setOpen(open => !open) // it also accepts boolean argument, instead of callback with boolean returned
      }

  return (
    <View>
      <Button.Primary
        text="Toggle"
        onPress={ toggleAccordionFirstItem }
      />

      <Accordion>
        <Accordion.Item
          title="Item 1"
          ref={ accordionFirstItemRef }
        >
          { /* content */ }
        </Accordion.Item>
      </Accordion>
    </View>
  )

}
```

See [`AccordionItemRef`](../definitions/interfaces/AccordionItemRef)

## Flush Alignment

According to the [Carbon Design System](https://carbondesignsystem.com/components/accordion/usage/#alignment), use flush alignment when designing within smaller spaces on a page such as side panels or sidebars to achieve better text alignment with other content.

You can pass `flushAlignment` prop to the `Accordion` with boolean value

```tsx
import {
    Accordion,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <Accordion flushAlignment>
      <Accordion.Item
        open
        title="Item 1"
      >
        { /* content */ }
      </Accordion.Item>
      <Accordion.Item
        title="Item 2"
      >
        { /* content */ }
      </Accordion.Item>
    </Accordion>
  )
}
```

## Sizes

> [**AccordionSize**](../definitions/type-aliases/AccordionSize.md): `"small"` \| `"medium"` \| `"large"`

`Accordion` has three size options, which are *small*, *medium*, and *large*. You can pass `size` prop to the `Accordion` with the one of the options available

```tsx
import {
    Accordion,
} from '@rakadoank/carbon-react-native'

export default function Component() {
  return (
    <Accordion size="large">
      <Accordion.Item
        open
        title="Item 1"
      >
        { /* content */ }
      </Accordion.Item>
      <Accordion.Item
        title="Item 2"
      >
        { /* content */ }
      </Accordion.Item>
    </Accordion>
  )
}
```

## Props

### AccordionProps
See [`AccordionProps`](../definitions/interfaces/AccordionProps.md)

### AccordionItemProps
See [`AccordionItemProps`](../definitions/interfaces/AccordionItemProps.md)