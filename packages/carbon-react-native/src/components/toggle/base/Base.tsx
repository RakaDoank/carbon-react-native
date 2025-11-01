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
	Color,
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	GlobalConfigContext,
} from '../../../_internal/contexts'

import {
	CommonStyleSheet,
	FlexStyleSheet,
} from '../../../_internal/style-sheets'

import {
	ThemeContext,
} from '../../../contexts'

import {
	FormLabel,
} from '../../form-label'

import {
	Switch,
	type SwitchRef,
	type SwitchState,
} from '../../switch'

import {
	Text,
} from '../../text'

import type {
	BaseProps,
} from './BaseProps'

import type {
	BaseRef,
} from './BaseRef'

import type {
	RefBase,
} from './_RefBase'

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
			dir,
			...viewProps
		},
		forwardedRef,
	) {

		const
			viewRef =
				useRef<View>(null),

			switchRef =
				useRef<SwitchRef>(null),

			themeContext =
				useContext(ThemeContext),

			globalConfigContext =
				useContext(GlobalConfigContext),

			pressHandler: NonNullable<PressableProps['onPress']> =
				useCallback(event => {
					pressableProps?.onPress?.(event)
					switchRef.current?.setValue(currentValue => !currentValue)
				}, [
					pressableProps,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, RefBase>(
				(viewRef.current ?? {
				}) as View,
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
				dir={ dir ?? globalConfigContext.rtl ? 'rtl' : undefined }
				style={ [
					FlexStyleSheet.flex_row,
					FlexStyleSheet.flex_wrap,
					FlexStyleSheet.items_center,
					globalConfigContext.rtl ? CommonStyleSheet.rtl : undefined,
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
								mapFormLabelTextStyle[themeContext.colorScheme][state],
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
					dir={ switchProps?.dir ?? globalConfigContext.rtl ? 'ltr' : undefined } // Fix
					style={ [
						baseStyle.switch,
						globalConfigContext.rtl ? baseStyle.ltr : undefined, // Fix
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
							mapActionTextStyle[themeContext.colorScheme][state],
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
				marginStart: Spacing.spacing_03, // same for both size
			},
			/**
			 * Fix
			 */
			ltr: {
				direction: 'ltr',
			},
		}),

	coloringStyle: {
		[ColorScheme in ThemeContext['colorScheme']]: Record<`${'formLabel' | 'actionText'}_${SwitchState}`, TextStyle>
	} =
		{
			gray_10: {
				formLabel_normal: {
					color: Color.Token.gray_10.text_primary,
				},
				formLabel_disabled: {
					color: Color.Token.gray_10.text_disabled,
				},
				formLabel_read_only: {
					color: Color.Token.gray_10.text_primary,
				},
				actionText_normal: {
					color: Color.Token.gray_10.text_primary,
				},
				actionText_disabled: {
					color: Color.Token.gray_10.text_disabled,
				},
				actionText_read_only: {
					color: Color.Token.gray_10.text_primary,
				},
			},
			gray_100: {
				formLabel_normal: {
					color: Color.Token.gray_100.text_primary,
				},
				formLabel_disabled: {
					color: Color.Token.gray_100.text_disabled,
				},
				formLabel_read_only: {
					color: Color.Token.gray_100.text_primary,
				},
				actionText_normal: {
					color: Color.Token.gray_100.text_primary,
				},
				actionText_disabled: {
					color: Color.Token.gray_100.text_disabled,
				},
				actionText_read_only: {
					color: Color.Token.gray_100.text_primary,
				},
			},
		},

	mapFormLabelTextStyle: {
		[ColorScheme in ThemeContext['colorScheme']]: Record<SwitchState, TextStyle>
	} =
		{
			gray_10: {
				normal: coloringStyle.gray_10.formLabel_normal,
				disabled: coloringStyle.gray_10.formLabel_disabled,
				read_only: coloringStyle.gray_10.formLabel_read_only,
			},
			gray_100: {
				normal: coloringStyle.gray_100.formLabel_normal,
				disabled: coloringStyle.gray_100.formLabel_disabled,
				read_only: coloringStyle.gray_100.formLabel_read_only,
			},
		},

	mapActionTextStyle: {
		[ColorScheme in ThemeContext['colorScheme']]: Record<SwitchState, TextStyle>
	} =
		{
			gray_10: {
				normal: coloringStyle.gray_10.actionText_normal,
				disabled: coloringStyle.gray_10.actionText_disabled,
				read_only: coloringStyle.gray_10.actionText_read_only,
			},
			gray_100: {
				normal: coloringStyle.gray_100.actionText_normal,
				disabled: coloringStyle.gray_100.actionText_disabled,
				read_only: coloringStyle.gray_100.actionText_read_only,
			},
		}
