import {
	useContext,
} from 'react'

import Icon from '@carbon/icons/es/checkmark--filled/20'

import {
	Color,
} from '@audira/carbon-react-native-elements'

import {
	StyleSheet,
} from '../../../../_style-sheet'

import {
	ThemeContext,
} from '../../../../contexts'

import type {
	NotificationColor,
} from '../../NotificationColor'

import {
	useBase,
	type UseBaseProps,
} from '../_base'

import type {
	UseSuccessData,
} from './UseSuccessData'

import type {
	UseSuccessProps,
} from './UseSuccessProps'

export function useSuccess({
	color,
	transparentBorderColor,
}: UseSuccessProps): UseSuccessData {

	const
		themeContext =
			useContext(ThemeContext),

		data =
			useBase({
				color,
				transparentBorderColor,
				style: statusStyle,
				titleStyle,
				leftBarStyle,
				iconColor: mapIconColor[themeContext.colorScheme],
				iconCloseColor: mapIconCloseColor[themeContext.colorScheme],
			})

	return {
		...data,
		icon: Icon,
	}

}

const
	statusStyle =
		StyleSheet.create<Record<NotificationColor, UseBaseProps['style'][NotificationColor]>>({
			low_contrast: {
				backgroundColor: StyleSheet.color.notification_success_background,
				borderTopColor: StyleSheet.color.notification_success_border,
				borderRightColor: StyleSheet.color.notification_success_border,
				borderBottomColor: StyleSheet.color.notification_success_border,
			},
			high_contrast: {
				backgroundColor: StyleSheet.color.background_inverse,
				borderTopColor: StyleSheet.color.background_inverse,
				borderRightColor: StyleSheet.color.background_inverse,
				borderBottomColor: StyleSheet.color.background_inverse,
			},
		}),

	titleStyle =
		StyleSheet.create<Record<NotificationColor, UseBaseProps['titleStyle'][NotificationColor]>>({
			low_contrast: {
				color: StyleSheet.color.text_primary,
			},
			high_contrast: {
				color: StyleSheet.color.text_inverse,
			},
		}),

	leftBarStyle =
		StyleSheet.create<Record<NotificationColor, UseBaseProps['leftBarStyle'][NotificationColor]>>({
			low_contrast: {
				backgroundColor: StyleSheet.color.support_success,
			},
			high_contrast: {
				backgroundColor: StyleSheet.color.support_success_inverse,
			},
		}),

	mapIconColor: Record<ThemeContext['colorScheme'], UseBaseProps['iconCloseColor']> =
		{
			gray_10: {
				low_contrast: Color.Token.gray_10.support_success,
				high_contrast: Color.Token.gray_10.support_success_inverse,
			},
			gray_100: {
				low_contrast: Color.Token.gray_100.support_success,
				high_contrast: Color.Token.gray_100.support_success_inverse,
			},
		},

	mapIconCloseColor: Record<ThemeContext['colorScheme'], UseBaseProps['iconCloseColor']> =
		{
			gray_10: {
				low_contrast: Color.Token.gray_10.icon_primary,
				high_contrast: Color.Token.gray_10.icon_inverse,
			},
			gray_100: {
				low_contrast: Color.Token.gray_100.icon_primary,
				high_contrast: Color.Token.gray_100.icon_inverse,
			},
		}
