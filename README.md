<h1 align="center">
  Carbon for React Native
</h1>

> This library is completely rewritten and not intended to be the replacement of the official [carbon-react-native](https://github.com/carbon-design-system/carbon-react-native)

> ⚠️ It is still in development

Build React Native apps with component and shared patterns using Carbon.

## Documentation
Soon the library will be documented with the Storybook

## Compatibility
This library is just a pure JavaScript usage in React Native and only depends on the primitive React Native components with [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) and [react-native-svg](https://github.com/software-mansion/react-native-svg). It should compatible on all platforms available that can be built with React Native, but i cannot sure that. For the web only, [Carbon React](https://react.carbondesignsystem.com) is already there and do its best and solve a lot of accessibility feature.

## Installation
Install the library to your project

with npm
```
npm install @audira/carbon-react-native @audira/carbon-react-native-elements
```

pnpm
```
pnpm install @audira/carbon-react-native @audira/carbon-react-native-elements
```

yarn
```
yarn add @audira/carbon-react-native @audira/carbon-react-native-elements
```

### Peer Dependencies

Install these dependencies on your React Native project, (skip one of these library if already installed)
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [react-native-svg](https://github.com/software-mansion/react-native-svg)
- [@carbon/icons](https://www.npmjs.com/package/@carbon/icons)
- [@carbon/icon-helpers](https://www.npmjs.com/package/@carbon/icon-helpers)

### Font Installation
Install the `IBM Plex Sans` font to your project with [react-native-asset](https://www.npmjs.com/package/react-native-asset). Update your `react-native.config.js` file (create it on your root project directory if doesn't exist)
```js
module.exports = {
  assets: [
    './node_modules/@audira/carbon-react-native/assets/fonts/',
  ],
}
```
Then, run `npx react-native-asset` to link the fonts

## Initialize
This library depends on React Context to use the color tokens correctly based on the current color scheme. You have to wrap your whole React App once with `<CarbonReactNative>`
```tsx
// Somewhere like in your App.tsx file
import {
  CarbonReactNative,
} from '@audira/carbon-react-native'

export default function App() {
  return (
    <CarbonReactNative>
      { /* the rest of your react */ }
    </CarbonReactNative>
  )
}
```

## Usage
### Components
Not all components are available yet, but you can test one of this library's component that are available
```tsx
import {
  Button,
} from '@audira/carbon-react-native'

import AddIcon from '@carbon/icons/es/add/20'

export default function YourReactComponent() {
  return (
    <Button.PrimaryDanger
      text="Press this"
      icon={ AddIcon }
    />
  )
}
```
While this library is still in development and there is no documentation available, this library is written in TypeScript. You can just refer to this [components source](https://github.com/RakaDoank/carbon-react-native/tree/main/src/components) for a while.

### Coloring StyleSheet
Instead of inline styles, you can also use color token from this library's `StyleSheet`. This is also recommended way to support [React Native for Web](https://necolas.github.io/react-native-web)'s to generate CSS
```tsx
import {
  useContext,
} from 'react'

import {
  StyleSheet,
  Text,
  ThemeContext,
} from '@audira/carbon-react-native'

export default function YourReactComponent() {
  /**
   * Keep this to make `style` prop reactive on color scheme change
   */
  StyleSheet.use()

  return (
    <Text type="label_01" style={ style.linkText }>
      React Native
    </Text>
  )
}

const style = StyleSheet.create({
  linkText: {
    color: StyleSheet.color.link_primary,
  },
})
```

### Elements
You can use elements are available which are `Color`, `Spacing`, `Typography`, and `Motion`. Refer to this [source](https://github.com/RakaDoank/carbon-react-native/tree/main/packages/carbon-react-native-elements/src)
```tsx
import {
  StyleSheet,
  View,
} from 'react-native'

import {
  Spacing,
} from '@audira/carbon-react-native-elements'

export default function YourReactComponent() {
  return (
    <View style={ style.container }>
      { /* other contents */ }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.spacing_05,
  },
})
```

### Change Color Scheme
`colorScheme`: `gray_10` | `gray_100`

This UI library will solve what color scheme on your project natively, with this map
- light theme -> `gray_10`
- dark theme -> `gray_100`

If you want override the colorScheme, as an example you only want to use the `gray_100` color scheme (dark mode only), you fill the prop with `gray_100` value
```tsx
import {
  CarbonReactNative,
} from '@audira/carbon-react-native'

export default function App() {
  return (
    <CarbonReactNative colorScheme="gray_100">
      { /* the rest of your react */ }
    </CarbonReactNative>
  )
}
```
