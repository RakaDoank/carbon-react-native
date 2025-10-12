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

import IconWarningAltFilled from '@carbon/icons/svg/32/warning--alt--filled.svg'
import IconWarningFilled from '@carbon/icons/svg/32/warning--filled.svg'

import type {
	SvgProps,
} from 'react-native-svg'

import {
	FlexStyleSheet,
} from '../../_internal/style-sheets'

import {
	ThemeContext,
} from '../../contexts'

import {
	Checkbox,
} from '../checkbox'

import {
	FormHelperText,
} from '../form-helper-text'

import {
	FormLabel,
} from '../form-label'

import type {
	CheckboxGroupProps,
} from './CheckboxGroupProps'

import type {
	CheckboxGroupRef,
} from './CheckboxGroupRef'

const Component = forwardRef<CheckboxGroupRef, CheckboxGroupProps>(
	function CheckboxGroup(
		{
			orientation = 'vertical',
			legend,
			helperText,
			helperTextMode,
			helperTextModeIcon = true,
			formHelperTextProps,
			children,
			style,
			...props
		},
		ref,
	) {

		return (
			<View
				{ ...props }
				style={ style }
				ref={ ref }
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
					{ children }
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

export const CheckboxGroup = Object.assign(Component, {
	Item: Checkbox,
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
		StyleSheet.create<Record<NonNullable<CheckboxGroupProps['orientation']>, ViewStyle>>({
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

	mapIconErrorStrokeColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.background,
			gray_100: Color.Token.gray_100.background,
		},

	mapIconWarningFillColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.support_warning,
			gray_100: Color.Token.gray_100.support_warning,
		}

interface IconRendererProps extends Omit<SvgProps, 'src' | 'fill' | 'width' | 'height'> {
}

function IconErrorRenderer(props: IconRendererProps) {

	const themeContext = useContext(ThemeContext)

	// return (
	// 	<Icon
	// 		{ ...props }
	// 		src={ IconWarningFilled }
	// 		fill={ mapIconErrorFillColor[themeContext.colorScheme] }
	// 		stroke={ mapIconErrorStrokeColor[themeContext.colorScheme] }
	// 		width={ 18 }
	// 		height={ 18 }
	// 	/>
	// )
	return (
		<IconWarningFilled
			{ ...props }
			fill={ mapIconErrorFillColor[themeContext.colorScheme] }
			stroke={ mapIconErrorStrokeColor[themeContext.colorScheme] }
			width={ 18 }
			height={ 18 }
		/>
	)

}

// // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
// IconWarningAltFilled.content[0].attrs.fill = 'black'
function IconWarningRenderer(props: IconRendererProps) {

	const themeContext = useContext(ThemeContext)

	// return (
	// 	<Icon
	// 		{ ...props }
	// 		src={ IconWarningAltFilled }
	// 		fill={ mapIconWarningFillColor[themeContext.colorScheme] }
	// 		width={ 18 }
	// 		height={ 18 }
	// 	/>
	// )
	return (
		<IconWarningAltFilled
			{ ...props }
			fill={ mapIconWarningFillColor[themeContext.colorScheme] }
			width={ 18 }
			height={ 18 }
		/>
	)

}
