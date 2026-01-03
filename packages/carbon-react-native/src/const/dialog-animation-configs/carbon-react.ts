import {
	Easing,
} from "react-native"

import {
	Motion,
	Spacing,
} from "@audira/carbon-react-native-elements"

import type {
	DialogProviderAnimationConfig,
} from "../../providers/dialog/DialogProviderAnimationConfig"

/**
 * Same animation style like `@carbon/react` library
 */
export const CarbonReact = {
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
					outputRange: [-Spacing.spacing_06, 0, -Spacing.spacing_06],
				}),
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
} as const satisfies Required<DialogProviderAnimationConfig>
