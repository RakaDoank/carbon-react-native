import type {
	SwitchRef,
} from "../../switch/SwitchRef"

export interface RefBase {
	readonly value: SwitchRef["value"],
	/**
	 * This method does nothing if `controlled` prop is true
	 */
	setValue: SwitchRef["setValue"],
}
