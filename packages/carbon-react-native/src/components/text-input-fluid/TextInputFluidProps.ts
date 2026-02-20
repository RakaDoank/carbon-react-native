import type {
	TextInputFieldProps,
} from "../text-input-field/TextInputFieldProps"

export interface TextInputFluidProps extends Omit<
	TextInputFieldProps,
	| "size"
	| "hideInteractiveStateIcon"
> {
	label: string,
	helperText?: string,
}
