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
	Spacing,
} from '@audira/carbon-react-native-elements'

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
	ItemContext,
} from './_item-context'

import {
	Item,
} from './_item'

import type {
	RefBase,
} from './_RefBase'

import type {
	RadioButtonGroupProps,
} from './RadioButtonGroupProps'

import type {
	RadioButtonGroupRef,
} from './RadioButtonGroupRef'

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
					isMounted: false,
					selectedValue: defaultSelectedValue,
				}),

			[selectedValueSelf, setSelectedValueSelf] =
				useState(ref.current.selectedValue),

			controlled =
				typeof selectedValueProp !== 'undefined',

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
			return Object.assign<View, RefBase>(
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
					<ItemContext.Provider
						value={{
							controlled,
							value: selectedValue,
							setValue: setSelectedValueSelf,
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
