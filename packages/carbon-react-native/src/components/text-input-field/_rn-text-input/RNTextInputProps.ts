import type {
	TextInputProps,
} from "react-native"

import type {
	TextInputFieldInteractiveState,
} from "../TextInputFieldInteractiveState"

export interface RNTextInputProps extends TextInputProps {
	interactiveState: TextInputFieldInteractiveState,
}
