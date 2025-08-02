import type {
	Preview,
} from '@storybook/react-native-web-vite'

import {
	CarbonReactNative,
} from '@audira/carbon-react-native'

import './font.css'

export default {

	decorators: [
		Story => (
			<CarbonReactNative colorScheme="gray_10">
				<Story/>
			</CarbonReactNative>
		),
	],

	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},

} satisfies Preview
