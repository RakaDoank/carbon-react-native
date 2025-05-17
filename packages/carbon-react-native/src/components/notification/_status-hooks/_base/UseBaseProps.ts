import type {
	ColorToken,
} from '@audira/carbon-react-native-elements'

import type {
	NotificationColor,
} from '../../NotificationColor'

type ColorModifier = Record<NotificationColor, ColorToken>

export interface UseBaseProps {
	color?: NotificationColor,
	backgroundColor: ColorModifier,
	borderColor: ColorModifier,
	leftBarColor: ColorModifier,
	iconColor: ColorModifier,
	iconCloseColor: ColorModifier,
	titleColor: ColorModifier,
	/**
	 * true to use background color for top-right-bottom border.  
	 * Currently for actionable variant
	 */
	transparentBorderColor?: boolean,
}
