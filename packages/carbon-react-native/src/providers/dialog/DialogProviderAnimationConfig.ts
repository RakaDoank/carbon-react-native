import type {
	ViewStyle,
} from 'react-native'

import type {
	EasingFunction,
	EasingFunctionFactory,
	SharedValue,
} from 'react-native-reanimated'

export interface DialogProviderAnimationConfig {
	/**
	 * You can pass a single duration or consists of three durations of array
	 * 
	 * Indexes:
	 * - `0` -> Unmounted easing
	 * - `1` -> Mounted easing
	 * - `2` -> Unmounted easing for being stacked behind of the next dialog
	 * 
	 * Value in milliseconds
	 * @default DialogAnimationConfigs.CarbonReact.duration
	 */
	readonly duration?: number | [number, number, number],
	/**
	 * Input range indexes:
	 * - `0` -> Unmounted style
	 * - `1` -> Mounted style
	 * - `2` -> Unmounted style for being stacked behind of the next dialog
	 * 
	 * This function will be run on UI Thread
	 * 
	 * @default DialogAnimationConfigs.CarbonReact.modalAnimatedStyle
	 */
	readonly modalAnimatedStyle: (
		sharedValue: SharedValue<0 | 1 | 2>,
		inputRange: readonly [0, 1, 2],
	) => ViewStyle
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
		| [ EasingType, EasingType, EasingType ],
}

type EasingType = EasingFunction | EasingFunctionFactory
