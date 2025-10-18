import {
	Color,
} from '@audira/carbon-react-native-elements'

import type {
	ThemeContext,
} from '../../contexts/theme'

export const MapCircleStrokeColor: Record<ThemeContext['colorScheme'], string> =
	{
		gray_10: Color.Token.gray_10.interactive,
		gray_100: Color.Token.gray_100.interactive,
	}
