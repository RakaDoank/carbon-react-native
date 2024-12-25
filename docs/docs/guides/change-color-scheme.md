---
slug: /guides/change-color-scheme
sidebar_position: 2
---

# Change Color Scheme

Like the most app, there is a option to change your app look, like Light Mode or Dark Mode or other mode probably.

This library is already detect what color scheme in the user system natively with [`useColorScheme`](https://reactnative.dev/docs/usecolorscheme) hook, but it's resolved with this map
- `"light"` -> `GRAY_10`
- `"dark"` -> `GRAY_100`
- `null` -> `GRAY_10`

But, you are able to change color scheme by your own logic. Like you want have a feature to control the color scheme by user with three options, such as System Default, Light, and Dark.

On the `<CarbonReactNative>` in the root of React tree, you can pass `colorScheme` prop with `GRAY_10` or `GRAY_100` value

```tsx
import {
  CarbonReactNative,
} from '@rakadoank/carbon-react-native'

export default function App() {
  const [isDark, setIsDark] = useState(true)
  return (
    <CarbonReactNative colorScheme={ isDark ? 'GRAY_100' : 'GRAY_10' }>
      { /* the rest of your react */ }
    </CarbonReactNative>
  )
}
```

:::warning
Be aware of updating a React state in the root tree. It may causes unresponsive JavaScript thread. You can refer on the React Native performance docs https://reactnative.dev/docs/performance#js-frame-rate-javascript-thread
:::