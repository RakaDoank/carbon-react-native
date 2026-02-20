import type {
	TextInputFieldProps,
} from "../text-input-field/TextInputFieldProps"

export interface TextInputProps extends Omit<
	TextInputFieldProps,
	| "hideInteractiveStateIcon"
> {
	label: string,
	helperText?: string,
}
