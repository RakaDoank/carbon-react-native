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
} from '@audira/carbon-react-native-elements'

import {
	ButtonGroupContext,
	GlobalConfigContext,
} from '../../_internal/contexts'

import {
	FlexStyleSheet,
} from '../../_internal/style-sheets'

import type {
	ButtonGroupProps,
} from './ButtonGroupProps'

import type {
	ButtonGroupRef,
} from './ButtonGroupRef'

export const ButtonGroup = forwardRef<ButtonGroupRef, ButtonGroupProps>(
	function ButtonGroup(
		{
			button1,
			button2,
			button3,
			oneAlone,
			size = 'large_productive',
			fluid,
			vertical,
			style,
			...props
		},
		ref,
	) {

		const
			globalConfigContext =
				useContext(GlobalConfigContext),

			styleFlexDir =
				mapStyleFlexDir[`${!!vertical}`][`${!!globalConfigContext.rtl}`],

			styleFluid =
				mapStyleFluid[`${!!fluid}`]

		return (
			<ButtonGroupContext.Provider
				value={{
					size,
					fluid,
					vertical,
				}}
			>
				<View
					ref={ ref }
					{ ...props }
					style={ [
						styleFlexDir,
						styleFluid,
						oneAlone ? FlexStyleSheet.justify_between : undefined,
						style,
					] }
				>
					{ !oneAlone || vertical ? (<>
						{ button1 }
						{ button2 }
						{ button3 }
					</>) : (<>
						<View
							style={ [
								styleSheet.firstButtonContainer,
							] }
						>
							{ button1 }
						</View>
						<View
							style={ [
								styleFlexDir,
								styleFluid,
								styleSheet.lastTwoButttonContainer,
								FlexStyleSheet.justify_end,
							] }
						>
							{ button2 }
							{ button3 }
						</View>
					</>) }
				</View>
			</ButtonGroupContext.Provider>
		)

	},
)

const
	styleSheet =
		StyleSheet.create({
			fixedGroup: {
				gap: Spacing.spacing_05,
			},
			fluidGroup: {
				gap: 1,
			},
			firstButtonContainer: {
				width: '25%',
			},
			lastTwoButttonContainer: {
				width: '50%',
			},
		}),

	mapStyleFlexDir: {
		[IsVertical in `${boolean}`]: {
			[RTL in `${boolean}`]: ViewStyle
		}
	} =
		{
			false: {
				false: FlexStyleSheet.flex_row,
				true: FlexStyleSheet.flex_row_reverse,
			},
			true: {
				false: FlexStyleSheet.flex_col_reverse,
				true: FlexStyleSheet.flex_col_reverse,
			},
		},

	mapStyleFluid: { [IsFluid in `${boolean}`]: ViewStyle } =
		{
			false: styleSheet.fixedGroup,
			true: styleSheet.fluidGroup,
		}
