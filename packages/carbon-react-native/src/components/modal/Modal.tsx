import {
	forwardRef,
	useContext,
	useMemo,
} from 'react'

import {
	StyleSheet,
	View,
	type ViewStyle,
} from 'react-native'

import {
	Spacing,
	type BreakpointToken,
	type ColorLayerLevel,
} from '@audira/carbon-react-native-elements'

import IconClose from '@carbon/icons/es/close/20'

import {
	ModalContext,
} from '../../_internal/contexts'

import {
	CommonStyleSheet,
} from '../../_internal/style-sheets'

import {
	CarbonStyleSheet,
} from '../../carbon-style-sheet'

import {
	BreakpointContext,
} from '../../contexts'

import {
	GhostIcon as ButtonGhostIcon,
} from '../button/ghost-icon'

import {
	LayerContext,
} from '../layer/LayerContext'

import {
	Text,
} from '../text'

import type {
	ModalProps,
} from './ModalProps'

import type {
	ModalRef,
} from './ModalRef'

import type {
	ModalSize,
} from './ModalSize'

/**
 * This is a pure component of Carbon Modal. It's not including with the dialog or any alert utility.
 * You can use `DialogContext`, call the `show` method, and then give this component to the method argument.
 * 
 * You can also use this component with other libraries like `@gorhom/bottom-sheet`, `@lodev09/react-native-true-sheet`, and other libraries, even with the core `Modal` component of React Native
 */
export const Modal = forwardRef<ModalRef, ModalProps>(
	function Modal(
		{
			size = 'medium',
			label: labelProp,
			title,
			children,
			buttonCloseProps,
			'aria-label': ariaLabel,
			'aria-labelledby': ariaLabelledBy,
			style,
			...props
		},
		ref,
	) {

		const
			breakpoint =
				useContext(BreakpointContext),

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
				])

		return (
			<ModalContext.Provider
				value={{
					size,
				}}
			>
				<View
					ref={ ref }
					{ ...props }
					aria-label={ ariaLabel ?? label }
					aria-labelledBy={ ariaLabelledBy ?? label }
					style={ [
						bgLayerStyleSheet[`bg_${layerContextLevel}`],
						styleSheetBySizeAndBreakpoint.modal,
						style,
					] }
				>
					<View
						style={ [
							styleSheet.headerText,
							styleSheetBySizeAndBreakpoint.headerTextContainer,
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
						icon={ IconClose }
						style={ [
							CommonStyleSheet.absolute,
							styleSheet.iconClose,
							buttonCloseProps?.style,
						] }
					/>

					{ children }
				</View>
			</ModalContext.Provider>
		)

	},
)

const
	styleSheet =
		StyleSheet.create({
			headerText: {
				paddingTop: Spacing.spacing_05,
				marginBottom: Spacing.spacing_05,
				rowGap: Spacing.spacing_02,
			},
			iconClose: {
				top: 0,
				right: 0,
				backgroundColor: 'transparent',
			},
		}),

	mapStyleSheetBySizeAndBreakpoint: {
		[Size in ModalSize]: {
			[Token in BreakpointToken]: {
				modal: ViewStyle,
				headerTextContainer: ViewStyle,
			}
		}
	} =
		{
			extra_small: {
				small: StyleSheet.create({
					modal: {
						width: '100%',
						height: '100%',
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				medium: StyleSheet.create({
					modal: {
						width: '48%',
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				large: StyleSheet.create({
					modal: {
						width: '32%',
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				x_large: StyleSheet.create({
					modal: {
						width: '24%',
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				max: StyleSheet.create({
					modal: {
						width: '24%',
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
			},
			small: {
				small: StyleSheet.create({
					modal: {
						width: '100%',
						height: '100%',
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				medium: StyleSheet.create({
					modal: {
						width: '60%',
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				large: StyleSheet.create({
					modal: {
						width: '42%',
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				x_large: StyleSheet.create({
					modal: {
						width: '36%',
					},
					headerTextContainer: {
						paddingLeft: Spacing.spacing_05,
						paddingRight: '20%',
					},
				}),
				max: StyleSheet.create({
					modal: {
						width: '36%',
					},
					headerTextContainer: {
						paddingLeft: Spacing.spacing_05,
						paddingRight: '20%',
					},
				}),
			},
			medium: {
				small: StyleSheet.create({
					modal: {
						width: '100%',
						height: '100%',
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				medium: StyleSheet.create({
					modal: {
						width: '84%',
					},
					headerTextContainer: {
						paddingLeft: Spacing.spacing_05,
						paddingRight: '20%',
					},
				}),
				large: StyleSheet.create({
					modal: {
						width: '60%',
					},
					headerTextContainer: {
						paddingLeft: Spacing.spacing_05,
						paddingRight: '20%',
					},
				}),
				x_large: StyleSheet.create({
					modal: {
						width: '48%',
					},
					headerTextContainer: {
						paddingLeft: Spacing.spacing_05,
						paddingRight: '20%',
					},
				}),
				max: StyleSheet.create({
					modal: {
						width: '48%',
					},
					headerTextContainer: {
						paddingLeft: Spacing.spacing_05,
						paddingRight: '20%',
					},
				}),
			},
			large: {
				small: StyleSheet.create({
					modal: {
						width: '100%',
						height: '100%',
					},
					headerTextContainer: {
						paddingHorizontal: Spacing.spacing_05,
					},
				}),
				medium: StyleSheet.create({
					modal: {
						width: '96%',
					},
					headerTextContainer: {
						paddingLeft: Spacing.spacing_05,
						paddingRight: '20%',
					},
				}),
				large: StyleSheet.create({
					modal: {
						width: '84%',
					},
					headerTextContainer: {
						paddingLeft: Spacing.spacing_05,
						paddingRight: '20%',
					},
				}),
				x_large: StyleSheet.create({
					modal: {
						width: '72%',
					},
					headerTextContainer: {
						paddingLeft: Spacing.spacing_05,
						paddingRight: '20%',
					},
				}),
				max: StyleSheet.create({
					modal: {
						width: '72%',
					},
					headerTextContainer: {
						paddingLeft: Spacing.spacing_05,
						paddingRight: '20%',
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
