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
	Color,
} from '@audira/carbon-react-native-elements'

import {
	CarbonStyleSheet,
} from '../../carbon-style-sheet'

import {
	ThemeContext,
} from '../../contexts'

import {
	FlexStyleSheet,
} from '../../_internal/style-sheets'

import {
	BaseColor as ButtonColor,
	type BaseColorProps as ButtonColorProps,
	type BaseColorState as ButtonColorState,
} from '../button/base-color'

import type {
	ButtonSize as ButtonSize,
} from '../button/ButtonSize'

import {
	Icon,
	type IconProps,
} from '../icon'

import {
	HeaderBorder,
} from './_HeaderBorder'

import {
	Motion,
} from './_motion'

import type {
	AccordionHeaderProps,
} from './AccordionHeaderProps'

import type {
	AccordionSize,
} from './AccordionSize'

export function Header({
	size = 'medium',
	open,
	flushAlignment = false,
	text,
	style: styleProp,
	...buttonProps
}: AccordionHeaderProps) {

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
				android_rippleEffectColor={ mapAndroidRippleEffectColor[themeContext.colorScheme] }
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
					icon: mapIconColor[themeContext.colorScheme],
				}}
				iconNode={
					(...params) =>
						iconNodeRenderer(!!open, ...params)
				}
				style={ FlexStyleSheet.self_stretch }
			/>
		</View>
	)

}

const
	style =
		CarbonStyleSheet.create<
			Record<
				`${'background' | 'text'}_${keyof ButtonColorProps['colorStateStyle']['text']}`,
				ViewStyle | TextStyle
			>
		>({
			background_default: {
				backgroundColor: 'transparent',
			},
			background_focused: {
				backgroundColor: 'transparent',
				borderWidth: 1,
				borderColor: CarbonStyleSheet.color.focus,
			},
			background_hovered: {
				backgroundColor: CarbonStyleSheet.color.layer_hover_01,
			},
			background_pressed: {
				backgroundColor: CarbonStyleSheet.color.layer_hover_01,
			},
			background_disabled: {
				backgroundColor: 'transparent',
			},

			text_default: {
				color: CarbonStyleSheet.color.text_primary,
			},
			text_focused: {
				color: CarbonStyleSheet.color.text_primary,
			},
			text_hovered: {
				color: CarbonStyleSheet.color.text_primary,
			},
			text_pressed: {
				color: CarbonStyleSheet.color.text_primary,
			},
			text_disabled: {
				color: CarbonStyleSheet.color.text_disabled,
			},
		}),

	mapIconColor: Record<ThemeContext['colorScheme'], Record<ButtonColorState, string>> =
		{
			gray_10: {
				default: Color.Token.gray_10.icon_primary,
				focused: Color.Token.gray_10.icon_primary,
				hovered: Color.Token.gray_10.icon_primary,
				pressed: Color.Token.gray_10.icon_primary,
				disabled: Color.Token.gray_10.icon_disabled,
			},
			gray_100: {
				default: Color.Token.gray_100.icon_primary,
				focused: Color.Token.gray_100.icon_primary,
				hovered: Color.Token.gray_100.icon_primary,
				pressed: Color.Token.gray_100.icon_primary,
				disabled: Color.Token.gray_100.icon_disabled,
			},
		},

	mapAndroidRippleEffectColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.layer_hover_01,
			gray_100: Color.Token.gray_100.layer_hover_01,
		},

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
