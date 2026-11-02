import type {
	ScrollViewProps as Props,
} from "react-native"

import type {
	ViewProps as RNWViewProps,
} from "react-native-web"

export interface ScrollViewProps extends Props {
	dir?: RNWViewProps["dir"],
}
