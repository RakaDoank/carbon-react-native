import {
	useContext,
	useEffect,
	useRef,
} from 'react'

import {
	View,
} from 'react-native'

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

import ChevronDown from '@carbon/icons/es/chevron--down/20'

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
	Size as ButtonSize,
} from '../button/size'

import {
	Icon,
	type IconProps,
} from '../icon'

import {
	AccordionHeaderBorder,
} from './header-border'

import {
	AccordionItemContext,
} from './item-context'

import {
	AccordionMotion,
} from './motion'

import type {
	Size,
} from './size'

export interface AccordionHeaderProps extends Omit<ButtonColorProps, 'size' | 'text' | 'icon' | 'colorStateStyle'> {
	size?: Size,
	/**
	 * https://carbondesignsystem.com/components/accordion/style/#flush-alignment
	 */
	flushAlignment?: boolean,
	text?: string,
}

export function AccordionHeader({
	size = 'medium',
	flushAlignment = false,
	text,
	style: styleProp,
	...buttonProps
}: AccordionHeaderProps) {

	const
		themeContext =
			useContext(ThemeContext),

		itemContext =
			useContext(AccordionItemContext)

	return (
		<View
			style={ styleProp }
		>
			{ /** The Border Box */}
			<AccordionHeaderBorder
				flushAlignment={ flushAlignment }
			/>

			<ButtonColor
				{ ...buttonProps }
				size={ mapSizeToButtonSize[size] }
				text={ text }
				colorStateStyle={{
					background: {
						default: { backgroundColor: 'transparent' },
						focused: {
							backgroundColor: 'transparent',
							borderWidth: 1,
							borderColor: themeContext.color.focus,
						},
						/**
						 * it is said $layer-hover  
						 * https://carbondesignsystem.com/components/accordion/style/#interactive-states  
						 * But, i can't find the layer color token  
						 * https://carbondesignsystem.com/elements/color/tokens/#layer
						 */
						hovered: { backgroundColor: themeContext.color.layer_hover_01 },
						pressed: { backgroundColor: themeContext.color.layer_hover_01 },
						disabled: { backgroundColor: 'transparent' },
					},
					text: {
						default: { color: themeContext.color.text_primary },
						focused: { color: themeContext.color.text_primary },
						hovered: { color: themeContext.color.text_primary },
						pressed: { color: themeContext.color.text_primary },
						disabled: { color: themeContext.color.text_disabled },
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
						iconNodeRenderer(!!itemContext.open, ...params)
				}
				style={ FlexStyle.self_stretch }
			/>
		</View>
	)

}

const
	/**
	 * Coincidentally (or not) use same value of height  
	 * https://carbondesignsystem.com/components/accordion/style/#sizes
	 */
	mapSizeToButtonSize: Record<Size, ButtonSize> =
		{
			small: 'small',
			medium: 'medium',
			large: 'large_productive',
		},

	IconAnimated =
		Animated.createAnimatedComponent(Icon),

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
						AccordionMotion.toOpen,
					)
			} else {
				rotateZ.value =
					withTiming(
						0,
						AccordionMotion.toClose,
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
