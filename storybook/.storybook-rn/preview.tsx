import {
	useContext,
	useEffect,
} from 'react'

import {
	ScrollView,
	StatusBar,
	StyleSheet,
} from 'react-native'

import type {
	Decorator,
	Preview,
} from '@storybook/react-native'

import {
	CarbonReactNative,
	CarbonStyleSheet,
	ThemeContext,
} from '@audira/carbon-react-native'

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

	const
		themeContext =
			useContext(ThemeContext)

	useEffect(() => {
		StatusBar.setBarStyle(
			themeContext.colorScheme == 'gray_10'
				? 'dark-content'
				: 'light-content',
		)
	}, [
		themeContext.colorScheme,
	])

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
