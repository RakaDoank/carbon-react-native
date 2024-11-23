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
	Icon,
} from '../../icon'
import {
	Text,
	type TextProps,
} from '../../text'

import {
	SpacingConstant,
} from '../../../constants'

import type {
	Size,
} from '../size'

import {
	FlexStyle,
} from '../../../styles'

import type {
	SharedType,
} from '../../../types'

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
	iconContainerStyle?: ViewProps['style'],
}

export const Base = forwardRef<View, BaseProps>(
	function Base(
		{
			size = 'LARGE_PRODUCTIVE',
			text,
			icon,
			iconColor,
			backgroundNode,
			style,
			textStyle,
			iconContainerStyle,
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
				{ backgroundNode }

				{ !!text && (
					<Text
						type={ getTextType(size) }
						style={ textStyle }
					>
						{ text }
					</Text>
				) }

				{ !!icon && (
					<View
						style={ [
							baseStyle.iconContainer,
							getIconContainerPaddingLeft(!!text),
							iconContainerStyle,
						] }
					>
						<Icon
							src={ icon }
							width={ iconSize }
							height={ iconSize }
							color={ iconColor }
						/>
					</View>
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
				...FlexStyle.items_center,
				paddingLeft: SpacingConstant.spacing_05,
			},
			containerPR16: {
				paddingRight: SpacingConstant.spacing_05,
			},
			containerPR64: {
				paddingRight: SpacingConstant.spacing_10,
			},
			iconContainer: {
				flexGrow: 0,
				flexShrink: 1,
				flexBasis: 'auto',
			},
			iconContainerPL32: {
				paddingLeft: SpacingConstant.spacing_07,
			},
		}),

	sizeStyle =
		StyleSheet.create<Record<Size, { height: number }>>({
			SMALL: {
				height: 32,
			},
			MEDIUM: {
				height: 40,
			},
			LARGE_PRODUCTIVE: {
				height: 48,
			},
			LARGE_EXPRESSIVE: {
				height: 48,
			},
			EXTRA_LARGE: {
				height: 64,
			},
			XL2: {
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

	mapIconContainerPLByText: Record<string, { paddingLeft: number } | null> =
		{
			false: null,
			true: baseStyle.iconContainerPL32,
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
	return mapTextTypeByExpressive[`${buttonSize === 'LARGE_EXPRESSIVE'}`]
}

/**
 * Expressive only when button size is LARGE_EXPRESSIVE. You can see this link  
 * https://carbondesignsystem.com/components/button/style/#sizes
 */
function getIconSize(buttonSize: BaseProps['size']) {
	return mapIconSizeByExpressive[`${buttonSize === 'LARGE_EXPRESSIVE'}`]
}

function getIconContainerPaddingLeft(hasText: boolean) {
	return mapIconContainerPLByText[`${hasText}`]
}
