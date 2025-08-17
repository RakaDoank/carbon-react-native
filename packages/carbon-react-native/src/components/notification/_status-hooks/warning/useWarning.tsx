import {
	useContext,
} from 'react'

import Icon from '@carbon/icons/es/warning--filled/20'

import {
	Color,
} from '@audira/carbon-react-native-elements'

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
	UseWarningData,
} from './UseWarningData'

import type {
	UseWarningProps,
} from './UseWarningProps'

export function useWarning({
	color,
	transparentBorderColor,
}: UseWarningProps): UseWarningData {

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
				backgroundColor: CarbonStyleSheet.color.notification_warning_background,
				borderTopColor: CarbonStyleSheet.color.notification_warning_border,
				borderRightColor: CarbonStyleSheet.color.notification_warning_border,
				borderBottomColor: CarbonStyleSheet.color.notification_warning_border,
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
				backgroundColor: CarbonStyleSheet.color.support_warning,
			},
			high_contrast: {
				backgroundColor: CarbonStyleSheet.color.support_warning_inverse,
			},
		}),

	mapIconColor: Record<ThemeContext['colorScheme'], UseBaseProps['iconCloseColor']> =
		{
			gray_10: {
				low_contrast: Color.Token.gray_10.support_warning,
				high_contrast: Color.Token.gray_10.support_warning_inverse,
			},
			gray_100: {
				low_contrast: Color.Token.gray_100.support_warning,
				high_contrast: Color.Token.gray_100.support_warning_inverse,
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
