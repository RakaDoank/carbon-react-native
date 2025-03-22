---
slug: /installation
sidebar_position: 2
---

# Installation

This project is still in development and not released yet on npm registry. You have to install it manually,
1. Clone or Download this [repository](https://github.com/RakaDoank/carbon-react-native)
2. Inside this project, run this command to create actual npm package
```
node ./carbon-react-native/scripts/local-development
```
3. Copy the `.carbon-react-native` directory (the output result of command above) to your project, and place it inside your React Native project directory
4. On your project directory, install the library by this command
  ```
  npm install --save ./.carbon-react-native
  ```
Ensure it is the correct path

5. Install the `IBM Plex Sans` font to your project with `react-native.config.js` file (create it on your root project directory if doesn't exist)
```js
module.exports = {
  assets: [
    './node_modules/@rakadoank/carbon-react-native/assets/fonts/',
  ],
}
```

## Install Library Dependencies

This library depends on these external libraries. Install these dependencies on your project, (skip one of these if it's already installed)
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [react-native-svg](https://github.com/software-mansion/react-native-svg)
- [@carbon/icons](https://www.npmjs.com/package/@carbon/icons)
- [@carbon/icon-helpers](https://www.npmjs.com/package/@carbon/icon-helpers)

## Initialize

Wrap your whole React App once with `<CarbonReactNative>`
```tsx
// Somewhere like in your App.tsx file
import {
  CarbonReactNative,
} from '@rakadoank/carbon-react-native'

export default function App() {
  return (
    <CarbonReactNative>
      { /* the rest of your react */ }
    </CarbonReactNative>
  )
}
```
:::info
This library depends on React Context to provide color token correctly based on the current color scheme. By doing this, this library can provide the color tokens and make this library internally and you can use the color token.
:::

Yeay :tada:. You can start your app now!

## Step Ahead
Next, you can read library guide. [Bring me](/guides)