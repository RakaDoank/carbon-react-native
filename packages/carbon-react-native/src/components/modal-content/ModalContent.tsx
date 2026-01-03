import {
	forwardRef,
	useContext,
} from "react"

import {
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native"

import {
	Spacing,
	type BreakpointToken,
} from "@audira/carbon-react-native-elements"

import {
	GlobalConfigContext,
	ModalContext,
} from "../../_internal/contexts"

import {
	CommonStyleSheet,
} from "../../_internal/style-sheets"

import {
	BreakpointContext,
} from "../../contexts"

import type {
	ModalContentProps,
} from "./ModalContentProps"

import type {
	ModalContentRef,
} from "./ModalContentRef"

export const ModalContent = forwardRef<ModalContentRef, ModalContentProps>(
	function ModalContent(
		{
			fullWidth,
			style,
			dir,
			...props
		},
		ref,
	) {

		const
			breakpoint =
				useContext(BreakpointContext),

			modalContext =
				useContext(ModalContext),

			globalConfigContext =
				useContext(GlobalConfigContext)

		return (
			<View
				ref={ ref }
				{ ...props }
				dir={ dir ?? globalConfigContext.rtl ? "rtl" : undefined }
				style={ [
					styleSheet.modalContent,
					mapStyleSheetBySizeAndBreakpoint[modalContext.size][breakpoint],
					fullWidth ? styleSheet.fullWidth : undefined,
					globalConfigContext.rtl ? CommonStyleSheet.rtl : undefined,
					style,
				] }
			/>
		)

	},
)

const
	styleSheet =
		StyleSheet.create({
			modalContent: {
				marginBottom: Spacing.spacing_09,
			},
			fullWidth: {
				paddingEnd: Spacing.spacing_05,
			},
		}),

	mapStyleSheetBySizeAndBreakpoint: {
		[Size in ModalContext["size"]]: {
			[Breakpoint in BreakpointToken]: ViewStyle
		}
	} =
		{
			extra_small: StyleSheet.create({
				small: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: Spacing.spacing_05,
				},
				medium: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: Spacing.spacing_05,
				},
				large: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: Spacing.spacing_05,
				},
				x_large: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: Spacing.spacing_05,
				},
				max: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: Spacing.spacing_05,
				},
			}),
			small: {
				small: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: Spacing.spacing_05,
				},
				medium: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: Spacing.spacing_05,
				},
				large: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: Spacing.spacing_05,
				},
				x_large: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: "20%",
				},
				max: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: "20%",
				},
			},
			medium: {
				small: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: Spacing.spacing_05,
				},
				medium: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: "20%",
				},
				large: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: "20%",
				},
				x_large: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: "20%",
				},
				max: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: "20%",
				},
			},
			large: {
				small: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: Spacing.spacing_05,
				},
				medium: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: "20%",
				},
				large: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: "20%",
				},
				x_large: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: "20%",
				},
				max: {
					paddingStart: Spacing.spacing_05,
					paddingEnd: "20%",
				},
			},
		}
