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
}
