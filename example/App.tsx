import {
	View,
} from 'react-native'

import {
	CarbonReactNative,
	Text as T,
} from '@raka/carbon-react-native'

export default function App() {

	return (
		<CarbonReactNative>
			<View style={{ marginTop: 100 }}>
				<T type="heading_02">
					Carbon Design System
				</T>
			</View>
		</CarbonReactNative>
	)

}
