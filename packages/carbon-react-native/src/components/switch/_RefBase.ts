export interface RefBase {
	readonly value: boolean,
	/**
	 * This method does nothing if `controlled` prop is true
	 */
	setValue: (value: boolean | ((currentValue: boolean) => boolean)) => void,
}
