import {
	forwardRef,
	useContext,
} from 'react'

import {
	StyleSheet,
	View,
	type ViewStyle,
} from 'react-native'

import {
	Spacing,
	type BreakpointToken,
} from '@audira/carbon-react-native-elements'

import {
	ModalContext,
} from '../../_internal/contexts'

import {
	BreakpointContext,
} from '../../contexts'

import type {
	ModalContentProps,
} from './ModalContentProps'

import type {
	ModalContentRef,
} from './ModalContentRef'

export const ModalContent = forwardRef<ModalContentRef, ModalContentProps>(
	function ModalContent(
		{
			fullWidth,
			style,
			...props
		},
		ref,
	) {

		const
			breakpoint =
				useContext(BreakpointContext),

			modalContext =
				useContext(ModalContext)

		return (
			<View
				ref={ ref }
				{ ...props }
				style={ [
					styleSheet.modalContent,
					mapStyleSheetBySizeAndBreakpoint[modalContext.size][breakpoint],
					fullWidth ? styleSheet.fullWidth : undefined,
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
				paddingRight: Spacing.spacing_05,
			},
		}),

	mapStyleSheetBySizeAndBreakpoint: {
		[Size in ModalContext['size']]: {
			[Breakpoint in BreakpointToken]: ViewStyle
		}
	} =
		{
			extra_small: StyleSheet.create({
				small: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: Spacing.spacing_05,
				},
				medium: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: Spacing.spacing_05,
				},
				large: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: Spacing.spacing_05,
				},
				x_large: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: Spacing.spacing_05,
				},
				max: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: Spacing.spacing_05,
				},
			}),
			small: {
				small: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: Spacing.spacing_05,
				},
				medium: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: Spacing.spacing_05,
				},
				large: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: Spacing.spacing_05,
				},
				x_large: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: '20%',
				},
				max: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: '20%',
				},
			},
			medium: {
				small: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: Spacing.spacing_05,
				},
				medium: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: '20%',
				},
				large: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: '20%',
				},
				x_large: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: '20%',
				},
				max: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: '20%',
				},
			},
			large: {
				small: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: Spacing.spacing_05,
				},
				medium: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: '20%',
				},
				large: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: '20%',
				},
				x_large: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: '20%',
				},
				max: {
					paddingLeft: Spacing.spacing_05,
					paddingRight: '20%',
				},
			},
		}
