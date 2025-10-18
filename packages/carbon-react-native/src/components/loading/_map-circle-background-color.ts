import {
	Color,
	type ColorLayerLevel,
} from '@audira/carbon-react-native-elements'

import type {
	ThemeContext,
} from '../../contexts/theme'

export const MapCircleBackgroundColor: {
	[Layer in ColorLayerLevel]: Record<ThemeContext['colorScheme'], string>
} =
	{
		1: {
			gray_10: Color.Token.gray_10.layer_accent_01,
			gray_100: Color.Token.gray_100.layer_accent_01,
		},
		2: {
			gray_10: Color.Token.gray_10.layer_accent_02,
			gray_100: Color.Token.gray_100.layer_accent_02,
		},
		3: {
			gray_10: Color.Token.gray_10.layer_accent_03,
			gray_100: Color.Token.gray_100.layer_accent_03,
		},
	}
