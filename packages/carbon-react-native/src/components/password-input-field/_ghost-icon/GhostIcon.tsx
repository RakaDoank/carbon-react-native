import {
	forwardRef,
} from "react"

import {
	StyleSheet,
} from "react-native"

import IconViewOff from "@carbon/icons/svg/32/view--off.svg"
import IconView from "@carbon/icons/svg/32/view.svg"

import {
	CommonStyleSheet,
} from "../../../_internal/style-sheets"

import {
	GhostIcon as ButtonGhostIcon,
	type GhostIconProps as ButtonGhostIconProps,
} from "../../button/ghost-icon"

import type {
	GhostIconProps,
} from "./GhostIconProps"

import type {
	GhostIconRef,
} from "./GhostIconRef"

export const GhostIcon = forwardRef<GhostIconRef, GhostIconProps>(
	function GhostIcon(
		{
			inputSize,
			secureTextEntry,
			style,
			...props
		},
		ref,
	) {

		return (
			<ButtonGhostIcon
				ref={ ref }
				{ ...props }
				size={ mapInputSizeToButtonSize[inputSize] }
				Icon={ secureTextEntry ? IconView : IconViewOff }
				style={ [
					CommonStyleSheet.absolute,
					styleSheet.ghostIcon,
					style,
				] }
			/>
		)

	},
)

const
	styleSheet =
		StyleSheet.create({
			ghostIcon: {
				top: 0,
				right: 0,
			},
		}),

	mapInputSizeToButtonSize: Record<GhostIconProps["inputSize"], ButtonGhostIconProps["size"]> =
		{
			small: "small",
			medium: "medium",
			large: "large_productive",
		}
