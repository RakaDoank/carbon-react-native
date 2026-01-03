import {
	useContext,
} from "react"

import {
	StyleSheet,
} from "react-native"

import {
	GlobalConfigContext,
} from "../../../../_internal/contexts"

import {
	ThemeContext,
} from "../../../../contexts"

import type {
	UseBaseData,
} from "./UseBaseData"

import type {
	UseBaseProps,
} from "./UseBaseProps"

export function useBase({
	color: colorProp,
	style,
	leftBarStyle,
	iconCloseColor,
	iconColor,
	titleStyle,
	transparentBorderColor,
}: UseBaseProps): UseBaseData {

	useContext(ThemeContext) // Keep it reactive

	const
		globalConfigContext =
			useContext(GlobalConfigContext),

		color =
			colorProp || globalConfigContext.notificationColor

	return {
		iconProps: {
			fill: iconColor[color],
		},
		iconCloseProps: {
			fill: iconCloseColor[color],
		},
		titleStyle: titleStyle[color],
		leftBarStyle: leftBarStyle[color],
		style: [
			styleSheet.base,
			style[color],
			transparentBorderColor
				? styleSheet.baseTransparentBorder
				: null,
		],
	}

}

const
	styleSheet =
		StyleSheet.create({
			base: {
				borderTopWidth: 1,
				borderRightWidth: 1,
				borderBottomWidth: 1,
			},
			baseTransparentBorder: {
				borderTopColor: "transparent",
				borderRightColor: "transparent",
				borderBottomColor: "transparent",
			},
		})
