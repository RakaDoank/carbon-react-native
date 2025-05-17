import {
	forwardRef,
	useContext,
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
	Checkbox,
} from '../checkbox'

import {
	FormLabel,
} from '../form-label'

import {
	Icon,
	type IconProps,
} from '../icon'

import {
	FormHelperText,
} from '../form-helper-text'

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
			stroke={ themeContext.color.background }
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
