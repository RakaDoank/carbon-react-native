import type {
	ThemeType,
} from '../../types'

export function getColorToken(
	colorScheme: ThemeType.ColorScheme,
) {
	return mapSchemeToColorToken[ colorScheme ]()
}

const mapSchemeToColorToken: Record<ThemeType.ColorScheme, () => Awaited<typeof import('../../constants/color/tokens/gray-10')>> = {
	gray_10: () => require('../../constants/color/tokens/gray-10'),
	gray_100: () => require('../../constants/color/tokens/gray-100'),
}
