import type {
	GhostIconProps as Props,
} from "../../button/ghost-icon/GhostIconProps"

import type {
	PasswordInputFieldProps,
} from "../PasswordInputFieldProps"

export interface GhostIconProps extends Omit<Props, "Icon" | "size"> {
	inputSize: NonNullable<PasswordInputFieldProps["size"]>,
	secureTextEntry: boolean,
}
