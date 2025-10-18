import {
	Easing,
} from 'react-native'

import {
	Motion,
	Spacing,
} from '@audira/carbon-react-native-elements'

import type {
	DialogProviderAnimatedConfig,
} from '../../../providers/dialog/DialogProviderAnimatedConfig'

export const FadeBottomUp = {
	duration: Motion.Duration.moderate_02,
	modalStyleFactory(animatedValue, inputRange) {
		return {
			opacity: animatedValue.interpolate({
				inputRange,
				outputRange: [0, 1, 0],
			}),
			transform: [{
				translateY: animatedValue.interpolate({
					inputRange,
					outputRange: [Spacing.spacing_04, 0, Spacing.spacing_04],
				}),
			}],
		}
	},
	modalEasing: Easing.bezier(
		Motion.Easing.entrance.expressive.x1,
		Motion.Easing.entrance.expressive.y1,
		Motion.Easing.entrance.expressive.x2,
		Motion.Easing.entrance.expressive.y2,
	),
} as const satisfies Required<DialogProviderAnimatedConfig>
