export interface SwitchRefBase {
	/**
	 * The current value.
	 */
	readonly value: boolean,
	/**
	 * This method does nothing if `value` component prop is defined
	 */
	setValue: (value: boolean | ((currentValue: boolean) => boolean)) => void,
}
