import type {
	Preview,
} from '@storybook/react-native-web-vite'

import {
	CarbonReactNative,
} from '@audira/carbon-react-native'

import {
	Color,
} from '@audira/carbon-react-native-elements'

import './body.css'
import './font.css'

export default {

	decorators: [
		(Story, context) => {
			return (
				<CarbonReactNative
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					colorScheme={ context.globals.backgrounds.value === 'dark' ? 'gray_100' : 'gray_10' }
				>
					<Story/>
				</CarbonReactNative>
			)
		},
	],

	parameters: {
		backgrounds: {
			options: {
				dark: {
					name: 'gray-100',
					value: Color.Token.gray_100.background,
				},
				light: {
					name: 'gray-10',
					value: Color.Token.gray_10.background,
				},
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
			expanded: true,
		},
		docs: {
			codePanel: true,
			toc: {
				headingSelector: 'h1, h2, h3',
			},
		},
	},

	initialGlobals: {
		backgrounds: {
			value: 'light',
		},
	},

} satisfies Preview
