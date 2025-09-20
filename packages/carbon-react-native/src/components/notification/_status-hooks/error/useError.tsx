import {
	useContext,
} from 'react'

import {
	Color,
} from '@audira/carbon-react-native-elements'
import Icon from '@carbon/icons/es/error--filled/20'


import {
	CarbonStyleSheet,
} from '../../../../carbon-style-sheet'

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
	UseErrorData,
} from './UseErrorData'

import type {
	UseErrorProps,
} from './UseErrorProps'

export function useError({
	color,
	transparentBorderColor,
}: UseErrorProps): UseErrorData {

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
		CarbonStyleSheet.create<Record<NotificationColor, UseBaseProps['style'][NotificationColor]>>({
			low_contrast: {
				backgroundColor: CarbonStyleSheet.color.notification_error_background,
				borderTopColor: CarbonStyleSheet.color.notification_error_border,
				borderRightColor: CarbonStyleSheet.color.notification_error_border,
				borderBottomColor: CarbonStyleSheet.color.notification_error_border,
			},
			high_contrast: {
				backgroundColor: CarbonStyleSheet.color.background_inverse,
				borderTopColor: CarbonStyleSheet.color.background_inverse,
				borderRightColor: CarbonStyleSheet.color.background_inverse,
				borderBottomColor: CarbonStyleSheet.color.background_inverse,
			},
		}),

	titleStyle =
		CarbonStyleSheet.create<Record<NotificationColor, UseBaseProps['titleStyle'][NotificationColor]>>({
			low_contrast: {
				color: CarbonStyleSheet.color.text_primary,
			},
			high_contrast: {
				color: CarbonStyleSheet.color.text_inverse,
			},
		}),

	leftBarStyle =
		CarbonStyleSheet.create<Record<NotificationColor, UseBaseProps['leftBarStyle'][NotificationColor]>>({
			low_contrast: {
				backgroundColor: CarbonStyleSheet.color.support_error,
			},
			high_contrast: {
				backgroundColor: CarbonStyleSheet.color.support_error_inverse,
			},
		}),

	mapIconColor: Record<ThemeContext['colorScheme'], UseBaseProps['iconCloseColor']> =
		{
			gray_10: {
				low_contrast: Color.Token.gray_10.support_error,
				high_contrast: Color.Token.gray_10.support_error_inverse,
			},
			gray_100: {
				low_contrast: Color.Token.gray_100.support_error,
				high_contrast: Color.Token.gray_100.support_error_inverse,
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
