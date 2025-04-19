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
	ToastProvider,
} from '@audira/carbon-react-native'

import {
	NavigationBootstrap,
} from '@/bootstraps'

export function Example() {

	return (
		<SafeAreaProvider>
			<CarbonReactNative>
				<ToastProvider>
					<BackgroundView>
						<NavigationBootstrap/>
					</BackgroundView>
				</ToastProvider>
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

const style = StyleSheet.create({
	rootView: {
		backgroundColor: StyleSheet.color.background,
	},
})
