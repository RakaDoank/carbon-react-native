---
slug: /guides/change-color-scheme
sidebar_position: 1
---

# Change Color Scheme

Like the most app, there is a option to change your app look, like Light Mode or Dark Mode or other mode probably.

This library is already detect what color scheme in the user system natively with [`useColorScheme`](https://reactnative.dev/docs/usecolorscheme) hook, and it's resolved with this map
- `"light"` -> `gray_10`
- `"dark"` -> `gray_100`
- `null` -> `gray_10`

You are able to change color scheme by your own logic. Like you want have a feature to control the color scheme by user with three options, such as System Default, Light, and Dark.

On the `<CarbonReactNative>` in the root of React tree, you can pass `colorScheme` prop with `gray_10` or `gray_100` value

```tsx
import {
  CarbonReactNative,
} from '@rakadoank/carbon-react-native'

export default function App() {
  const [isDark, setIsDark] = useState(true)
  return (
    <CarbonReactNative
      colorScheme={ isDark ? 'gray_100' : 'gray_10' }
      // pass undefined to let library solve back automatically
    >
      { /* the rest of your react */ }
    </CarbonReactNative>
  )
}
```

:::warning
Be aware of updating a React state in the root tree. It may causes unresponsive JavaScript thread. Refer to the React Native performance docs https://reactnative.dev/docs/performance#js-frame-rate-javascript-thread
:::