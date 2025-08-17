import {
	forwardRef,
	useContext,
	useImperativeHandle,
	useRef,
} from 'react'

import {
	StyleSheet,
	TextInput,
	type View,
	type ViewStyle,
} from 'react-native'

import Animated, {
	Easing,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	type WithTimingConfig,
} from 'react-native-reanimated'

import {
	Color,
	Motion,
	Spacing,
	type ColorLayerLevel,
} from '@audira/carbon-react-native-elements'

import IconWarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16'
import IconWarningFilled16 from '@carbon/icons/es/warning--filled/16'

import {
	CarbonStyleSheet,
} from '../../carbon-style-sheet'

import {
	ThemeContext,
} from '../../contexts'

import type {
	ThemeType,
} from '../../types'

import {
	Icon,
} from '../icon'

import {
	LayerContext,
} from '../layer'

import {
	RNTextInput,
} from './_rn-text-input'

import type {
	TextInputFieldProps,
} from './TextInputFieldProps'

import type {
	TextInputFieldRef,
} from './TextInputFieldRef'

import type {
	TextInputFieldSize,
} from './TextInputFieldSize'

export const TextInputField = forwardRef<TextInputFieldRef, TextInputFieldProps>(
	function TextInputField(
		{
			size = 'medium',
			interactiveState = 'normal',
			hideInteractiveStateIcon,
			blockStartNode,
			blockEndNode,
			style,
			textInputStyle,

			// hoist the actual TextInputProps of React Native
			allowFontScaling,
			autoCapitalize,
			autoComplete,
			autoCorrect,
			autoFocus,
			blurOnSubmit,
			submitBehavior,
			caretHidden,
			contextMenuHidden,
			defaultValue,
			value,
			editable,
			keyboardType,
			inputMode,
			maxLength,
			multiline,
			onBlur: onBlurProp,
			onChange,
			onChangeText,
			onContentSizeChange,
			onEndEditing,
			onPress,
			onPressIn,
			onPressOut,
			onFocus: onFocusProp,
			onSelectionChange,
			onSubmitEditing,
			onScroll,
			onKeyPress,
			placeholder,
			placeholderTextColor,
			readOnly,
			returnKeyType,
			enterKeyHint,
			secureTextEntry,
			selectTextOnFocus,
			selection,
			selectionColor,
			textAlign,
			inputAccessoryViewID,
			inputAccessoryViewButtonLabel,
			maxFontSizeMultiplier,
			// -----

			...viewProps
		},
		ref,
	) {

		const
			themeContext =
				useContext(ThemeContext),

			layerContextLevel =
				useContext(LayerContext),

			viewRef =
				useRef<View>(null),

			textInputRef =
				useRef<TextInput>(null),

			/**
			 * 0 = Blurred
			 * 1 = Focused
			 */
			focusValue =
				useSharedValue(0),

			focusOutlineStyle =
				useAnimatedStyle(() => {
					return {
						outlineColor: interpolateColor(
							focusValue.value,
							[0, 1],
							['transparent', mapOutlineColorFocus[themeContext.colorScheme]],
						),
					}
				}),

			onFocus: TextInputFieldProps['onFocus'] =
				event => {
					focusValue.value = withTiming(1, timingConfig)
					onFocusProp?.(event)
				},

			onBlur: TextInputFieldProps['onBlur'] =
				event => {
					focusValue.value = withTiming(0, timingConfig)
					onBlurProp?.(event)
				}

		useImperativeHandle(ref, () => {
			return Object.assign(
				viewRef.current ?? {} as View,
				{
					get textInput() {
						return textInputRef.current ?? undefined
					},
				},
			)
		}, [])

		return (
			<Animated.View
				ref={ ref }
				{ ...viewProps }
				style={ [
					styleSheet.textInputField,
					carbonStyleSheet.textInputField,
					textInputFieldSizeStyleSheet[size],
					textInputFieldByLayerStyleSheet[layerContextLevel],
					interactiveState === 'invalid'
						? carbonStyleSheet.invalidOutlineColor
						: focusOutlineStyle,
					style,
				] }
			>
				{ blockStartNode }

				<RNTextInput
					ref={ textInputRef }
					interactiveState={ interactiveState }
					allowFontScaling={ allowFontScaling }
					autoCapitalize={ autoCapitalize }
					autoComplete={ autoComplete }
					autoCorrect={ autoCorrect }
					autoFocus={ autoFocus }
					blurOnSubmit={ blurOnSubmit }
					submitBehavior={ submitBehavior }
					caretHidden={ caretHidden }
					contextMenuHidden={ contextMenuHidden }
					defaultValue={ defaultValue }
					value={ value }
					editable={ interactiveState === 'disabled' || interactiveState === 'read_only' ? false : editable }
					keyboardType={ keyboardType }
					inputMode={ inputMode }
					maxLength={ maxLength }
					multiline={ multiline }
					onBlur={ onBlur }
					onChange={ onChange }
					onChangeText={ onChangeText }
					onContentSizeChange={ onContentSizeChange }
					onEndEditing={ onEndEditing }
					onPress={ onPress }
					onPressIn={ onPressIn }
					onPressOut={ onPressOut }
					onFocus={ onFocus }
					onSelectionChange={ onSelectionChange }
					onSubmitEditing={ onSubmitEditing }
					onScroll={ onScroll }
					onKeyPress={ onKeyPress }
					placeholder={ placeholder }
					placeholderTextColor={ placeholderTextColor }
					readOnly={ readOnly }
					returnKeyType={ returnKeyType }
					enterKeyHint={ enterKeyHint }
					secureTextEntry={ secureTextEntry }
					selectTextOnFocus={ selectTextOnFocus }
					selection={ selection }
					selectionColor={ selectionColor }
					textAlign={ textAlign }
					inputAccessoryViewID={ inputAccessoryViewID }
					inputAccessoryViewButtonLabel={ inputAccessoryViewButtonLabel }
					maxFontSizeMultiplier={ maxFontSizeMultiplier }
					style={ textInputStyle }
				/>

				{ !hideInteractiveStateIcon && interactiveState === 'invalid' ? (
					<Icon
						src={ IconWarningFilled16 }
						width={ 16 }
						height={ 16 }
						fill={ mapIconInvalidColor[themeContext.colorScheme] }
						style={ [
							styleSheet.icon,
							iconBySizeStyleSheet[size],
						] }
					/>
				) : !hideInteractiveStateIcon && interactiveState === 'warning' ? (
					<Icon
						src={ IconWarningAltFilled16 }
						width={ 16 }
						height={ 16 }
						fill={ mapIconWarningColor[themeContext.colorScheme] }
						style={ [
							styleSheet.icon,
							iconBySizeStyleSheet[size],
						] }
					/>
				) : undefined }

				{ blockEndNode }
			</Animated.View>
		)

	},
)

const
	timingConfig: WithTimingConfig =
		{
			duration: Motion.Duration.fast_01,
			easing: Easing.bezier(
				Motion.Easing.standard.productive.x1,
				Motion.Easing.standard.productive.y1,
				Motion.Easing.standard.productive.x2,
				Motion.Easing.standard.productive.y2,
			),
		},

	mapOutlineColorFocus: Record<ThemeType.ColorScheme, string> =
		{
			gray_10: Color.Token.gray_10.focus,
			gray_100: Color.Token.gray_100.focus,
		},

	styleSheet =
		StyleSheet.create({
			textInputField: {
				outlineWidth: 2,
				outlineOffset: -2,
				outlineStyle: 'solid',
			},
			icon: {
				pointerEvents: 'none',
				position: 'absolute',
				right: Spacing.spacing_05,
			},
		}),

	textInputFieldSizeStyleSheet =
		StyleSheet.create<Record<TextInputFieldSize, ViewStyle>>({
			small: {
				height: 32,
			},
			medium: {
				height: 40,
			},
			large: {
				height: 48,
			},
		}),

	iconBySizeStyleSheet =
		StyleSheet.create<Record<TextInputFieldSize, ViewStyle>>({
			small: {
				top: 32 / 2 - 8,
			},
			medium: {
				top: 40 / 2 - 8,
			},
			large: {
				top: 48 / 2 - 8,
			},
		}),

	carbonStyleSheet =
		CarbonStyleSheet.create({
			textInputField: {
				backgroundColor: CarbonStyleSheet.color.field_02,
			},
			invalidOutlineColor: {
				outlineColor: CarbonStyleSheet.color.support_error,
			},
		}),

	textInputFieldByLayerStyleSheet =
		CarbonStyleSheet.create<Record<ColorLayerLevel, ViewStyle>>({
			1: {
				backgroundColor: CarbonStyleSheet.color.field_01,
			},
			2: {
				backgroundColor: CarbonStyleSheet.color.field_02,
			},
			3: {
				backgroundColor: CarbonStyleSheet.color.field_03,
			},
		}),

	mapIconInvalidColor: Record<ThemeType.ColorScheme, string> =
		{
			gray_10: Color.Token.gray_10.support_error,
			gray_100: Color.Token.gray_100.support_error,
		},

	mapIconWarningColor: Record<ThemeType.ColorScheme, string> =
		{
			gray_10: Color.Token.gray_10.support_warning,
			gray_100: Color.Token.gray_100.support_warning,
		}
