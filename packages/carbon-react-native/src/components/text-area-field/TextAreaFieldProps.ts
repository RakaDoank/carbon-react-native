import type {
	TextInputFieldProps,
} from "../text-input-field/TextInputFieldProps"

export interface TextAreaFieldProps extends Omit<TextInputFieldProps, "size" | "multiline"> {
}
