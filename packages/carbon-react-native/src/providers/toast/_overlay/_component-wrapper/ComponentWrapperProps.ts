import type {
	ViewProps,
} from "react-native"

export interface ComponentWrapperProps extends ViewProps {
	onShiftedX?: () => void,
	onShiftedY?: () => void,
}
