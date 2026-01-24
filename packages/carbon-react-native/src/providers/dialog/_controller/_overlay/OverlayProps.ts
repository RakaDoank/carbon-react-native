import type {
	ViewProps,
} from "react-native"

export interface OverlayProps extends ViewProps {
	animationConfig: {
		duration: number,
		useNativeDriver: boolean,
	},
}
