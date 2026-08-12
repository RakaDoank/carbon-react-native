import {
	useContext,
	useEffect,
} from "react"

import {
	ScrollView,
	StatusBar,
	StyleSheet,
} from "react-native"

import type {
	// Decorator,
	Preview,
} from "@storybook/react-native"

import {
	CarbonReactNative,
	CarbonStyleSheet,
	ThemeContext,
} from "@audira/carbon-react-native"

import {
	SafeAreaProvider,
} from "react-native-safe-area-context"

const preview: Preview = {
	decorators: [
		Story => (
			<SafeAreaProvider>
				<CarbonReactNative>
					<Body>
						<Story/>
					</Body>
				</CarbonReactNative>
			</SafeAreaProvider>
		),
	],

	parameters: {
		docs: {
			codePanel: true,
		},
	},
}

export default preview
interface BodyProps {
	// Story: Parameters<Decorator>[0],
	children?: React.ReactNode,
}
function Body({
	children,
}: BodyProps) {

	const
		themeContext =
			useContext(ThemeContext)

	useEffect(() => {
		StatusBar.setBarStyle(
			themeContext.colorScheme == "gray_10"
				? "dark-content"
				: "light-content",
		)
	}, [
		themeContext.colorScheme,
	])

	return (
		<ScrollView
			style={ [styleSheet.root, carbonStyleSheet.root] }
			contentContainerStyle={ styleSheet.scrollContentContainer }
		>
			{ children }
		</ScrollView>
	)

}

const
	styleSheet =
		StyleSheet.create({
			root: {
				flex: 1,
			},
			scrollContentContainer: {
				flexGrow: 1,
				flexShrink: 1,
				flexBasis: "auto",
			},
		}),

	carbonStyleSheet =
		CarbonStyleSheet.create({
			root: {
				backgroundColor: CarbonStyleSheet.color.background,
			},
		})
