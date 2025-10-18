import {
	useContext,
	useRef,
} from 'react'

import {
	Animated,
	Easing,
	type ViewProps,
} from 'react-native'

import {
	Motion,
} from '@audira/carbon-react-native-elements'

import {
	ThemeContext,
} from '../../../contexts'

import type {
	TextInputFieldProps,
} from '../TextInputFieldProps'

import {
	MapOutlineColorFocus,
} from './_map-outline-color-focus'

export function useAnimated({
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
			useRef(new Animated.Value(0)),

		focusHandler: TextInputFieldProps['onFocus'] =
			event => {
				Animated
					.timing(
						focusValue.current,
						{
							toValue: 1,
							...timingConfig,
						},
					)
					.start()
				onFocusProp?.(event)
			},

		blurHandler: TextInputFieldProps['onBlur'] =
			event => {
				Animated
					.timing(
						focusValue.current,
						{
							toValue: 0,
							...timingConfig,
						},
					)
					.start()
				onBlurProp?.(event)
			}

	return {
		focusOutlineStyle: {
			outlineColor: focusValue.current.interpolate({
				inputRange: [0, 1],
				outputRange: ['transparent', MapOutlineColorFocus[themeContext.colorScheme]],
			}),
		} satisfies Animated.AnimatedProps<ViewProps>['style'],
		focusHandler,
		blurHandler,
	}

}

const
	timingConfig =
		{
			duration: Motion.Duration.fast_01,
			easing: Easing.bezier(
				Motion.Easing.standard.productive.x1,
				Motion.Easing.standard.productive.y1,
				Motion.Easing.standard.productive.x2,
				Motion.Easing.standard.productive.y2,
			),
			useNativeDriver: false, // outlineColor doesn't support native driver
		} as const satisfies Omit<Animated.TimingAnimationConfig, 'toValue'>
