import {
	forwardRef,
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

import IconWarningAltFilled from '@carbon/icons/es/warning--alt--filled/16'
import IconWarningFilled from '@carbon/icons/es/warning--filled/16'

import {
	SpacingConstant,
} from '../../constants'

import {
	ThemeContext,
} from '../../contexts'

import {
	FlexStyle,
} from '../../styles'

import {
	FormHelperText,
} from '../form-helper-text'

import {
	FormLabel,
} from '../form-label'

import {
	Icon,
	type IconProps,
} from '../icon'

import {
	RadioButtonGroupItemContext,
} from './_item-context'

import {
	RadioButtonGroupItem,
} from './_item'

import type {
	RadioButtonGroupProps,
	RadioButtonGroupRef,
} from './types'

import type {
	RadioButtonGroupRefBase,
} from './_types/ref-base'

export type * from './types'

const Component = forwardRef<RadioButtonGroupRef, RadioButtonGroupProps>(
	function RadioButtonGroup(
		{
			controlled,
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
					isMounted: false,
					selectedValue: selectedValueProp,
				}),

			[selectedValueSelf, setSelectedValueSelf] =
				useState(selectedValueProp),

			selectedValue =
				controlled ? selectedValueProp : selectedValueSelf

		useEffect(() => {
			if(!ref.current.isMounted) {
				ref.current.isMounted = true
			} else {
				ref.current.selectedValue = selectedValue
				onChange?.(selectedValue)
			}
		}, [
			selectedValue,
			onChange,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RadioButtonGroupRefBase>(
				(viewRef.current ?? {}) as View,
				{
					get selectedValue() {
						return ref.current.selectedValue
					},
					setSelectedValue(valueParam) {
						if(!controlled) {
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
					<RadioButtonGroupItemContext.Provider
						value={{
							controlled,
							value: selectedValue,
							setValue: setSelectedValueSelf,
						}}
					>
						{ children }
					</RadioButtonGroupItemContext.Provider>
				</View>

				{ !!helperText && (
					<FormHelperText
						{ ...formHelperTextProps }
						error={ helperTextMode === 'error' }
						text={ helperText }
						textLeading={
							helperTextModeIcon && helperTextMode === 'error' ? (
								<IconErrorRenderer/>
							) : helperTextModeIcon && helperTextMode === 'warning' ? (
								<IconWarningRenderer/>
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

	}
)

export const RadioButtonGroup = Object.assign(Component, {
	Item: RadioButtonGroupItem,
})

const
	baseStyle =
		StyleSheet.create({
			wrapper: {
				columnGap: SpacingConstant.spacing_05,
				rowGap: SpacingConstant.spacing_03,
			},
			legend: {
				marginBottom: SpacingConstant.spacing_03,
			},
			formHelperText: {
				marginTop: SpacingConstant.spacing_03,
			},
		}),

	wrapperOrientationStyle =
		StyleSheet.create<Record<NonNullable<RadioButtonGroupProps['orientation']>, ViewStyle>>({
			vertical: {
				flexDirection: 'column',
			},
			horizontal: {
				...FlexStyle.flex_wrap,
				flexDirection: 'row',
			},
		})

interface IconRendererProps extends Omit<IconProps, 'src' | 'fill' | 'width' | 'height'> {
}

function IconErrorRenderer(props: IconRendererProps) {

	const themeContext = useContext(ThemeContext)

	return (
		<Icon
			{ ...props }
			src={ IconWarningFilled }
			fill={ themeContext.color.support_error }
			width={ 18 }
			height={ 18 }
		/>
	)

}

IconWarningAltFilled.content[0].attrs.fill = 'black'
function IconWarningRenderer(props: IconRendererProps) {

	const themeContext = useContext(ThemeContext)

	return (
		<Icon
			{ ...props }
			src={ IconWarningAltFilled }
			fill={ themeContext.color.support_warning }
			width={ 18 }
			height={ 18 }
		/>
	)

}
