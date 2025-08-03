import {
	forwardRef,
} from 'react'

import {
	Pressable,
	StyleSheet,
	View,
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	FlexStyle,
} from '../../../styles'

import {
	Icon,
} from '../../icon'

import {
	Text,
	type TextProps,
} from '../../text'

import type {
	ButtonSize,
} from '../ButtonSize'

import type {
	BaseProps,
} from './BaseProps'

import type {
	BaseRef,
} from './BaseRef'

export const Base = forwardRef<BaseRef, BaseProps>(
	function Base(
		{
			size = 'large_productive',
			text,
			icon,
			iconColor,
			iconNode,
			backgroundNode,
			style,
			textStyle,
			iconStyle,
			role = 'button',
			'aria-label': ariaLabel,
			...props
		},
		ref,
	) {

		const iconSize = getIconSize(size)

		return (
			<Pressable
				{ ...props }
				role={ role }
				aria-label={ ariaLabel ?? text }
				style={ [
					sizeStyle[size],
					baseStyle.container,
					getContainerPaddingRight(!!text, !!icon || !!iconNode),
					style,
				] }
				ref={ ref }
			>
				{ backgroundNode }{/* only for base-color button, and this is not valid HTML per se */}

				{ !!text && (
					<View
						style={ baseStyle.textContainer }
					>
						<Text
							type={ getTextType(size) }
							style={ textStyle }
						>
							{ text }
						</Text>
					</View>
				) }

				{ (!!icon && !iconNode) ? (
					<Icon
						src={ icon }
						width={ iconSize }
						height={ iconSize }
						color={ iconColor }
						style={ [
							getIconMarginTopStyle(size),
							getIconMarginLeftStyle(!!text),
							iconStyle,
						] }
					/>
				) : iconNode?.(
					iconSize,
					[
						getIconMarginTopStyle(size),
						getIconMarginLeftStyle(!!text),
						iconStyle,
					],
				) }
			</Pressable>
		)

	},
)

const
	baseStyle =
		StyleSheet.create({
			container: {
				...FlexStyle.self_start,
				...FlexStyle.flex_row,
				...FlexStyle.justify_between,
				overflow: 'hidden',
				paddingLeft: Spacing.spacing_05,
			},
			containerPR16: {
				paddingRight: Spacing.spacing_05,
			},
			containerPR64: {
				paddingRight: Spacing.spacing_10,
			},
			contentContainer: {
				...FlexStyle.flex_initial,
				maxHeight: Spacing.spacing_09,
			},
			textContainer: {
				justifyContent: 'center',
				height: '100%',
				maxHeight: 48,
			},
			iconML32: {
				marginLeft: Spacing.spacing_07,
			},
		}),

	sizeStyle =
		StyleSheet.create<Record<ButtonSize, { height: number }>>({
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
	mapTextTypeByExpressive: Record<'true' | 'false', NonNullable<TextProps['type']>> =
		{
			false: 'body_compact_01',
			true: 'body_compact_02',
		},

	mapIconSizeByExpressive: Record<'true' | 'false', number> =
		{
			false: 16,
			true: 20,
		},

	mapIconMLByText: Record<'true' | 'false', { marginLeft: number } | null> =
		{
			false: null,
			true: baseStyle.iconML32,
		}

/**
 * Expressive only when button size is LARGE_EXPRESSIVE. You can see this link  
 * https://carbondesignsystem.com/components/button/style/#sizes
 */
function isExpressiveStr(
	buttonSize: BaseProps['size'],
): 'true' | 'false' {
	return `${buttonSize === 'large_expressive'}`
}

function getContainerPaddingRight(
	text: boolean,
	icon: boolean,
) {
	return mapContainerPR[`text[${text}]_icon[${icon}]`]
}

/**
 * Expressive only when button size is LARGE_EXPRESSIVE. You can see this link  
 * https://carbondesignsystem.com/components/button/style/#sizes
 */
function getTextType(buttonSize: BaseProps['size']) {
	return mapTextTypeByExpressive[isExpressiveStr(buttonSize)]
}

/**
 * Expressive only when button size is LARGE_EXPRESSIVE. You can see this link  
 * https://carbondesignsystem.com/components/button/style/#sizes
 */
function getIconSize(buttonSize: BaseProps['size']) {
	return mapIconSizeByExpressive[isExpressiveStr(buttonSize)]
}

function getIconMarginTopStyle(buttonSize: NonNullable<BaseProps['size']>) {
	const
		iconSize =
			mapIconSizeByExpressive[isExpressiveStr(buttonSize)],

		height =
			Math.min(sizeStyle[buttonSize].height, sizeStyle.large_productive.height) // 48 at max

	return {
		marginTop: (height / 2) - (iconSize / 2),
	}
}

function getIconMarginLeftStyle(hasText: boolean) {
	return mapIconMLByText[`${hasText}`]
}
