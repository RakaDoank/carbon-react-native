import {
	StyleSheet,
} from "react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

/**
 * Sorry for named it %margin% but it is actually using padding  
 * https://carbondesignsystem.com/components/accordion/style/#margin-right
 */
export const MarginRightStyle =
	StyleSheet.create({
		large: {
			paddingEnd: "25%",
		},
		range_420_640: {
			paddingEnd: Spacing.spacing_10,
		},
		small: {
			paddingEnd: Spacing.spacing_05,
		},
	})
