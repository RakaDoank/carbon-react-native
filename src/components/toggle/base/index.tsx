import {
	forwardRef,
	useCallback,
	useContext,
	useImperativeHandle,
	useMemo,
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
	Text,
	type TextProps,
} from '../../text'

import {
	Switch,
	type SwitchProps,
	type SwitchRef,
} from '../../switch'

import type {
	ToggleState,
} from '../state'

export interface BaseProps extends Omit<ViewProps, 'children'> {
	state?: ToggleState,
	controlled?: boolean,
	value?: boolean,
	label?: string,
	actionText?: string,
	onChange?: SwitchProps['onChange'],
	labelProps?: Omit<TextProps, 'children'>,
	actionTextProps?: Omit<TextProps, 'children'>,
	pressableProps?: Omit<
		PressableProps,
		| 'aria-checked'
		| 'aria-label'
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
		| 'trackColor'
		| 'thumbColor'
		| 'motion'
		| 'role'
		| 'aria-label'
		| 'aria-checked'
	>,
}

export interface BaseRef extends View {
	/**
	 * This method does nothing if `controlled` prop is true
	 */
	setValue: SwitchRef['setValue'],
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
			labelProps,
			actionTextProps,
			pressableProps,
			switchProps,
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

			{ trackColor, thumbColor } =
				useMemo<{
					trackColor: SwitchProps['trackColor'],
					thumbColor: SwitchProps['thumbColor'],
				}>(() => {
					const
						trackColor_ =
							mapSwitchTrackColorToken[state],

						thumbColor_ =
							themeContext.color[mapSwitchThumbColorToken[state]]

					return {
						trackColor: {
							false: contextColorTransparentResolver(themeContext.color, trackColor_.false),
							true: contextColorTransparentResolver(themeContext.color, trackColor_.true),
						},
						thumbColor: {
							false: thumbColor_,
							true: thumbColor_,
						},
					}
				// eslint-disable-next-line react-hooks/exhaustive-deps
				}, [
					state,
				]),

			pressHandler: NonNullable<PressableProps['onPress']> =
				useCallback(event => {
					pressableProps?.onPress?.(event)
					switchRef.current?.setValue(currentValue => !currentValue)
				}, [
					pressableProps,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, { setValue: BaseRef['setValue'] }>(
				viewRef.current as View,
				{
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
					FlexStyle.flex_initial,
					FlexStyle.flex_row,
					FlexStyle.flex_wrap,
					FlexStyle.items_center,
				] }
				ref={ viewRef }
			>
				<Pressable
					{ ...pressableProps }
					role="switch"
					disabled={ state !== 'normal' }
					aria-checked={ value }
					aria-label={ label }
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
					<Text
						{ ...labelProps }
						type={ labelProps?.type || 'label_01' }
						style={ [
							{ color: themeContext.color[mapLabelColorToken[state]] },
							CommonStyle.w_full,
							baseStyle.label,
							labelProps?.style,
						] }
					>
						{ label }
					</Text>
				) }

				<Switch
					{ ...switchProps }
					disabled={ state !== 'normal' }
					role="none"
					controlled={ controlled }
					value={ value }
					trackColor={ trackColor }
					thumbColor={ thumbColor }
					onChange={ onChange }
					style={ [
						baseStyle.switch,
						state === 'read_only' ? [
							baseStyle.switchReadOnly,
							{ borderColor: themeContext.color.border_subtle_00 },
						] : null,
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
			switchReadOnly: {
				borderWidth: 1,
			},
			label: {
				marginBottom: SpacingConstant.spacing_05,
			},
			actionText: {
				marginLeft: SpacingConstant.spacing_03, // same for both size
			},
		}),

	mapSwitchTrackColorToken: Record<ToggleState | 'focused', Record<'false' | 'true', keyof ThemeContext['color'] | 'transparent'>> =
		{
			normal: {
				false: 'toggle_off',
				true: 'support_success',
			},
			disabled: {
				false: 'button_disabled',
				true: 'button_disabled',
			},
			read_only: {
				false: 'transparent',
				true: 'transparent',
			},
			focused: {
				false: 'toggle_off',
				true: 'support_success',
			},
		},

	mapSwitchThumbColorToken: Record<ToggleState | 'focused', keyof ThemeContext['color']> =
		{
			normal: 'icon_on_color',
			disabled: 'icon_on_color_disabled',
			read_only: 'icon_primary',
			focused: 'icon_on_color',
		},

	mapLabelColorToken: Record<ToggleState, keyof ThemeContext['color']> =
		{
			normal: 'text_secondary',
			disabled: 'text_disabled',
			read_only: 'text_secondary',
		},

	mapActionTextColorToken: Record<ToggleState, keyof ThemeContext['color']> =
		{
			normal: 'text_primary',
			disabled: 'text_disabled',
			read_only: 'text_primary',
		}

function contextColorTransparentResolver(
	contextColor: ThemeContext['color'],
	key: keyof ThemeContext['color'] | 'transparent',
): string {
	if(key === 'transparent') {
		return 'transparent'
	}
	return contextColor[key]
}
