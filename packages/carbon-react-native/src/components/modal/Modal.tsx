import {
	forwardRef,
	useContext,
	useMemo,
} from "react"

import {
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native"

import {
	Spacing,
	type BreakpointToken,
	type ColorLayerLevel,
} from "@audira/carbon-react-native-elements"

import IconClose from "@carbon/icons/svg/32/close.svg"

import {
	useSafeAreaInsets,
} from "react-native-safe-area-context"

import {
	GlobalConfigContext,
	InDialogContext,
	ModalContext,
} from "../../_internal/contexts"

import {
	ModalHelper,
} from "../../_internal/helpers"

import {
	CommonStyleSheet,
} from "../../_internal/style-sheets"

import {
	CarbonStyleSheet,
} from "../../carbon-style-sheet"

import {
	BreakpointContext,
} from "../../contexts"

import {
	GhostIcon as ButtonGhostIcon,
} from "../button/ghost-icon"

import {
	LayerContext,
} from "../layer/LayerContext"

import {
	Text,
} from "../text"

import type {
	ModalProps,
} from "./ModalProps"

import type {
	ModalRef,
} from "./ModalRef"

import type {
	ModalSize,
} from "./ModalSize"

/**
 * This is a pure component of Carbon Modal. It's not including with the dialog or any alert utility.
 * You can use `DialogContext`, call the `show` method, and then give this component to the method argument.
 * 
 * You can also use this component with other libraries like `@gorhom/bottom-sheet`, `@lodev09/react-native-true-sheet`, and other libraries, even with the core `Modal` component of React Native
 */
export const Modal = forwardRef<ModalRef, ModalProps>(
	function Modal(
		{
			size = "medium",
			label: labelProp,
			title,
			children,
			buttonCloseProps,
			applyInsets = "in_dialog_and_small_bp",
			applyInsetsEdges: applyInsetsEdgesProp,
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledBy,
			style,
			dir,
			...props
		},
		ref,
	) {

		const
			breakpoint =
				useContext(BreakpointContext),

			globalConfigContext =
				useContext(GlobalConfigContext),

			inDialogContext =
				useContext(InDialogContext),

			/**
			 * Based on carbon modal spec, the background color is based on the current layer level.  
			 * Should i follow this spec?
			 */
			layerContextLevel =
				useContext(LayerContext),

			label =
				labelProp ?? ariaLabel ?? ariaLabelledBy,

			styleSheetBySizeAndBreakpoint =
				useMemo(() => {
					return mapStyleSheetBySizeAndBreakpoint[size][breakpoint]
				}, [
					size,
					breakpoint,
				]),

			safeAreaInsets =
				useSafeAreaInsets(),

			applyInsetsEdges =
				{
					top: applyInsetsEdgesProp?.top ?? true,
					bottom: applyInsetsEdgesProp?.bottom ?? true,
					left: applyInsetsEdgesProp?.left ?? true,
					right: applyInsetsEdgesProp?.right ?? true,
				},

			isApplyInsets =
				ModalHelper.isApplyInsets({
					applyInsets,
					breakpoint,
					inDialog: inDialogContext,
				})

		return (
			<ModalContext.Provider
				value={{
					size,
					applyInsets,
					applyInsetsEdges,
				}}
			>
				<View
					ref={ ref }
					{ ...props }
					aria-label={ ariaLabel ?? label }
					aria-labelledBy={ ariaLabelledBy ?? label }
					dir={ dir ?? globalConfigContext.rtl ? "rtl" : undefined }
					style={ [
						bgLayerStyleSheet[`bg_${layerContextLevel}`],
						inDialogContext ? styleSheetBySizeAndBreakpoint.modalInDialog : undefined,
						globalConfigContext.rtl ? CommonStyleSheet.rtl : undefined,
						isApplyInsets && applyInsetsEdges.bottom
							? { paddingBottom: safeAreaInsets.bottom }
							: undefined,
						style,
					] }
				>
					<LayerContext.Provider
						// children of modal are in layer 2
						value={ 2 }
					>
						<View
							style={ [
								styleSheet.headerTextContainer,
								styleSheetBySizeAndBreakpoint.headerTextContainer,
								isApplyInsets && applyInsetsEdges.top
									? { paddingTop: safeAreaInsets.top }
									: undefined,
							] }
						>
							{ !!label && (
								<Text
									type="label_01"
								>
									{ label }
								</Text>
							) }
							<Text
								type="heading_03"
							>
								{ title }
							</Text>
						</View>

						<ButtonGhostIcon
							{ ...buttonCloseProps }
							Icon={ IconClose }
							style={ [
								CommonStyleSheet.absolute,
								styleSheet.iconClose,
								globalConfigContext.rtl
									? styleSheet.iconCloseRtl
									: styleSheet.iconCloseLtr,
								isApplyInsets && applyInsetsEdges.top
									? { top: safeAreaInsets.top / 2 }
									: undefined,
								buttonCloseProps?.style,
							] }
						/>

						{ children }
					</LayerContext.Provider>
				</View>
			</ModalContext.Provider>
		)

	},
)

const
	styleSheet =
		StyleSheet.create({
			headerTextContainer: {
				paddingTop: Spacing.spacing_05,
				marginBottom: Spacing.spacing_05,
				rowGap: Spacing.spacing_02,
			},
			iconClose: {
				top: 0,
				backgroundColor: "transparent",
			},
			iconCloseLtr: {
				right: 0,
			},
			iconCloseRtl: {
				left: 0,
			},
		}),

	mapStyleSheetBySizeAndBreakpoint: {
		[Size in ModalSize]: {
			[Token in BreakpointToken]: {
				/**
				 * Only apply if the modal is inside of dialog context controller
				 */
				modalInDialog: ViewStyle,
				headerTextContainer: ViewStyle,
			}
		}
	} =
		{
			extra_small: {
				small: StyleSheet.create({
					modalInDialog: {
						width: "100%",
						height: "100%",
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				medium: StyleSheet.create({
					modalInDialog: {
						width: "48%",
						maxHeight: "48%",
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				large: StyleSheet.create({
					modalInDialog: {
						width: "32%",
						maxHeight: "48%",
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				x_large: StyleSheet.create({
					modalInDialog: {
						width: "24%",
						maxHeight: "48%",
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				max: StyleSheet.create({
					modalInDialog: {
						width: "24%",
						maxHeight: "48%",
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
			},
			small: {
				small: StyleSheet.create({
					modalInDialog: {
						width: "100%",
						height: "100%",
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				medium: StyleSheet.create({
					modalInDialog: {
						width: "60%",
						maxHeight: "72%",
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				large: StyleSheet.create({
					modalInDialog: {
						width: "42%",
						maxHeight: "72%",
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				x_large: StyleSheet.create({
					modalInDialog: {
						width: "36%",
						maxHeight: "72%",
					},
					headerTextContainer: {
						paddingStart: Spacing.spacing_05,
						paddingEnd: "20%",
					},
				}),
				max: StyleSheet.create({
					modalInDialog: {
						width: "36%",
						maxHeight: "72%",
					},
					headerTextContainer: {
						paddingStart: Spacing.spacing_05,
						paddingEnd: "20%",
					},
				}),
			},
			medium: {
				small: StyleSheet.create({
					modalInDialog: {
						width: "100%",
						height: "100%",
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				medium: StyleSheet.create({
					modalInDialog: {
						width: "84%",
						maxHeight: "84%",
					},
					headerTextContainer: {
						paddingStart: Spacing.spacing_05,
						paddingEnd: "20%",
					},
				}),
				large: StyleSheet.create({
					modalInDialog: {
						width: "60%",
						maxHeight: "84%",
					},
					headerTextContainer: {
						paddingStart: Spacing.spacing_05,
						paddingEnd: "20%",
					},
				}),
				x_large: StyleSheet.create({
					modalInDialog: {
						width: "48%",
						maxHeight: "84%",
					},
					headerTextContainer: {
						paddingStart: Spacing.spacing_05,
						paddingEnd: "20%",
					},
				}),
				max: StyleSheet.create({
					modalInDialog: {
						width: "48%",
						maxHeight: "84%",
					},
					headerTextContainer: {
						paddingStart: Spacing.spacing_05,
						paddingEnd: "20%",
					},
				}),
			},
			large: {
				small: StyleSheet.create({
					modalInDialog: {
						width: "100%",
						height: "100%",
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				medium: StyleSheet.create({
					modalInDialog: {
						width: "96%",
						maxHeight: "96%",
					},
					headerTextContainer: {
						paddingStart: Spacing.spacing_05,
						paddingEnd: "20%",
					},
				}),
				large: StyleSheet.create({
					modalInDialog: {
						width: "84%",
						maxHeight: "96%",
					},
					headerTextContainer: {
						paddingStart: Spacing.spacing_05,
						paddingEnd: "20%",
					},
				}),
				x_large: StyleSheet.create({
					modalInDialog: {
						width: "72%",
						maxHeight: "96%",
					},
					headerTextContainer: {
						paddingStart: Spacing.spacing_05,
						paddingEnd: "20%",
					},
				}),
				max: StyleSheet.create({
					modalInDialog: {
						width: "72%",
						maxHeight: "96%",
					},
					headerTextContainer: {
						paddingStart: Spacing.spacing_05,
						paddingEnd: "20%",
					},
				}),
			},
		},

	bgLayerStyleSheet =
		CarbonStyleSheet.create<Record<`bg_${ColorLayerLevel}`, ViewStyle>>({
			bg_1: {
				backgroundColor: CarbonStyleSheet.color.layer_01,
			},
			bg_2: {
				backgroundColor: CarbonStyleSheet.color.layer_02,
			},
			bg_3: {
				backgroundColor: CarbonStyleSheet.color.layer_03,
			},
		})
