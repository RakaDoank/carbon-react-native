import type {
	Color,
	ColorToken,
} from "@audira/carbon-react-native-elements"

import type {
	ThemeType,
} from "../../types"

export function getColorToken(
	colorScheme: ThemeType.ColorScheme,
) {
	return mapSchemeToColorToken[ colorScheme ]()
}

const mapSchemeToColorToken: Record<ThemeType.ColorScheme, () => Record<ColorToken, string>> = {
	gray_10: () => (require("@audira/carbon-react-native-elements") as unknown as {
		Color: typeof Color
	}).Color.Token.gray_10.all,
	gray_100: () => (require("@audira/carbon-react-native-elements") as unknown as {
		Color: typeof Color
	}).Color.Token.gray_100.all,
}
