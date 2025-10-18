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

/**
 * Same animation style like `@carbon/react` library
 */
export const CarbonReact = {
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
					[-Spacing.spacing_06, 0, -Spacing.spacing_06],
				),
			}],
		}
	},
	modalEasing: [
		Easing.bezier(
			Motion.Easing.exit.expressive.x1,
			Motion.Easing.exit.expressive.y1,
			Motion.Easing.exit.expressive.x2,
			Motion.Easing.exit.expressive.y2,
		),
		Easing.bezier(
			Motion.Easing.entrance.expressive.x1,
			Motion.Easing.entrance.expressive.y1,
			Motion.Easing.entrance.expressive.x2,
			Motion.Easing.entrance.expressive.y2,
		),
		Easing.bezier(
			Motion.Easing.exit.expressive.x1,
			Motion.Easing.exit.expressive.y1,
			Motion.Easing.exit.expressive.x2,
			Motion.Easing.exit.expressive.y2,
		),
	],
} as const satisfies Required<DialogProviderReanimatedConfig>
