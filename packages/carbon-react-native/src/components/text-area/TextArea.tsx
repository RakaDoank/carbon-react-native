import {
	forwardRef,
	useImperativeHandle,
	useRef,
} from "react"

import {
	StyleSheet,
	View,
} from "react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

import {
	FormHelperText,
} from "../form-helper-text"

import {
	FormLabel,
} from "../form-label"

import {
	TextAreaField,
	type TextAreaFieldRef,
} from "../text-area-field"

import type {
	TextAreaProps,
} from "./TextAreaProps"

import type {
	TextAreaRef,
} from "./TextAreaRef"

import type {
	TextAreaRefBase,
} from "./_TextAreaRefBase"

export const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
	function TextArea(
		{
			label,
			helperText,

			// hoist the `TextAreaFieldProps`
			interactiveState = "normal",
			textInputStyle,
			// -----

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
			onBlur,
			onChange,
			onChangeText,
			onContentSizeChange,
			onEndEditing,
			onPress,
			onPressIn,
			onPressOut,
			onFocus,
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

			style: viewStyleProp,
			...viewProps
		},
		ref,
	) {

		const
			viewRef =
				useRef<View>(null),

			textInputFieldRef =
				useRef<TextAreaFieldRef>(null)

		useImperativeHandle(ref, () => {
			return Object.assign<View, TextAreaRefBase>(
				viewRef.current ?? {
				} as View,
				{
					get textAreaField() {
						return textInputFieldRef.current ?? undefined
					},
				},
			)
		}, [])

		return (
			<View
				{ ...viewProps }
				ref={ viewRef }
				style={ viewStyleProp }
			>
				<FormLabel
					label={ label }
					style={ styleSheet.label }
				/>

				<TextAreaField
					ref={ textInputFieldRef }
					interactiveState={ interactiveState }
					textInputStyle={ textInputStyle }

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
					editable={ editable }
					keyboardType={ keyboardType }
					inputMode={ inputMode }
					maxLength={ maxLength }
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

				{ !!helperText?.length && (
					<FormHelperText
						text={ helperText }
						error={ interactiveState === "invalid" }
						style={ styleSheet.helperText }
					/>
				) }
			</View>
		)

	},
)

const
	styleSheet =
		StyleSheet.create({
			label: {
				marginBottom: Spacing.spacing_03,
			},
			helperText: {
				marginTop: Spacing.spacing_02,
			},
		})
