import type {
	Animated,
	EasingFunction,
	ViewStyle,
} from 'react-native'

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
	 * Input range interpolation:
	 * - `0` -> Unmounted style
	 * - `1` -> Mounted style
	 * - `2` -> Hidden behind of the next dialog
	 * 
	 * @default DialogAnimationConfigs.CarbonReact.modalStyleFactory
	 */
	readonly modalStyleFactory: (
		animatedValue: Animated.Value,
		/**
		 * @example [0, 1, 2]
		 */
		interpolationInputRange: number[],
	) => ViewStyle,

	/**
	 * You can pass a single easing or consists of three easings of array
	 * 
	 * Indexes:
	 * - `0` -> Unmounted easing
	 * - `1` -> Mounted easing
	 * - `2` -> Unmounted easing for being stacked behind of the next dialog
	 * 
	 * @default DialogAnimationConfigs.CarbonReact.modalEasing
	 */
	readonly modalEasing?:
		| EasingFunction
		| [EasingFunction, EasingFunction, EasingFunction],
}
