import type {
	RadioButtonProps,
} from "../radio-button/RadioButtonProps"

export interface RefBase {
	readonly selectedValue: RadioButtonProps["value"],
	/**
	 * This method does nothing if `controlled` prop is true
	 */
	setSelectedValue: (value: RadioButtonProps["value"] | ((value: RadioButtonProps["value"]) => RadioButtonProps["value"])) => void,
}
