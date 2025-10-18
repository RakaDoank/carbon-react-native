import {
	Color,
} from '@audira/carbon-react-native-elements'

import type {
	ThemeType,
} from '../../../types'

export const MapOutlineColorFocus = {
	gray_10: Color.Token.gray_10.focus,
	gray_100: Color.Token.gray_100.focus,
} as const satisfies Record<ThemeType.ColorScheme, string>
