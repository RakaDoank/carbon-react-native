import type {
	ViewStyle,
} from 'react-native'

import type {
	EasingFunction,
	EasingFunctionFactory,
	SharedValue,
} from 'react-native-reanimated'

import type {
	DialogProviderAnimationConfig,
} from './DialogProviderAnimationConfig'

export interface DialogProviderReanimatedConfig extends DialogProviderAnimationConfig {
	/**
	 * Input range interpolation:
	 * - `0` -> Unmounted style
	 * - `1` -> Mounted style
	 * - `2` -> Hidden behind of the next dialog
	 * 
	 * This function will be run on UI Thread
	 * 
	 * @default DialogAnimationConfigs.Reanimated.CarbonReact.modalAnimatedStyle
	 */
	readonly modalStyleFactory: (
		sharedValue: SharedValue<0 | 1 | 2>,
		inputRange: readonly [0, 1, 2],
	) => ViewStyle,

	/**
	 * You can pass a single easing or consists of three easings of array
	 * 
	 * Indexes:
	 * - `0` -> Unmounted easing
	 * - `1` -> Mounted easing
	 * - `2` -> Unmounted easing for being stacked behind of the next dialog
	 * 
	 * @default DialogAnimationConfigs.CarbonReact.portalEasing
	 */
	readonly modalEasing?:
		| EasingType
		| [EasingType, EasingType, EasingType],
}

type EasingType = EasingFunction | EasingFunctionFactory
