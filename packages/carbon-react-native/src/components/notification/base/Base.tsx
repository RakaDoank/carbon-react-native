import {
	forwardRef,
	useContext,
} from 'react'

import {
	StyleSheet,
	View,
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

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
						android_rippleEffectColor={ themeContext.color.background_active }
						size="large_expressive"
						iconNode={ (iconColorState, iconSize, iconStyle) => iconCloseRenderer(iconCloseProps, iconColorState, iconSize, iconStyle) }
						onPress={ onPressIconClose }
						colorStateStyle={{
							background: {
								default: {
									backgroundColor: 'transparent',
								},
								focused: {
									borderWidth: 1,
									borderColor: themeContext.color.focus,
								},
								hovered: { backgroundColor: themeContext.color.background_hover },
								pressed: { backgroundColor: themeContext.color.background_active },
								disabled: { backgroundColor: 'transparent' },
							},
							text: {
								default: { color: 'transparent' },
								focused: { color: 'transparent' },
								hovered: { color: 'transparent' },
								pressed: { color: 'transparent' },
								disabled: { color: 'transparent' },
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
