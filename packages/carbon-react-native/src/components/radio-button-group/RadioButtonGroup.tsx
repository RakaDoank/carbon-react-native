import {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
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

import IconWarningAltFilled from '@carbon/icons/svg/32/warning--alt--filled.svg'
import IconWarningFilled from '@carbon/icons/svg/32/warning--filled.svg'

import {
	FlexStyleSheet,
} from '../../_internal/style-sheets'

import {
	ThemeContext,
} from '../../contexts'

import {
	FormHelperText,
} from '../form-helper-text'

import {
	FormLabel,
} from '../form-label'

import type {
	RadioButtonGroupProps,
} from './RadioButtonGroupProps'

import type {
	RadioButtonGroupRef,
} from './RadioButtonGroupRef'

import {
	Item,
} from './_Item'

import type {
	RefBase,
} from './_RefBase'

import {
	ItemContext,
} from './_item-context'


const Component = forwardRef<RadioButtonGroupRef, RadioButtonGroupProps>(
	function RadioButtonGroup(
		{
			defaultSelectedValue,
			selectedValue: selectedValueProp,
			orientation = 'vertical',
			legend,
			helperText,
			helperTextMode = 'normal',
			helperTextModeIcon = true,
			onChange,
			formHelperTextProps,
			children,
			role = 'radiogroup',
			style,
			...props
		},
		forwardedRef,
	) {

		const
			viewRef =
				useRef<View>(null),

			ref =
				useRef({
					onChangeEffect: false,
					selectedValue: defaultSelectedValue,
				}),

			themeContext =
				useContext(ThemeContext),

			[selectedValueSelf, setSelectedValueSelf] =
				useState(ref.current.selectedValue),

			controlled =
				typeof selectedValueProp !== 'undefined',

			selectedValue =
				controlled ? selectedValueProp : selectedValueSelf,

			setOnChangeGroupEffect: NonNullable<ItemContext['setOnChangeGroupEffect']> =
				useCallback(value => {
					ref.current.onChangeEffect = value
				}, [])

		useEffect(() => {
			if(ref.current.onChangeEffect) {
				ref.current.onChangeEffect = false
				onChange?.(selectedValue)
			}
		}, [
			selectedValue,
			onChange,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RefBase>(
				(viewRef.current ?? {
				}) as View,
				{
					get selectedValue() {
						return ref.current.selectedValue
					},
					setSelectedValue(valueParam) {
						if(!controlled) {
							ref.current.onChangeEffect = true
							if(typeof valueParam !== 'function') {
								setSelectedValueSelf(valueParam)
							} else {
								setSelectedValueSelf(valueParam(ref.current.selectedValue))
							}
						}
					},
				},
			)
		}, [
			controlled,
		])

		return (
			<View
				{ ...props }
				role={ role }
				style={ style }
				ref={ viewRef }
			>
				<FormLabel
					label={ legend }
					style={ baseStyle.legend }
				/>

				<View
					style={ [
						baseStyle.wrapper,
						wrapperOrientationStyle[orientation],
					] }
				>
					<ItemContext.Provider
						value={{
							controlled,
							value: selectedValue,
							setValue: setSelectedValueSelf,
							setOnChangeGroupEffect,
							onChangeGroup: onChange,
						}}
					>
						{ children }
					</ItemContext.Provider>
				</View>

				{ !!helperText && (
					<FormHelperText
						{ ...formHelperTextProps }
						error={ helperTextMode === 'error' }
						text={ helperText }
						textLeading={
							helperTextModeIcon && helperTextMode === 'error' ? (
								<IconWarningFilled
									fill={ mapIconErrorFillColor[themeContext.colorScheme] }
									width={ 18 }
									height={ 18 }
								/>
							) : helperTextModeIcon && helperTextMode === 'warning' ? (
								<IconWarningAltFilled
									fill={ mapIconWarningFillColor[themeContext.colorScheme] }
									width={ 18 }
									height={ 18 }
								/>
							) : formHelperTextProps?.textLeading
						}
						style={ [
							baseStyle.formHelperText,
							formHelperTextProps?.style,
						] }
					/>
				) }
			</View>
		)

	},
)

export const RadioButtonGroup = Object.assign(Component, {
	Item,
})

const
	baseStyle =
		StyleSheet.create({
			wrapper: {
				columnGap: Spacing.spacing_05,
				rowGap: Spacing.spacing_03,
			},
			legend: {
				marginBottom: Spacing.spacing_03,
			},
			formHelperText: {
				marginTop: Spacing.spacing_03,
			},
		}),

	wrapperOrientationStyle =
		StyleSheet.create<Record<NonNullable<RadioButtonGroupProps['orientation']>, ViewStyle>>({
			vertical: {
				flexDirection: 'column',
			},
			horizontal: {
				...FlexStyleSheet.flex_wrap,
				flexDirection: 'row',
			},
		}),

	mapIconErrorFillColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.support_error,
			gray_100: Color.Token.gray_10.support_error,
		},

	mapIconWarningFillColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.support_warning,
			gray_100: Color.Token.gray_100.support_warning,
		}
