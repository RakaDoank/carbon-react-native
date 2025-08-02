import type {
	Preview,
} from '@storybook/react-native'

import {
	CarbonReactNative,
} from '@audira/carbon-react-native'

export default {
	decorators: [
		Story => (
			<CarbonReactNative>
				<Story/>
			</CarbonReactNative>
		),
	],

	parameters: {
		docs: {
			codePanel: true,
		},
	},
} satisfies Preview
