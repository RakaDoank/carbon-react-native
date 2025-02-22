import {
	useContext,
} from 'react'

import {
	View,
} from 'react-native'

import {
	SafeAreaProvider,
} from 'react-native-safe-area-context'

import {
	CarbonReactNative,
	FlexStyle,
	StyleSheet,
	ThemeContext,
} from '@audira/carbon-react-native'

import {
	NavigationBootstrap,
} from '@/bootstraps'

export function Example() {

	return (
		<SafeAreaProvider>
			<CarbonReactNative>
				<BackgroundView>
					<NavigationBootstrap/>
				</BackgroundView>
			</CarbonReactNative>
		</SafeAreaProvider>
	)

}

interface BackgroundViewProps {
	children?: React.ReactNode,
}

function BackgroundView({
	children,
}: BackgroundViewProps) {

	useContext(ThemeContext)

	return (
		<View
			style={ [
				style.rootView,
				FlexStyle.flex_1,
			] }
		>
			{ children }
		</View>
	)

}

const style = StyleSheet.create(color => ({
	rootView: {
		backgroundColor: color.background,
	},
}))
