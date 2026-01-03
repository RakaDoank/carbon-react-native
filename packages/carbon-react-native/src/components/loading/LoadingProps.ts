import type {
	SvgProps,
} from "react-native-svg"

import type {
	LoadingType,
} from "./LoadingType"

export interface LoadingProps extends SvgProps {
	/**
	 * @default 'large'
	 */
	type?: LoadingType,
}
