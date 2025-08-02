import type {
	Preview,
} from '@storybook/react-native-web-vite'

import './font.css'

export default {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
} satisfies Preview
