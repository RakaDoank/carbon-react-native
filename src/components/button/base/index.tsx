import {
	forwardRef,
} from 'react'

import {
	Pressable,
	StyleSheet,
	View,
	type PressableProps,
	type ViewProps,
} from 'react-native'

import {
	SpacingConstant,
} from '../../../constants'

import {
	FlexStyle,
} from '../../../styles'

import type {
	SharedType,
} from '../../../types'

import {
	Icon,
	type IconProps,
} from '../../icon'

import {
	Text,
	type TextProps,
} from '../../text'

import {
	Size,
} from '../size'

export interface BaseProps extends Omit<PressableProps, 'children' | 'style'> {
	size?: Size,
	text?: string,
	icon?: SharedType.CarbonIcon,
	iconColor?: string,
	/**
	 * Only for base-color button for Focus state UI purposes
	 */
	backgroundNode?: React.ReactNode,
	style?: ViewProps['style'],
	textStyle?: TextProps['style'],
	iconStyle?: IconProps['style'],
}

export const Base = forwardRef<View, BaseProps>(
	function Base(
		{
			size = Size.LARGE_PRODUCTIVE,
			text,
			icon,
			iconColor,
			backgroundNode,
			style,
			textStyle,
			iconStyle,
			...props
		},
		ref,
	) {

		const iconSize = getIconSize(size)

		return (
			<Pressable
				{ ...props }
				style={ [
					sizeStyle[size],
					baseStyle.container,
					getContainerPaddingRight(!!text, !!icon),
					style,
				] }
				ref={ ref }
			>
				{ backgroundNode }{/* only for base-color button, and this is not valid HTML per se */}

				{ !!text && (
					<Text
						type={ getTextType(size) }
						style={ [baseStyle.text, textStyle] }
					>
						{ text }
					</Text>
				) }

				{ !!icon && (
					<Icon
						src={ icon }
						width={ iconSize }
						height={ iconSize }
						color={ iconColor }
						style={ [
							getIconMarginTop(size),
							getIconMarginLeft(!!text),
							iconStyle,
						] }
					/>
				) }
			</Pressable>
		)

	}
)

const
	baseStyle =
		StyleSheet.create({
			container: {
				...FlexStyle.self_start,
				...FlexStyle.flex_row,
				...FlexStyle.justify_between,
				paddingLeft: SpacingConstant.spacing_05,
			},
			containerPR16: {
				paddingRight: SpacingConstant.spacing_05,
			},
			containerPR64: {
				paddingRight: SpacingConstant.spacing_10,
			},
			contentContainer: {
				...FlexStyle.flex_initial,
				maxHeight: SpacingConstant.spacing_09,
			},
			text: {
				verticalAlign: 'middle',
				maxHeight: 48,
			},
			/**
			 * (maxHeight / 2) - (iconSize / 2)
			 * 48 / 2 - 16 / 2
			 * 24 - 8
			 */
			iconMTProductive: {
				marginTop: 16,
			},
			/**
			 * same as above, but iconSize = 20
			 */
			iconMTExpressive: {
				marginTop: 14,
			},
			iconML32: {
				marginLeft: SpacingConstant.spacing_07,
			},
		}),

	sizeStyle =
		StyleSheet.create<Record<Size, { height: number }>>({
			small: {
				height: 32,
			},
			medium: {
				height: 40,
			},
			large_productive: {
				height: 48,
			},
			large_expressive: {
				height: 48,
			},
			extra_large: {
				height: 64,
			},
			'2xl': {
				height: 80,
			},
		}),

	mapContainerPR: Record<string, { paddingRight: number }> =
		{
			'text[false]_icon[false]': baseStyle.containerPR16,
			'text[true]_icon[false]': baseStyle.containerPR64,
			'text[false]_icon[true]': baseStyle.containerPR16,
			'text[true]_icon[true]': baseStyle.containerPR16,
		},

	/**
	 * https://carbondesignsystem.com/components/button/style/#typography
	 */
	mapTextTypeByExpressive: Record<string, NonNullable<TextProps['type']>> =
		{
			false: 'body_compact_01',
			true: 'body_compact_02',
		},

	mapIconSizeByExpressive: Record<string, number> =
		{
			false: 16,
			true: 20,
		},

	mapIconMTByExpressive: Record<string, { marginTop: number }> =
		{
			false: baseStyle.iconMTProductive,
			true: baseStyle.iconMTProductive,
		},

	mapIconMLByText: Record<string, { marginLeft: number } | null> =
		{
			false: null,
			true: baseStyle.iconML32,
		}

/**
 * Expressive only when button size is LARGE_EXPRESSIVE. You can see this link  
 * https://carbondesignsystem.com/components/button/style/#sizes
 */
function isExpressive(
	buttonSize: BaseProps['size'],
) {
	return buttonSize === Size.LARGE_EXPRESSIVE
}

function getContainerPaddingRight(
	text: boolean,
	icon: boolean,
) {
	return mapContainerPR[`text[${text}]_icon[${icon}]`] as NonNullable<typeof mapContainerPR[keyof typeof mapContainerPR]>
}

/**
 * Expressive only when button size is LARGE_EXPRESSIVE. You can see this link  
 * https://carbondesignsystem.com/components/button/style/#sizes
 */
function getTextType(buttonSize: BaseProps['size']) {
	return mapTextTypeByExpressive[`${isExpressive(buttonSize)}`]
}

/**
 * Expressive only when button size is LARGE_EXPRESSIVE. You can see this link  
 * https://carbondesignsystem.com/components/button/style/#sizes
 */
function getIconSize(buttonSize: BaseProps['size']) {
	return mapIconSizeByExpressive[`${isExpressive(buttonSize)}`]
}

function getIconMarginTop(buttonSize: BaseProps['size']) {
	return mapIconMTByExpressive[`${isExpressive(buttonSize)}`]
}

function getIconMarginLeft(hasText: boolean) {
	return mapIconMLByText[`${hasText}`]
}
