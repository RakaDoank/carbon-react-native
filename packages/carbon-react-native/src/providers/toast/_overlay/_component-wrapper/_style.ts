import {
	Platform,
	StyleSheet,
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

export const Style =
	StyleSheet.create({
		componentWrapper: {
			position: 'absolute',
			top: Spacing.spacing_03,
			left: '100%',
			width: 'auto',
			...Platform.select({
				web: {
					flexDirection: 'row',
				},
			}),
		},
	})
