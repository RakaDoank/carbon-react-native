import {
	useContext,
	useEffect,
	useRef,
} from 'react'

import {
	View,
	type TextStyle,
	type ViewStyle,
} from 'react-native'

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	type AnimatedProps,
} from 'react-native-reanimated'

import ChevronDown from '@carbon/icons/es/chevron--down/20'

import {
	StyleSheet,
} from '../../_style-sheet'

import {
	ThemeContext,
} from '../../contexts'

import {
	FlexStyle,
} from '../../styles'

import {
	BaseColor as ButtonColor,
	type BaseColorProps as ButtonColorProps,
} from '../button/base-color'

import type {
	ButtonSize as ButtonSize,
} from '../button/size'

import {
	Icon,
	type IconProps,
} from '../icon'

import {
	HeaderBorder,
} from './_header-border'

import {
	Motion,
} from './_motion'

import type {
	AccordionSize,
} from './types'

export interface HeaderProps extends Omit<ButtonColorProps, 'android_rippleEffectColor' | 'size' | 'text' | 'icon' | 'colorStateStyle'> {
	size?: AccordionSize,
	/**
	 * https://carbondesignsystem.com/components/accordion/style/#flush-alignment
	 */
	open?: boolean,
	flushAlignment?: boolean,
	text?: string,
}

export function Header({
	size = 'medium',
	open,
	flushAlignment = false,
	text,
	style: styleProp,
	...buttonProps
}: HeaderProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<View
			style={ styleProp }
		>
			{ /** The Border Box */}
			<HeaderBorder
				flushAlignment={ flushAlignment }
			/>

			<ButtonColor
				{ ...buttonProps }
				size={ mapSizeToButtonSize[size] }
				text={ text }
				android_rippleEffectColor={ themeContext.color.layer_hover_01 }
				colorStateStyle={{
					background: {
						default: style.background_default,
						focused: style.background_pressed,
						hovered: style.background_hovered,
						pressed: style.background_pressed,
						disabled: style.background_disabled,
					},
					text: {
						default: style.text_default,
						focused: style.text_focused,
						hovered: style.text_hovered,
						pressed: style.text_pressed,
						disabled: style.text_disabled,
					},
					icon: {
						default: themeContext.color.icon_primary,
						focused: themeContext.color.icon_primary,
						hovered: themeContext.color.icon_primary,
						pressed: themeContext.color.icon_primary,
						disabled: themeContext.color.icon_disabled,
					},
				}}
				iconNode={
					(...params) =>
						iconNodeRenderer(!!open, ...params)
				}
				style={ FlexStyle.self_stretch }
			/>
		</View>
	)

}

const
	style =
		StyleSheet.create<
			Record<
				`${'background' | 'text'}_${keyof ButtonColorProps['colorStateStyle']['text']}`,
				ViewStyle | TextStyle
			>
		>(color => {
			return {
				background_default: {
					backgroundColor: 'transparent',
				},
				background_focused: {
					backgroundColor: 'transparent',
					borderWidth: 1,
					borderColor: color.focus,
				},
				background_hovered: {
					backgroundColor: color.layer_hover_01,
				},
				background_pressed: {
					backgroundColor: color.layer_hover_01,
				},
				background_disabled: {
					backgroundColor: 'transparent',
				},

				text_default: {
					color: color.text_primary,
				},
				text_focused: {
					color: color.text_primary,
				},
				text_hovered: {
					color: color.text_primary,
				},
				text_pressed: {
					color: color.text_primary,
				},
				text_disabled: {
					color: color.text_disabled,
				},
			}
		}),

	/**
	 * Coincidentally (or not) use same value of height  
	 * https://carbondesignsystem.com/components/accordion/style/#sizes
	 */
	mapSizeToButtonSize: Record<AccordionSize, ButtonSize> =
		{
			small: 'small',
			medium: 'medium',
			large: 'large_productive',
		},

	IconAnimated =
		/**
		 * 
		 */
		Animated.createAnimatedComponent(Icon as never) as unknown as React.ComponentClass<AnimatedProps<IconProps>>,

	iconNodeRenderer: (
		open: boolean,
		...params: Parameters<NonNullable<ButtonColorProps['iconNode']>>
	) => React.ReactNode =
		(open, iconColorState, iconSize, iconStyle) => {
			return (
				<IconNode
					open={ open }
					color={ iconColorState }
					size={ iconSize }
					style={ iconStyle }
				/>
			)
		}

interface IconNodeProps {
	open: boolean,
	color: string,
	size: number,
	style?: IconProps['style'],
}
function IconNode({
	open,
	color,
	size,
	style,
}: IconNodeProps) {

	const
		isMounted =
			useRef(false),

		rotateZ =
			useSharedValue(open ? 180 : 0),

		animatedStyle =
			useAnimatedStyle(() => {
				return {
					transform: [{
						rotateZ: `${rotateZ.value}deg`,
					}],
				}
			})

	useEffect(() => {
		if(isMounted.current) {
			if(open) {
				rotateZ.value =
					withTiming(
						180,
						Motion.toOpen,
					)
			} else {
				rotateZ.value =
					withTiming(
						0,
						Motion.toClose,
					)
			}
		} else {
			isMounted.current = true
		}
	}, [
		open,
		rotateZ,
	])

	return (
		<IconAnimated
			src={ ChevronDown }
			color={ color }
			width={ size }
			height={ size }
			style={ [
				animatedStyle,
				style,
			] }
		/>
	)

}
