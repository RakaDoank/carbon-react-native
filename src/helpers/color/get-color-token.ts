import type {
	ThemeType,
} from '../../types'

import GRAY_10 from '../../constants/color/tokens/gray-10'
import GRAY_100 from '../../constants/color/tokens/gray-100'

export function getColorToken(
	colorScheme: ThemeType.ColorScheme,
) {
	return mapSchemeToColorToken[ colorScheme ]
}

const mapSchemeToColorToken: Record<ThemeType.ColorScheme, typeof GRAY_10> = {
	GRAY_10,
	GRAY_100,
}
