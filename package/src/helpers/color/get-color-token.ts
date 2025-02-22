import type {
	ThemeType,
} from '../../types'

export function getColorToken(
	colorScheme: ThemeType.ColorScheme,
) {
	return mapSchemeToColorToken[ colorScheme ]()
}

const mapSchemeToColorToken: Record<ThemeType.ColorScheme, () => Record<ThemeType.ColorToken, string>> = {
	gray_10: () => (require('../../constants/color/tokens/gray-10') as { gray_10: Record<ThemeType.ColorToken, string> }).gray_10,
	gray_100: () => (require('../../constants/color/tokens/gray-100') as { gray_100: Record<ThemeType.ColorToken, string> }).gray_100,
}
