import {
	forwardRef,
	useContext,
} from 'react'

import {
	StyleSheet,
	View,
	type ViewProps,
} from 'react-native'

import {
	SpacingConstant,
} from '../../../constants'

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
	type IconProps,
} from '../../icon'

import {
	Text,
	type TextProps,
} from '../../text'

import IconClose from '@carbon/icons/es/close/20'

export interface BaseProps extends Omit<ViewProps, 'children'> {
	title?: string,
	/**
	 * You can fill it with string or number to render quickly useful message.  
	 * Alternatively, you can use `<Notification.Subtitle>` with `<Notification.SubtitleLink>` if necessary
	 */
	body?: React.ReactNode,
	inline?: boolean,

	icon?: IconProps['src'],
	iconProps?: Omit<IconProps, 'src' | 'width' | 'height'>,
	iconContainerStyle?: ViewProps['style'],

	iconClose?: boolean,
	onPressIconClose?: BaseColorProps['onPress'],
	iconCloseProps?: Omit<
		IconProps,
		| 'src'
		| 'width'
		| 'height'
	>,
	iconCloseButtonProps?: Omit<
		BaseColorProps,
		| 'text'
		| 'size'
		| 'icon'
		| 'iconNode'
		| 'colorStateStyle'
		| 'onPress'
	>,

	nodes?: Partial<Record<
		| 'beforeContentContainer'
		| 'beforeButtonClose'
		| 'afterContentContainer'
		| 'beforeContentContainerEnd',
		React.ReactNode
	>>,

	titleStyle?: TextProps['style'],
	leftBarStyle?: ViewProps['style'],
	leftContainerStyle?: ViewProps['style'],
	contentContainerStyle?: ViewProps['style'],
}

export interface BaseRef extends View {
}

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
				marginLeft: SpacingConstant.spacing_05,
				marginRight: SpacingConstant.spacing_05,
			},
			leftContainerNonInline: {
				marginTop: SpacingConstant.spacing_05,
				marginBottom: SpacingConstant.spacing_05,
			},
			inlineTextWrapper: {
				marginTop: SpacingConstant.spacing_04,
				marginBottom: SpacingConstant.spacing_04,
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
