import type {
	PressableProps,
	ViewProps,
} from 'react-native'

import type {
	SharedType,
} from '../../../types'

import type {
	IconProps,
} from '../../icon/IconProps'

import type {
	InlineLoadingProps,
} from '../../inline-loading/InlineLoadingProps'

import type {
	TextProps,
} from '../../text/TextProps'

import type {
	Size,
} from '../Size'

export interface BaseProps extends Omit<PressableProps, 'children' | 'style'> {
	/**
	 * Refer to https://carbondesignsystem.com/components/button/style/#sizes  
	 * Default is `large_productive`
	 */
	size?: Size,
	text?: string,
	textProps?: Omit<TextProps, 'type' | 'children'>,
	icon?: SharedType.CarbonIcon,
	iconProps?: Omit<IconProps, 'src'>,
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
		 * Use this style to keep icon style nicely center aligned vertically with text
		 */
		iconStyle: IconProps['style'],
	) => React.ReactNode,
	/**
	 * Only for base-color button for Focus state UI purposes
	 */
	backgroundNode?: React.ReactNode,
	/**
	 * Pass this `InlineLoading` component to render the loading inside of button.  
	 * The Text of Button will be used if `inlineLoadingProps.text` is empty.  
	 * If you pass `inlineLoadingProps.state` with `inactive` value, the `InlineLoading` component will not be rendered.
	 */
	InlineLoading?: React.FunctionComponent<InlineLoadingProps>,
	inlineLoadingProps?: Omit<InlineLoadingProps, 'text'> & {
		text?: string,
	},
	style?: ViewProps['style'],
}
