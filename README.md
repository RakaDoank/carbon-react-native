<h1 align="center">
  Carbon for React Native
</h1>

> This library is completely rewritten and not intended to be the replacement of the official [carbon-react-native](https://github.com/carbon-design-system/carbon-react-native). It is still in development and far from publish released.

Build React Native apps with component and shared patterns using Carbon.

## Documentation
Currently, the documentation is not written yet, but it will be documented soon after the development of this library is completed or in rc level.

## Compatibility
This library is just a pure JavaScript usage in React Native and only depends on the primitive React Native components with [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) and [react-native-svg](https://github.com/software-mansion/react-native-svg). It should compatible on all platforms available that can be built with React Native, but i cannot sure that. For the web only, [Carbon React](https://react.carbondesignsystem.com) is already there and do its best and solve a lot of accessibility feature.

## Installation
This project is not released yet on npm registry. You have to install it manually,
1. Clone or Download this repository and place it on your React Native project directory
2. Install the library by this command
  ```
  npm install --save ./carbon-react-native
  ```
Ensure it is the correct path based on what you're doing at the first step.

3. Install these peer dependencies on your React Native project, (skip one these library it if already installed)
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [react-native-svg](https://github.com/software-mansion/react-native-svg)
- [@carbon/icons](https://www.npmjs.com/package/@carbon/icons)
- [@carbon/icon-helpers](https://www.npmjs.com/package/@carbon/icon-helpers)

## Initialize
This library depends on React Context to use the color tokens correctly based on the current color scheme. You have to wrap your whole React App once with `<CarbonReactNative>`
```tsx
// Somewhere like in your App.tsx file
import {
  CarbonReactNative,
} from '@rakadoank/carbon-react-native'

export default function App() {
  return (
    <CarbonReactNative>
      { /* your app is here */ }
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
} from '@rakadoank/carbon-react-native'

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

### Color Token
You can use current color token based on what color scheme which are `Gray 10` and `Gray 100`. It is available by using `ThemeContext` that are already provided by `CarbonReactNative`.
```tsx
import {
  useContext,
} from 'react'

import {
  Text,
  ThemeContext,
} from '@rakadoank/carbon-react-native'

export default function YourReactComponent() {
  const themeContext = useContext(ThemeContext)

  return (
    <Text type="label_01" style={{ color: themeContext.color.support_error }}>
      React Native
    </Text>
  )
}
```
All components are also made by using `ThemeContext` by the way. All members of the color is same as the official color tokens [here](https://carbondesignsystem.com/elements/color/tokens), but it is using underscore (_) instead of dash (-).

### Constants
You can use the constants are available which are `ColorConstant`, `SpacingConstant`, `TypographyConstant`, and `MotionConstant`. Refer to this [source](https://github.com/RakaDoank/carbon-react-native/tree/main/src/constants).
```tsx
import {
  StyleSheet,
  View,
} from 'react-native'

import {
  SpacingConstant,
} from '@rakadoank/carbon-react-native'

export default function YourReactComponent() {
  return (
    <View style={ style.container }>
      { /* other contents */ }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: SpacingConstant.spacing_05,
  },
})
```
