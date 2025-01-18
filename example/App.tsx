import {
	View,
	Text,
} from 'react-native'
import {
	CarbonReactNative,
	Text as T,
} from '@raka/carbon-react-native'

const test = ''

export default function App() {

	return (
		<CarbonReactNative>
			<View style={{ backgroundColor: '' }}>
				<T type="body_01">
					Testing lah
				</T>
			</View>
		</CarbonReactNative>
	)

}
