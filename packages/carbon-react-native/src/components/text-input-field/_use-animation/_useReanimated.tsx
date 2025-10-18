import {
	useContext,
} from 'react'

import {
	Motion,
} from '@audira/carbon-react-native-elements'

import {
	Easing,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	type WithTimingConfig,
} from 'react-native-reanimated'

import {
	ThemeContext,
} from '../../../contexts'

import type {
	TextInputFieldProps,
} from '../TextInputFieldProps'

import {
	MapOutlineColorFocus,
} from './_map-outline-color-focus'

export function useReanimated({
	onBlur: onBlurProp,
	onFocus: onFocusProp,
}: Pick<TextInputFieldProps, 'onBlur' | 'onFocus'>) {

	const
		themeContext =
			useContext(ThemeContext),

		/**
		 * 0 = Blurred
		 * 1 = Focused
		 */
		focusValue =
			useSharedValue(0),

		focusOutlineStyle =
			useAnimatedStyle(() => {
				return {
					outlineColor: interpolateColor(
						focusValue.value,
						[0, 1],
						['transparent', MapOutlineColorFocus[themeContext.colorScheme]],
					),
				}
			}),

		focusHandler: TextInputFieldProps['onFocus'] =
			event => {
				focusValue.value = withTiming(1, timingConfig)
				onFocusProp?.(event)
			},

		blurHandler: TextInputFieldProps['onBlur'] =
			event => {
				focusValue.value = withTiming(0, timingConfig)
				onBlurProp?.(event)
			}

	return {
		focusOutlineStyle,
		focusHandler,
		blurHandler,
	}

}

const
	timingConfig: WithTimingConfig =
		{
			duration: Motion.Duration.fast_01,
			easing: Easing.bezier(
				Motion.Easing.standard.productive.x1,
				Motion.Easing.standard.productive.y1,
				Motion.Easing.standard.productive.x2,
				Motion.Easing.standard.productive.y2,
			),
		}
