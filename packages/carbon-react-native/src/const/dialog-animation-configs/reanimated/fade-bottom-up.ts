import {
	Motion,
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	Easing,
	interpolate,
} from 'react-native-reanimated'

import type {
	DialogProviderReanimatedConfig,
} from '../../../providers/dialog/DialogProviderReanimatedConfig'

export const FadeBottomUp = {
	duration: Motion.Duration.moderate_02,
	modalStyleFactory(sharedValue, inputRange) {
		'worklet'
		return {
			opacity: interpolate(
				sharedValue.value,
				inputRange,
				[0, 1, 0],
			),
			transform: [{
				translateY: interpolate(
					sharedValue.value,
					inputRange,
					[Spacing.spacing_04, 0, Spacing.spacing_04],
				),
			}],
		}
	},
	modalEasing: Easing.bezier(
		Motion.Easing.entrance.expressive.x1,
		Motion.Easing.entrance.expressive.y1,
		Motion.Easing.entrance.expressive.x2,
		Motion.Easing.entrance.expressive.y2,
	),
} as const satisfies Required<DialogProviderReanimatedConfig>
