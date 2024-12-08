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
	type ViewProps,
} from 'react-native'

import {
	SpacingConstant,
} from '../../../constants'

import {
	ThemeContext,
} from '../../../contexts'

import {
	CommonStyle,
	FlexStyle,
} from '../../../styles'

import {
	FormLabel,
	type FormLabelProps,
} from '../../form-label'

import {
	Text,
	type TextProps,
} from '../../text'

import {
	Switch,
	type SwitchProps,
	type SwitchRef,
	type SwitchState,
} from '../../switch'

export interface BaseProps extends Omit<ViewProps, 'children'> {
	state?: SwitchState,
	controlled?: boolean,
	value?: boolean,
	label?: string,
	actionText?: string,
	onChange?: SwitchProps['onChange'],
	formLabelProps?: Omit<
		FormLabelProps,
		| 'label'
	>,
	actionTextProps?: Omit<TextProps, 'children'>,
	pressableProps?: Omit<
		PressableProps,
		| 'aria-checked'
		| 'role'
		| 'style'
	> & {
		style?: ViewProps['style'],
	},
	switchProps?: Omit<
		SwitchProps,
		| 'controlled'
		| 'value'
		| 'onChange'
		| 'motion'
		| 'role'
		| 'aria-checked'
	>,
}

interface _BaseRef {
	readonly value: SwitchRef['value'],
	/**
	 * This method does nothing if `controlled` prop is true
	 */
	setValue: SwitchRef['setValue'],
}

export interface BaseRef extends View, _BaseRef {
}

export const Base = forwardRef<BaseRef, BaseProps>(
	function Base(
		{
			state = 'normal',
			controlled,
			value,
			label,
			actionText,
			onChange,
			formLabelProps,
			actionTextProps,
			pressableProps,
			switchProps,
			style,
			...viewProps
		},
		forwardedRef,
	) {

		const
			themeContext =
				useContext(ThemeContext),

			viewRef =
				useRef<View>(null),

			switchRef =
				useRef<SwitchRef>(null),

			pressHandler: NonNullable<PressableProps['onPress']> =
				useCallback(event => {
					pressableProps?.onPress?.(event)
					switchRef.current?.setValue(currentValue => !currentValue)
				}, [
					pressableProps,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, _BaseRef>(
				(viewRef.current ?? {}) as View,
				{
					get value() {
						return !!switchRef.current?.value
					},
					setValue(val) {
						switchRef.current?.setValue(val)
					},
				},
			)
		}, [])

		return (
			<View
				{ ...viewProps }
				style={ [
					FlexStyle.flex_row,
					FlexStyle.flex_wrap,
					FlexStyle.items_center,
					style,
				] }
				ref={ viewRef }
			>
				<Pressable
					{ ...pressableProps }
					role="switch"
					disabled={ state !== 'normal' }
					aria-checked={ value }
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

				{ !!label && (
					<FormLabel
						{ ...formLabelProps }
						label={ label }
						textProps={{
							...formLabelProps?.textProps,
							style: [
								{ color: themeContext.color[mapLabelColorToken[state]] },
								formLabelProps?.textProps?.style,
							],
						}}
						style={ [
							CommonStyle.w_full,
							baseStyle.label,
							formLabelProps?.style,
						] }
					/>
				) }

				<Switch
					{ ...switchProps }
					aria-label={ switchProps?.['aria-label'] || label }
					state={ state }
					disabled={ state !== 'normal' }
					role="none"
					controlled={ controlled }
					value={ value }
					onChange={ onChange }
					style={ [
						baseStyle.switch,
						switchProps?.style,
					] }
					ref={ switchRef }
				/>

				{ !!actionText && (
					<Text
						{ ...actionTextProps }
						type={ actionTextProps?.type || 'body_compact_01' }
						style={ [
							baseStyle.actionText,
							{ color: themeContext.color[mapActionTextColorToken[state]] },
							actionTextProps?.style,
						] }
					>
						{ actionText }
					</Text>
				) }
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
			switch: {
				zIndex: 2,
			},
			label: {
				marginBottom: SpacingConstant.spacing_05,
			},
			actionText: {
				marginLeft: SpacingConstant.spacing_03, // same for both size
			},
		}),

	mapLabelColorToken: Record<SwitchState, keyof ThemeContext['color']> =
		{
			normal: 'text_secondary',
			disabled: 'text_disabled',
			read_only: 'text_secondary',
		},

	mapActionTextColorToken: Record<SwitchState, keyof ThemeContext['color']> =
		{
			normal: 'text_primary',
			disabled: 'text_disabled',
			read_only: 'text_primary',
		}
