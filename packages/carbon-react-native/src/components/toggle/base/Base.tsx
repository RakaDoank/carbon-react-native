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
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	ThemeContext,
} from '../../../contexts'

import {
	CommonStyle,
	FlexStyle,
} from '../../../styles'

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
							{ color: themeContext.color[mapActionTextColorToken[state]] },
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
