import type {
	ViewProps,
} from "react-native"

import type {
	ViewProps as RNWViewProps,
} from "react-native-web"

export interface BoxProps extends ViewProps {
	dir?: RNWViewProps["dir"],
}
