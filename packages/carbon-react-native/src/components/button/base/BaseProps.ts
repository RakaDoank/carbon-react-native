import type {
	PressableProps,
	TextProps,
	ViewProps,
} from 'react-native'

import type {
	SharedType,
} from '../../../types'

import type {
	IconProps,
} from '../../icon'

import type {
	ButtonSize,
} from '../ButtonSize'

export interface BaseProps extends Omit<PressableProps, 'children' | 'style'> {
	/**
	 * Refer to https://carbondesignsystem.com/components/button/style/#sizes  
	 * Default is `large_productive`
	 */
	size?: ButtonSize,
	text?: string,
	icon?: SharedType.CarbonIcon,
	iconColor?: string,
	/**
	 * This prop is useful to custom render at the icon position.  
	 * `iconNode` takes precedence even if {@linkcode icon} prop is present.
	 */
	iconNode?: (
		/**
		 * Use this param to resize icon view correctly according to each size of button
		 */
		iconSize: number,
		/**
		 * Use this param to keep icon style nicely center aligned vertically with text
		 */
		iconStyle: IconProps['style'],
	) => React.ReactNode,
	/**
	 * Only for base-color button for Focus state UI purposes
	 */
	backgroundNode?: React.ReactNode,
	style?: ViewProps['style'],
	textStyle?: TextProps['style'],
	iconStyle?: IconProps['style'],
}
