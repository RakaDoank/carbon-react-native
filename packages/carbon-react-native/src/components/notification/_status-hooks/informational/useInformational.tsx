import {
	useContext,
} from "react"

import {
	Color,
} from "@audira/carbon-react-native-elements"

import Icon from "@carbon/icons/svg/32/information--filled.svg"

import {
	CarbonStyleSheet,
} from "../../../../carbon-style-sheet"

import {
	ThemeContext,
} from "../../../../contexts"

import type {
	NotificationColor,
} from "../../NotificationColor"

import {
	useBase,
	type UseBaseProps,
} from "../_base"

import type {
	UseInformationalData,
} from "./UseInformationalData"

import type {
	UseInformationalProps,
} from "./UseInformationalProps"

export function useInformational({
	color,
	transparentBorderColor,
}: UseInformationalProps): UseInformationalData {

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
		Icon,
	}

}

const
	statusStyle =
		CarbonStyleSheet.create<Record<NotificationColor, UseBaseProps["style"][NotificationColor]>>({
			low_contrast: {
				backgroundColor: CarbonStyleSheet.color.notification_info_background,
				borderTopColor: CarbonStyleSheet.color.notification_info_border,
				borderRightColor: CarbonStyleSheet.color.notification_info_border,
				borderBottomColor: CarbonStyleSheet.color.notification_info_border,
			},
			high_contrast: {
				backgroundColor: CarbonStyleSheet.color.background_inverse,
				borderTopColor: CarbonStyleSheet.color.background_inverse,
				borderRightColor: CarbonStyleSheet.color.background_inverse,
				borderBottomColor: CarbonStyleSheet.color.background_inverse,
			},
		}),

	titleStyle =
		CarbonStyleSheet.create<Record<NotificationColor, UseBaseProps["titleStyle"][NotificationColor]>>({
			low_contrast: {
				color: CarbonStyleSheet.color.text_primary,
			},
			high_contrast: {
				color: CarbonStyleSheet.color.text_inverse,
			},
		}),

	leftBarStyle =
		CarbonStyleSheet.create<Record<NotificationColor, UseBaseProps["leftBarStyle"][NotificationColor]>>({
			low_contrast: {
				backgroundColor: CarbonStyleSheet.color.support_info,
			},
			high_contrast: {
				backgroundColor: CarbonStyleSheet.color.support_info_inverse,
			},
		}),

	mapIconColor: Record<ThemeContext["colorScheme"], UseBaseProps["iconCloseColor"]> =
		{
			gray_10: {
				low_contrast: Color.Token.gray_10.support_info,
				high_contrast: Color.Token.gray_10.support_info_inverse,
			},
			gray_100: {
				low_contrast: Color.Token.gray_100.support_info,
				high_contrast: Color.Token.gray_100.support_info_inverse,
			},
		},

	mapIconCloseColor: Record<ThemeContext["colorScheme"], UseBaseProps["iconCloseColor"]> =
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
