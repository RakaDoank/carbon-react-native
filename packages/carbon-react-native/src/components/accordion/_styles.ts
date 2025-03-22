import {
	StyleSheet,
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

/**
 * Sorry for named it %margin% but it is actually using padding  
 * https://carbondesignsystem.com/components/accordion/style/#margin-right
 */
export const MarginRightStyle =
	StyleSheet.create({
		large: {
			paddingRight: '25%',
		},
		range_420_640: {
			paddingRight: Spacing.spacing_10,
		},
		small: {
			paddingRight: Spacing.spacing_05,
		},
	})
