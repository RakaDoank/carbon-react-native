import type {
	XmlProps,
} from "react-native-svg"

import type {
	SharedType,
} from "../../types"

export interface IconProps extends Omit<XmlProps, "xml"> {
	src: SharedType.CarbonIcon,
}
