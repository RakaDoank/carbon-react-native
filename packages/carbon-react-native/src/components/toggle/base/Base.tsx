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
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	CarbonStyleSheet,
} from '../../../carbon-style-sheet'

import {
	ThemeContext,
} from '../../../contexts'

import {
	CommonStyleSheet,
	FlexStyleSheet,
} from '../../../_internal/style-sheets'

import {
	FormLabel,
} from '../../form-label'

import {
	Text,
} from '../../text'

import {
	Switch,
	type SwitchRef,
	type SwitchState,
} from '../../switch'

import type {
	RefBase,
} from './_RefBase'

import type {
	BaseProps,
} from './BaseProps'

import type {
	BaseRef,
} from './BaseRef'

export const Base = forwardRef<BaseRef, BaseProps>(
	function Base(
		{
			state = 'normal',
			defaultValue,
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

		useContext(ThemeContext) // keep it reactive

		const
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
			return Object.assign<View, RefBase>(
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
					FlexStyleSheet.flex_row,
					FlexStyleSheet.flex_wrap,
					FlexStyleSheet.items_center,
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
						CommonStyleSheet.absolute,
						CommonStyleSheet.w_full,
						CommonStyleSheet.h_full,
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
								mapFormLabelTextStyle[state],
								formLabelProps?.textProps?.style,
							],
						}}
						style={ [
							CommonStyleSheet.w_full,
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
					defaultValue={ defaultValue }
					value={ value }
					onChange={ onChange }
					onPress={ switchProps?.onPress ?? pressableProps?.onPress }
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
							mapActionTextStyle[state],
							actionTextProps?.style,
						] }
					>
						{ actionText }
					</Text>
				) }
			</View>
		)

	},
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
				marginBottom: Spacing.spacing_05,
			},
			actionText: {
				marginLeft: Spacing.spacing_03, // same for both size
			},
		}),

	carbonStyle =
		CarbonStyleSheet.create<Record<`${'formLabel' | 'actionText'}_${SwitchState}`, TextStyle>>({
			formLabel_normal: {
				color: CarbonStyleSheet.color.text_primary,
			},
			formLabel_disabled: {
				color: CarbonStyleSheet.color.text_disabled,
			},
			formLabel_read_only: {
				color: CarbonStyleSheet.color.text_primary,
			},
			actionText_normal: {
				color: CarbonStyleSheet.color.text_primary,
			},
			actionText_disabled: {
				color: CarbonStyleSheet.color.text_disabled,
			},
			actionText_read_only: {
				color: CarbonStyleSheet.color.text_primary,
			},
		}),

	mapFormLabelTextStyle: Record<SwitchState, TextStyle> =
		{
			normal: carbonStyle.formLabel_normal,
			disabled: carbonStyle.formLabel_disabled,
			read_only: carbonStyle.formLabel_read_only,
		},

	mapActionTextStyle: Record<SwitchState, TextStyle> =
		{
			normal: carbonStyle.actionText_normal,
			disabled: carbonStyle.actionText_disabled,
			read_only: carbonStyle.actionText_read_only,
		}
