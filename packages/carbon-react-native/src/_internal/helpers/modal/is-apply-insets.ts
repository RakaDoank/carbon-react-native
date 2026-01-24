import type {
	BreakpointToken,
} from "@audira/carbon-react-native-elements"

import type {
	ModalProps,
} from "../../../components/modal/ModalProps"

export function isApplyInsets({
	applyInsets,
	breakpoint,
	inDialog,
}: {
	applyInsets: NonNullable<ModalProps["applyInsets"]>,
	breakpoint: BreakpointToken,
	inDialog: boolean,
}): boolean {
	if(applyInsets === "in_dialog_and_small_bp") {
		return breakpoint === "small" && inDialog
	}

	return applyInsets === "all"
}
