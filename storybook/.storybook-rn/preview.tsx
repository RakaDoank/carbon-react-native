import {
	StyleSheet,
	ScrollView,
	StatusBar,
} from 'react-native'

import type {
	Decorator,
	Preview,
} from '@storybook/react-native'

import {
	CarbonReactNative,
	CarbonStyleSheet,
} from '@audira/carbon-react-native'

StatusBar.setBarStyle('dark-content')

export default {
	decorators: [
		Story => (
			<CarbonReactNative>
				<Body
					Story={ Story }
				/>
			</CarbonReactNative>
		),
	],

	parameters: {
		docs: {
			codePanel: true,
		},
	},
} satisfies Preview

interface BodyProps {
	Story: Parameters<Decorator>[0],
}
function Body(props: BodyProps) {

	CarbonStyleSheet.use()

	return (
		<ScrollView
			style={ [styleSheet.root, carbonStyleSheet.root] }
		>
			<props.Story/>
		</ScrollView>
	)

}

const
	styleSheet =
		StyleSheet.create({
			root: {
				padding: 16,
			},
		}),

	carbonStyleSheet =
		CarbonStyleSheet.create({
			root: {
				backgroundColor: CarbonStyleSheet.color.background,
			},
		})
