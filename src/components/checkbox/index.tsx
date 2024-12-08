import {
	forwardRef,
	useCallback,
	useContext,
	useImperativeHandle,
	useRef,
} from 'react'

import {
	Pressable,
	StyleSheet,
	View,
	type PressableProps,
	type TextStyle,
	type ViewProps,
} from 'react-native'

import {
	ThemeContext,
} from '../../contexts'

import {
	SpacingConstant,
} from '../../constants'
import type GRAY_10 from '../../constants/color/tokens/gray-10'

import {
	CommonStyle,
	FlexStyle,
} from '../../styles'

import {
	CheckboxInput,
	type CheckboxInputInteractiveState,
	type CheckboxInputProps,
	type CheckboxInputRef,
	type CheckboxInputState,
} from '../checkbox-input'

import {
	FormLabel,
	type FormLabelProps,
} from '../form-label'

export interface CheckboxProps extends Omit<ViewProps, 'children'> {
	controlled?: boolean,
	state?: CheckboxInputState,
	interactiveState?: CheckboxInputInteractiveState,
	label: string,
	onChange?: CheckboxInputProps['onChange'],
	checkboxInputProps?: Omit<
		CheckboxInputProps,
		| 'controlled'
		| 'state'
		| 'interactiveState'
		| 'role'
		| 'onChange'
	>,
	formLabelProps?: Omit<FormLabelProps, 'label'>,
	pressableProps?: Omit<
		PressableProps,
		| 'role'
		| 'style'
	> & {
		style?: ViewProps['style'],
	},
}

interface CheckboxRefBase {
	readonly stateValue: CheckboxInputState,
	/**
	 * This method does nothing when `controlled` prop is true  
	 * Intentionally with postfix `Value` to avoid conflict setState method from View
	 */
	setStateValue: CheckboxInputRef['setStateValue'],
}

export interface CheckboxRef extends View, CheckboxRefBase {
}

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
	function Checkbox(
		{
			controlled,
			state = 'unselected',
			interactiveState = 'normal',
			label,
			'aria-label': ariaLabel,
			onChange,
			checkboxInputProps,
			formLabelProps,
			pressableProps,
			style,
			...props
		},
		forwardedRef,
	) {

		const
			themeContext =
				useContext(ThemeContext),

			checkboxInputRef =
				useRef<CheckboxInputRef>(null),

			viewRef =
				useRef<View>(null),

			pressHandler: NonNullable<PressableProps['onPress']> =
				useCallback(event => {
					pressableProps?.onPress?.(event)
					checkboxInputRef.current?.setStateValue(
						currentState => mapStateToggler[currentState]
					)
				}, [
					pressableProps,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, CheckboxRefBase>(
				(viewRef.current ?? {}) as View,
				{
					get stateValue() {
						return checkboxInputRef.current!!.stateValue
					},
					setStateValue(state_) {
						checkboxInputRef.current?.setStateValue(state_)
					},
				},
			)
		}, [])

		return (
			<View
				{ ...props }
				aria-label={ ariaLabel || label }
				style={ [
					FlexStyle.flex_row,
					style,
				] }
				ref={ viewRef }
			>
				<Pressable
					{ ...pressableProps }
					role="checkbox"
					disabled={ interactiveState === 'disabled' }
					aria-label={ pressableProps?.['aria-label'] || label }
					onPress={ pressHandler }
					style={ [
						CommonStyle.absolute,
						CommonStyle.w_full,
						CommonStyle.h_full,
						baseStyle.pressable,
						pressableProps?.style,
					] }
				/>

				<CheckboxInput
					{ ...checkboxInputProps }
					role="none"
					controlled={ controlled }
					state={ state }
					interactiveState={ interactiveState }
					onChange={ onChange }
					style={ [
						baseStyle.checkboxInput,
						checkboxInputProps?.style,
					] }
					ref={ checkboxInputRef }
				/>

				<FormLabel
					{ ...formLabelProps }
					label={ label }
					textProps={{
						...formLabelProps?.textProps,
						type: formLabelProps?.textProps?.type || 'body_compact_01',
						style: [
							getTextColorStyle(interactiveState, themeContext.color),
							formLabelProps?.textProps?.style,
						],
					}}
					style={ [
						baseStyle.label,
						formLabelProps?.style,
					] }
				/>
			</View>
		)

	}
)

const
	baseStyle =
		StyleSheet.create({
			pressable: {
				zIndex: 1,
			},
			checkboxInput: {
				zIndex: 2,
			},
			label: {
				marginLeft: SpacingConstant.spacing_03,
			},
		}),

	mapStateToggler: Record<CheckboxInputState, CheckboxInputState> =
		{
			indeterminate: 'selected',
			selected: 'unselected',
			unselected: 'selected',
		},

	mapTextColor: Record<
		CheckboxInputInteractiveState,
		keyof typeof GRAY_10
	> =
		{
			normal: 'text_primary',
			disabled: 'text_disabled',
			error: 'text_primary',
			read_only: 'text_primary',
			warning: 'text_primary',
		}

function getTextColorStyle(
	interactiveState: CheckboxInputInteractiveState,
	color: ThemeContext['color'],
): TextStyle {
	return {
		color: color[mapTextColor[interactiveState]],
	}
}
