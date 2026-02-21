import {
	forwardRef,
	useContext,
	useImperativeHandle,
	useRef,
} from "react"

import {
	Animated,
	Easing,
	StyleSheet,
	TextInput,
	type View,
	type ViewStyle,
} from "react-native"

import {
	Color,
	Motion,
	Spacing,
	type ColorLayerLevel,
} from "@audira/carbon-react-native-elements"

import IconWarningAltFilled from "@carbon/icons/svg/32/warning--alt--filled.svg"
import IconWarningFilled from "@carbon/icons/svg/32/warning--filled.svg"

import {
	GlobalConfigContext,
} from "../../_internal/contexts"

import {
	CarbonStyleSheet,
} from "../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../contexts"

import {
	PositionStyleSheet,
} from "../../style-sheets"

import type {
	ThemeType,
} from "../../types"

import {
	Box,
} from "../box"

import {
	LayerContext,
} from "../layer"

import type {
	TextInputFieldProps,
} from "./TextInputFieldProps"

import type {
	TextInputFieldRef,
} from "./TextInputFieldRef"

import type {
	TextInputFieldSize,
} from "./TextInputFieldSize"

import {
	RNTextInput,
} from "./_rn-text-input"

export const TextInputField = forwardRef<TextInputFieldRef, TextInputFieldProps>(
	function TextInputField(
		{
			size = "medium",
			interactiveState = "normal",
			hideInteractiveStateIcon,
			blockStartNode,
			blockEndNode,
			style,
			textInputStyle,

			// hoist TextInputProps of React Native
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

			// hoist TextInputAndroidProps
			cursorColor,
			selectionHandleColor,
			importantForAutofill,
			disableFullscreenUI,
			inlineImageLeft,
			inlineImagePadding,
			numberOfLines,
			returnKeyLabel,
			textBreakStrategy,
			underlineColorAndroid,
			textAlignVertical,
			showSoftInputOnFocus,
			verticalAlign,
			// -----

			// hoist TextInputIOSProps
			disableKeyboardShortcuts,
			clearButtonMode,
			clearTextOnFocus,
			dataDetectorTypes,
			enablesReturnKeyAutomatically,
			keyboardAppearance,
			passwordRules,
			rejectResponderTermination,
			selectionState,
			spellCheck,
			textContentType,
			scrollEnabled,
			lineBreakStrategyIOS,
			lineBreakModeIOS,
			smartInsertDelete,
			// -----

			...viewProps
		},
		ref,
	) {

		const
			globalConfigContext =
				useContext(GlobalConfigContext),

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
			focusAnimatedValue =
				useRef(new Animated.Value(0)),

			focusHandler: TextInputFieldProps["onFocus"] =
				event => {
					Animated
						.timing(
							focusAnimatedValue.current,
							{
								toValue: 1,
								...timingConfig,
							},
						)
						.start()
					onFocusProp?.(event)
				},

			blurHandler: TextInputFieldProps["onBlur"] =
				event => {
					Animated
						.timing(
							focusAnimatedValue.current,
							{
								toValue: 0,
								...timingConfig,
							},
						)
						.start()
					onBlurProp?.(event)
				}

		useImperativeHandle(ref, () => {
			return Object.assign(
				viewRef.current ?? {
				} as View,
				{
					get textInput() {
						return textInputRef.current ?? undefined
					},
				},
			)
		}, [])

		return (
			<AnimatedBox
				ref={ ref }
				{ ...viewProps }
				style={ [
					styleSheet.textInputField,
					carbonStyleSheet.textInputField,
					textInputFieldSizeStyleSheet[size],
					textInputFieldByLayerStyleSheet[layerContextLevel],
					interactiveState === "invalid"
						? carbonStyleSheet.invalidOutlineColor
						: {
							outlineColor: focusAnimatedValue.current.interpolate({
								inputRange: [0, 1],
								outputRange: ["transparent", mapOutlineColorFocus[themeContext.colorScheme]],
							}),
						},
					style,
				] }
			>
				{ blockStartNode }

				<RNTextInput
					ref={ textInputRef }
					interactiveState={ interactiveState }
					style={ textInputStyle }

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
					editable={ interactiveState === "disabled" || interactiveState === "read_only" ? false : editable }
					keyboardType={ keyboardType }
					inputMode={ inputMode }
					maxLength={ maxLength }
					multiline={ multiline }
					onBlur={ blurHandler }
					onChange={ onChange }
					onChangeText={ onChangeText }
					onContentSizeChange={ onContentSizeChange }
					onEndEditing={ onEndEditing }
					onPress={ onPress }
					onPressIn={ onPressIn }
					onPressOut={ onPressOut }
					onFocus={ focusHandler }
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

					cursorColor={ cursorColor }
					selectionHandleColor={ selectionHandleColor }
					importantForAutofill={ importantForAutofill }
					disableFullscreenUI={ disableFullscreenUI }
					inlineImageLeft={ inlineImageLeft }
					inlineImagePadding={ inlineImagePadding }
					numberOfLines={ numberOfLines }
					returnKeyLabel={ returnKeyLabel }
					textBreakStrategy={ textBreakStrategy }
					underlineColorAndroid={ underlineColorAndroid }
					textAlignVertical={ textAlignVertical }
					showSoftInputOnFocus={ showSoftInputOnFocus }
					verticalAlign={ verticalAlign }

					disableKeyboardShortcuts={ disableKeyboardShortcuts }
					clearButtonMode={ clearButtonMode }
					clearTextOnFocus={ clearTextOnFocus }
					dataDetectorTypes={ dataDetectorTypes }
					enablesReturnKeyAutomatically={ enablesReturnKeyAutomatically }
					keyboardAppearance={ keyboardAppearance }
					passwordRules={ passwordRules }
					rejectResponderTermination={ rejectResponderTermination }
					selectionState={ selectionState }
					spellCheck={ spellCheck }
					textContentType={ textContentType }
					scrollEnabled={ scrollEnabled }
					lineBreakStrategyIOS={ lineBreakStrategyIOS }
					lineBreakModeIOS={ lineBreakModeIOS }
					smartInsertDelete={ smartInsertDelete }
				/>

				{ !hideInteractiveStateIcon && interactiveState === "invalid" ? (
					<IconWarningFilled
						width={ 16 }
						height={ 16 }
						fill={ mapIconInvalidColor[themeContext.colorScheme] }
						style={ [
							PositionStyleSheet.absolute,
							styleSheet.icon,
							mapStyleSheetIconInteractiveStatePosition[`${globalConfigContext.rtl}`],
							iconBySizeStyleSheet[size],
						] }
					/>
				) : !hideInteractiveStateIcon && interactiveState === "warning" ? (
					<IconWarningAltFilled
						width={ 16 }
						height={ 16 }
						fill={ mapIconWarningColor[themeContext.colorScheme] }
						style={ [
							PositionStyleSheet.absolute,
							styleSheet.icon,
							mapStyleSheetIconInteractiveStatePosition[`${globalConfigContext.rtl}`],
							iconBySizeStyleSheet[size],
						] }
					/>
				) : undefined }

				{ blockEndNode }
			</AnimatedBox>
		)

	},
)

const
	AnimatedBox =
		Animated.createAnimatedComponent(Box),

	styleSheet =
		StyleSheet.create({
			textInputField: {
				outlineWidth: 2,
				outlineOffset: -2,
				outlineStyle: "solid",
			},
			icon: {
				pointerEvents: "none",
			},
			iconLtr: {
				right: Spacing.spacing_05,
			},
			iconRtl: {
				left: Spacing.spacing_05,
			},
		}),

	mapStyleSheetIconInteractiveStatePosition: {
		[RTL in `${boolean}`]: ViewStyle
	} =
		{
			false: styleSheet.iconLtr,
			true: styleSheet.iconRtl,
		},

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
		},

	mapOutlineColorFocus: Record<ThemeType.ColorScheme, string> =
		{
			gray_10: Color.Token.gray_10.focus,
			gray_100: Color.Token.gray_100.focus,
		},

	timingConfig =
		{
			duration: Motion.Duration.fast_01,
			easing: Easing.bezier(
				Motion.Easing.standard.productive.x1,
				Motion.Easing.standard.productive.y1,
				Motion.Easing.standard.productive.x2,
				Motion.Easing.standard.productive.y2,
			),
			useNativeDriver: false, // outlineColor doesn't support native driver
		} as const satisfies Omit<Animated.TimingAnimationConfig, "toValue">
