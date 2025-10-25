import {
	Easing,
} from 'react-native'

import {
	Motion,
	Spacing,
} from '@audira/carbon-react-native-elements'

import type {
	DialogProviderAnimationConfig,
} from '../../providers/dialog/DialogProviderAnimationConfig'

export const FadeBottomUp2 = {
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
					outputRange: [Spacing.spacing_04, 0, -Spacing.spacing_04],
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
} as const satisfies Required<DialogProviderAnimationConfig>
