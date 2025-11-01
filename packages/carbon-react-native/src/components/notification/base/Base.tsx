import {
	forwardRef,
	useContext,
} from 'react'

import {
	StyleSheet,
	View,
	type ViewStyle,
} from 'react-native'

import {
	Color,
	Spacing,
} from '@audira/carbon-react-native-elements'

import IconClose from '@carbon/icons/svg/32/close.svg'

import {
	GlobalConfigContext,
} from '../../../_internal/contexts'

import {
	CommonStyleSheet,
	FlexStyleSheet,
} from '../../../_internal/style-sheets'

import {
	CarbonStyleSheet,
} from '../../../carbon-style-sheet'

import {
	ThemeContext,
} from '../../../contexts'

import {
	BaseColor as ButtonBaseColor,
	type BaseColorProps,
} from '../../button/base-color'

import {
	Text,
} from '../../text'

import type {
	BaseProps,
} from './BaseProps'

import type {
	BaseRef,
} from './BaseRef'


export const Base = forwardRef<BaseRef, BaseProps>(
	function Base(
		{
			title,
			body,
			inline,

			Icon,
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
			dir,
			...props
		},
		ref,
	) {

		const
			globalConfigContext =
				useContext(GlobalConfigContext),

			themeContext =
				useContext(ThemeContext)

		return (
			<View
				{ ...props }
				dir={ dir ?? globalConfigContext.rtl ? 'rtl' : undefined }
				style={ [
					FlexStyleSheet.flex_row,
					globalConfigContext.rtl ? CommonStyleSheet.rtl : undefined,
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
						FlexStyleSheet.flex_auto,
						FlexStyleSheet.flex_row,
						!inline
							? baseStyle.leftContainerNonInline
							: FlexStyleSheet.items_center,
						leftContainerStyle,
					] }
				>
					{ !!Icon && (
						<View
							style={ [
								baseStyle.iconContainer,
								iconContainerStyle,
							] }
						>
							<Icon
								{ ...iconProps }
								width={ 20 }
								height={ 20 }
							/>
						</View>
					) }

					{ nodes?.beforeContentContainer }

					{ (!!title || !!body) && (
						<View
							style={ [
								FlexStyleSheet.flex_auto,
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
									{ !globalConfigContext.rtl
										? (
											<>{ title }{ title && body ? ' ' : '' }{ body }</>
										)
										: (
											<>{ body }{ title && body ? ' ' : '' }{ title }</>
										) }
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
						Icon={ IconClose }
						iconProps={ iconCloseProps }
						onPress={ onPressIconClose }
						colorStateStyle={{
							background: {
								default: backgroundStyleSheet.default,
								focused: backgroundStyleSheet.focused,
								hovered: backgroundStyleSheet.hovered,
								pressed: backgroundStyleSheet.pressed,
								disabled: backgroundStyleSheet.disabled,
							},
							text: {
								default: baseStyle.text,
								focused: baseStyle.text,
								hovered: baseStyle.text,
								pressed: baseStyle.text,
								disabled: baseStyle.text,
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
							FlexStyleSheet.justify_center,
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
				marginStart: Spacing.spacing_05,
				marginEnd: Spacing.spacing_05,
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
			text: {
				color: 'transparent',
			},
		}),

	backgroundStyleSheet =
		CarbonStyleSheet.create<
			Record<keyof BaseColorProps['colorStateStyle']['background'], ViewStyle>
		>({
			default: {
				backgroundColor: 'transparent',
			},
			focused: {
				borderWidth: 1,
				borderColor: CarbonStyleSheet.color.focus,
			},
			hovered: {
				backgroundColor: CarbonStyleSheet.color.background_hover,
			},
			pressed: {
				backgroundColor: CarbonStyleSheet.color.background_active,
			},
			disabled: {
				backgroundColor: 'transparent',
			},
		}),

	mapAndroidRippleEffectColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.background_active,
			gray_100: Color.Token.gray_100.background_active,
		}
