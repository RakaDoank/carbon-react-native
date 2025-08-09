import {
	forwardRef,
	useContext,
} from 'react'

import {
	StyleSheet,
	View,
	type TextStyle,
	type ViewStyle,
} from 'react-native'

import {
	Color,
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	StyleSheet as CarbonStyleSheet,
} from '../../../_style-sheet'

import {
	ThemeContext,
} from '../../../contexts'

import {
	FlexStyle,
} from '../../../styles'

import {
	BaseColor as ButtonBaseColor,
	type BaseColorProps,
} from '../../button/base-color'

import {
	Icon,
} from '../../icon'

import {
	Text,
} from '../../text'

import type {
	BaseProps,
} from './BaseProps'

import type {
	BaseRef,
} from './BaseRef'

import IconClose from '@carbon/icons/es/close/20'

export const Base = forwardRef<BaseRef, BaseProps>(
	function Base(
		{
			title,
			body,
			inline,

			icon,
			iconProps,
			iconContainerStyle,

			iconClose,
			onPressIconClose,
			iconCloseProps,
			iconCloseButtonProps,

			nodes,

			titleStyle,
			leftBarStyle,
			leftContainerStyle,
			contentContainerStyle,

			style,
			...props
		},
		ref,
	) {

		const themeContext = useContext(ThemeContext)

		return (
			<View
				{ ...props }
				style={ [
					FlexStyle.flex_row,
					style,
				] }
				ref={ ref }
			>
				<View
					style={ [
						baseStyle.leftBar,
						leftBarStyle,
					] }
				/>

				<View
					style={ [
						FlexStyle.flex_auto,
						FlexStyle.flex_row,
						!inline
							? baseStyle.leftContainerNonInline
							: FlexStyle.items_center,
						leftContainerStyle,
					] }
				>
					{ !!icon && (
						<View
							style={ [
								baseStyle.iconContainer,
								iconContainerStyle,
							] }
						>
							<Icon
								{ ...iconProps }
								src={ icon }
								width={ 20 }
								height={ 20 }
							/>
						</View>
					) }

					{ nodes?.beforeContentContainer }

					{ (!!title || !!body) && (
						<View
							style={ [
								FlexStyle.flex_auto,
								contentContainerStyle,
							] }
						>
							{ !inline ? (<>

								{ !!title && (
									<Text
										type="heading_compact_01"
										style={ titleStyle }
									>
										{ title }
									</Text>
								) }

								{ body }

							</>) : (

								<Text
									type="heading_compact_01"
									style={ [baseStyle.inlineTextWrapper, titleStyle] }
								>
									{ title }{ title && body ? ' ' : '' }{ body }
								</Text>

							) }

							{ nodes?.beforeContentContainerEnd }
						</View>
					) }

					{ nodes?.afterContentContainer }
				</View>

				{ nodes?.beforeButtonClose }

				{ !!iconClose && (
					<ButtonBaseColor
						{ ...iconCloseButtonProps }
						text=""
						android_rippleEffectColor={ mapAndroidRippleEffectColor[themeContext.colorScheme] }
						size="large_expressive"
						iconNode={ (iconColorState, iconSize, iconStyle) => iconCloseRenderer(iconCloseProps, iconColorState, iconSize, iconStyle) }
						onPress={ onPressIconClose }
						colorStateStyle={{
							background: {
								default: colorStyle.background_default,
								focused: colorStyle.background_pressed,
								hovered: colorStyle.background_hovered,
								pressed: colorStyle.background_pressed,
								disabled: colorStyle.background_disabled,
							},
							text: {
								default: colorStyle.text_default,
								focused: colorStyle.text_focused,
								hovered: colorStyle.text_hovered,
								pressed: colorStyle.text_pressed,
								disabled: colorStyle.text_disabled,
							},
							/**
							 * Means nothing since we used `iconNode` prop
							 */
							icon: {
								default: 'transparent',
								focused: 'transparent',
								hovered: 'transparent',
								pressed: 'transparent',
								disabled: 'transparent',
							},
						}}
						style={ [
							FlexStyle.justify_center,
							baseStyle.buttonIconClose,
							iconCloseButtonProps?.style,
						] }
					/>
				) }
			</View>
		)

	},
)

const
	baseStyle =
		StyleSheet.create({
			leftBar: {
				position: 'absolute',
				top: -1,
				bottom: -1,
				width: 3,
			},
			iconContainer: {
				marginLeft: Spacing.spacing_05,
				marginRight: Spacing.spacing_05,
			},
			leftContainerNonInline: {
				marginTop: Spacing.spacing_05,
				marginBottom: Spacing.spacing_05,
			},
			inlineTextWrapper: {
				marginTop: Spacing.spacing_04,
				marginBottom: Spacing.spacing_04,
			},
			buttonIconClose: {
				width: 48,
				height: 48,
				minWidth: 48,
				minHeight: 48,
				paddingTop: 0,
				paddingRight: 0,
				paddingBottom: 0,
				paddingLeft: 0,
			},
		}),
		
	colorStyle =
		CarbonStyleSheet.create<
			Record<
				`${'background' | 'text'}_${keyof BaseColorProps['colorStateStyle']['text']}`,
				ViewStyle | TextStyle
			>
		>({
			background_default: {
				backgroundColor: 'transparent',
			},
			background_focused: {
				borderWidth: 1,
				borderColor: CarbonStyleSheet.color.focus,
			},
			background_hovered: {
				backgroundColor: CarbonStyleSheet.color.background_hover,
			},
			background_pressed: {
				backgroundColor: CarbonStyleSheet.color.background_active,
			},
			background_disabled: {
				backgroundColor: 'transparent',
			},

			text_default: {
				color: 'transparent',
			},
			text_focused: {
				color: 'transparent',
			},
			text_hovered: {
				color: 'transparent',
			},
			text_pressed: {
				color: 'transparent',
			},
			text_disabled: {
				color: 'transparent',
			},
		}),

	mapAndroidRippleEffectColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.background_active,
			gray_100: Color.Token.gray_100.background_active,
		},

	iconCloseRenderer: (
		iconCloseProps: BaseProps['iconCloseProps'],
		...params: Parameters<NonNullable<BaseColorProps['iconNode']>>
	) => React.ReactNode =
		(
			iconCloseProps,
			___iconColorState,
			___iconSize,
			iconStyle,
		) => {
			return (
				<IconClosePart
					{ ...iconCloseProps }
					style={ [
						iconStyle,
						iconCloseProps?.style,
					] }
				/>
			)
		}

interface IconClosePartProps extends NonNullable<BaseProps['iconCloseProps']> {
}
function IconClosePart(props: IconClosePartProps) {
	return (
		<Icon
			{ ...props }
			src={ IconClose }
			width={ 20 }
			height={ 20 }
		/>
	)
}
