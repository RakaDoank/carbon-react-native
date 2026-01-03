import {
	useContext,
} from "react"

import {
	StyleSheet,
} from "react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

import {
	ThemeProvider,
	type ThemeProviderProps,
} from "../../../_internal/providers/theme"

import {
	Ghost,
	type GhostProps,
} from "../../button/ghost"

import type {
	NotificationColor,
} from "../NotificationColor"

import {
	VariantContext,
} from "../_variant-context"

export interface ButtonGhostProps extends GhostProps {
}

export function ButtonGhost({
	size = "small",
	style,
	...props
}: ButtonGhostProps) {

	const variantContext = useContext(VariantContext)

	return (
		/**
		 * I don't know, is this a bad idea to nest the provider?
		 */
		<ThemeProvider colorScheme={ mapColorScheme[variantContext.color] }>
			<Ghost
				{ ...props }
				size={ size }
				style={ [
					baseStyle.buttonGhost,
					style,
				] }
			/>
		</ThemeProvider>
	)

}

const
	baseStyle =
		StyleSheet.create({
			buttonGhost: {
				marginTop: Spacing.spacing_03,
				paddingRight: Spacing.spacing_05,
			},
		}),

	mapColorScheme: Record<NotificationColor, ThemeProviderProps["colorScheme"]> =
		{
			low_contrast: "gray_10",
			high_contrast: "gray_100",
		}
