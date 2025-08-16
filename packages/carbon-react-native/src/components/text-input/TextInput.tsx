import {
	forwardRef,
	useImperativeHandle,
	useRef,
} from 'react'

import {
	StyleSheet,
	View,
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	FormHelperText,
} from '../form-helper-text'

import {
	FormLabel,
} from '../form-label'

import {
	TextInputField,
	type TextInputFieldRef,
} from '../text-input-field'

import type {
	TextInputRefBase,
} from './_TextInputRefBase'

import type {
	TextInputProps,
} from './TextInputProps'

import type {
	TextInputRef,
} from './TextInputRef'

export const TextInput = forwardRef<TextInputRef, TextInputProps>(
	function TextInput(
		{
			label,
			helperText,

			// hoist the `TextInputFieldProps`
			size = 'medium',
			interactiveState = 'normal',
			// -----

			// hoist the actual `TextInputProps` of React Native
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

			style: viewStyleProp,
			...viewProps
		},
		ref,
	) {

		const
			viewRef =
				useRef<View>(null),

			textInputFieldRef =
				useRef<TextInputFieldRef>(null)

		useImperativeHandle(ref, () => {
			return Object.assign<View, TextInputRefBase>(
				viewRef.current ?? {} as View,
				{
					get textInputField() {
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

				<TextInputField
					ref={ textInputFieldRef }
					size={ size }
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
					editable={ editable }
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
				/>

				{ !!helperText?.length && (
					<FormHelperText
						text={ helperText }
						error={ interactiveState === 'invalid' }
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
