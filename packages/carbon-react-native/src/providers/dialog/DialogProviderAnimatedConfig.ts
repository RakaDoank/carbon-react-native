import type {
	Animated,
	EasingFunction,
	ViewStyle,
} from 'react-native'

import type {
	DialogProviderAnimationConfig,
} from './DialogProviderAnimationConfig'

export interface DialogProviderAnimatedConfig extends DialogProviderAnimationConfig {
	/**
	 * Input range interpolation:
	 * - `0` -> Unmounted style
	 * - `1` -> Mounted style
	 * - `2` -> Hidden behind of the next dialog
	 * 
	 * @default DialogAnimationConfigs.Animated.CarbonReact.modalAnimatedStyle
	 */
	readonly modalStyleFactory: (
		animatedValue: Animated.Value,
		/**
		 * @example [0, 1, 2]
		 */
		inputRange: number[],
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
		| EasingFunction
		| [EasingFunction, EasingFunction, EasingFunction],
}
