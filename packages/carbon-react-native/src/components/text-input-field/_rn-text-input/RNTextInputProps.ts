import type {
	TextInputProps,
} from "react-native"

import type {
	ViewProps as RNWViewProps,
} from "react-native-web"

import type {
	TextInputFieldInteractiveState,
} from "../TextInputFieldInteractiveState"

export interface RNTextInputProps extends TextInputProps {
	interactiveState: TextInputFieldInteractiveState,
	dir?: RNWViewProps["dir"],
}
