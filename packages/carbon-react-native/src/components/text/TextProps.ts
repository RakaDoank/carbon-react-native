import type {
	TextProps as CoreProps,
} from "react-native"

import type {
	TypeSets,
	TypeSetsToken,
} from "@audira/carbon-react-native-elements"

export interface TextProps extends CoreProps {
	type?: TypeSetsToken,
	italic?: boolean,
	/**
	 * This prop takes precedence over the font weight from the `type` prop
	 */
	weight?: TypeSets["fontWeight"] | `${TypeSets["fontWeight"]}`,
}
