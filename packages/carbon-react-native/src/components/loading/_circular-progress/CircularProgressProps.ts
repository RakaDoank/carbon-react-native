import type {
	Svg,
	SvgProps,
} from "react-native-svg"

import type {
	LoadingType,
} from "../LoadingType"

export interface CircularProgressProps extends Omit<SvgProps, "width" | "height"> {
	/**
	 * @default 'large'
	 */
	type: LoadingType,
	circleStrokeColor: string,
	circleBackgroundColor: string,
	forwardedRef?: React.ForwardedRef<Svg>,
}
