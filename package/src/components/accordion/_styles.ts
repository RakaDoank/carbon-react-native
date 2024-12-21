import {
	StyleSheet,
} from 'react-native'

import {
	SpacingConstant,
} from '../../constants'

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
			paddingRight: SpacingConstant.spacing_10,
		},
		small: {
			paddingRight: SpacingConstant.spacing_05,
		},
	})
