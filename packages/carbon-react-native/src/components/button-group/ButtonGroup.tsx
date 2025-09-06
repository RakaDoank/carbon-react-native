import {
	forwardRef,
} from 'react'

import {
	StyleSheet,
	View,
	type ViewProps,
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	ButtonGroupContext,
} from '../../_internal/components/button-group'

import {
	FlexStyleSheet,
} from '../../_internal/style-sheets'

import {
	Context,
} from './_context'

import {
	Renderer2,
} from './_renderer-2'

import {
	Renderer3,
} from './_renderer-3'

import type {
	ButtonGroupProps,
} from './ButtonGroupProps'

import type {
	ButtonGroupRef,
} from './ButtonGroupRef'

/**
 * @experimental
 * Button groups can consist of different button variants depending on the product use case.  
 * The order of this union below (from left to right, e.g 'secondary' > 'primary') will be same as the actual render (if `verticalStack` true, it will be bottom to top)
 * 
 * 2 Buttons:
 * - `Secondary` > `Primary`
 * - `Tertiary` > `Primary`
 * - `Ghost` > `Primary`
 * - `TertiaryDanger` > `Primary`
 * - `Secondary` > `PrimaryDanger`
 * - `Ghost` > `PrimaryDanger`
 * 
 * 3 Buttons:
 * - `Tertiary` > `Secondary` > `Primary`
 * - `Ghost` > `Secondary` > `Primary`
 * - `Secondary1` > `Secondary2` > `Primary`
 * - `Tertiary1` > `Tertiary2` > `Primary`
 * - `TertiaryDanger` > `Tertiary` > `Primary`
 * 
 * 2 Buttons without primary button
 * - `Tertiary1` > `Tertiary2`
 * - `Ghost` > `Tertiary`
 * - `Ghost1` > `Ghost2`
 * 
 * 3 Buttons without primary button
 * - `Tertiary1` > `Tertiary2` > `Tertiary3`
 * - `TertiaryDanger` > `Tertiary1` > `Tertiary2`
 *
 * @example
 * ```tsx
 * return (
 * 	<ButtonGroup
 * 		fluid
 * 		items={{
 * 			Secondary: {
 * 				Component: Button.Secondary,
 * 				text: 'Secondary',
 * 			},
 * 			Primary: {
 * 				Component: Button.Primary,
 * 				text: 'Primary',
 * 			},
 * 		}}
 * 		// OR
 * 		items={{
 * 			Tertiary: {
 * 				Component: Button.Tertiary,
 * 				text: 'Tertiary',
 * 			},
 * 			Secondary: {
 * 				Component: Button.Secondary,
 * 				text: 'Secondary',
 * 			},
 * 			Primary: {
 * 				Component: Button.Primary,
 * 				text: 'Primary',
 * 			},
 * 		}}
 * 		// OR
 * 		items={{
 * 			Component: Button.Tertiary,
 * 			Tertiary1: {
 * 				text: 'Tertiary 1',
 * 			},
 * 			Tertiary2: {
 * 				text: 'Tertiary 2',
 * 			},
 * 			Tertiary3: {
 * 				text: 'Tertiary 3',
 * 			},
 * 		}}
 * 	/>
 * )
 * ```
 * 
 * @see https://carbondesignsystem.com/components/button/usage/#button-groups
 */
export const ButtonGroup = forwardRef<ButtonGroupRef, ButtonGroupProps>(
	function ButtonGroup(
		{
			size = 'large_productive',
			items,
			fluid = false,
			verticalStack = false,
			style,
			...props
		},
		ref,
	) {

		const
			/**
			 * not included with `TertiaryDanger` > `Tertiary` > `Primary` combination
			 */
			is3ButtonsWithPrimary =
				(items.Tertiary && items.Secondary && items.Primary) ||
				(items.Ghost && items.Secondary && items.Primary) ||
				(items.Secondary1 && items.Secondary2 && items.Primary) ||
				(items.Tertiary1 && items.Tertiary2 && items.Primary),

			is3ButtonsWithoutPrimary =
				(items.Tertiary1 && items.Tertiary2 && items.Tertiary3) ||
				(items.TertiaryDanger && items.Tertiary1 && items.Tertiary2) ||
				(items.Secondary1 && items.Secondary2 && items.Secondary3)

		return (
			<ButtonGroupContext.Provider
				value={{ size }}
			>
				<Context.Provider
					value={{
						fluid,
						verticalStack,
					}}
				>
					<View
						ref={ ref }
						{ ...props }
						style={ [
							mapStyleByFluid[`${!!fluid}`],

							mapStyleByVerticalStack[`${!!verticalStack}`],

							// Place the Ghost button alone at the container's start
							fluid && (is3ButtonsWithPrimary || is3ButtonsWithoutPrimary) && !!items.Ghost
								? FlexStyleSheet.justify_between
								: undefined,

							style,
						] }
					>
						{ /* eslint-disable @stylistic/indent */ }
						{ (
							// 3 Buttons
							is3ButtonsWithPrimary
						) ? (
							<Renderer3
								item1={ items.Tertiary ?? items.Ghost ?? items.Secondary1 ?? items.Tertiary1 }
								item2={ items.Secondary ?? items.Secondary2 ?? items.Tertiary2 }
								item3={ items.Primary }
							/>
						) : (
							// 3 buttons [fix type check]
							items.TertiaryDanger && items.Tertiary && items.Primary
						) ? (
							<Renderer3
								item1={ items.TertiaryDanger }
								item2={ items.Tertiary }
								item3={ items.Primary }
							/>
						) : (
							// 3 buttons without primary [fix type check]
							items.Tertiary1 && items.Tertiary2 && items.Tertiary3
						) ? (
							<Renderer3
								item1={{
									...items.Tertiary1,
									Component: items.TertiaryComponent,
								}}
								item2={{
									...items.Tertiary2,
									Component: items.TertiaryComponent,
								}}
								item3={{
									...items.Tertiary3,
									Component: items.TertiaryComponent,
								}}
							/>
						) : (
							// 3 buttons without primary [fix type check]
							items.TertiaryDanger && items.Tertiary1 && items.Tertiary2
						) ? (
							<Renderer3
								item1={ items.TertiaryDanger }
								item2={ items.Tertiary1 }
								item3={ items.Tertiary2 }
							/>
						) : (
							items.Secondary1 && items.Secondary2 && items.Secondary3
						) ? (
							<Renderer3
								item1={{
									...items.Secondary1,
									Component: items.SecondaryComponent,
								}}
								item2={{
									...items.Secondary2,
									Component: items.SecondaryComponent,
								}}
								item3={{
									...items.Secondary1,
									Component: items.SecondaryComponent,
								}}
							/>
						) : (
							// 2 Buttons
							(items.Secondary && items.Primary) ||
							(items.Tertiary && items.Primary) ||
							(items.Ghost && items.Primary) ||
							(items.TertiaryDanger && items.Primary) ||
							(items.Secondary && items.PrimaryDanger) ||
							(items.Ghost && items.PrimaryDanger)
						) ? (
							<Renderer2
								item1={ items.Secondary ?? items.Tertiary ?? items.Ghost ?? items.TertiaryDanger }
								item2={ items.Primary ?? items.PrimaryDanger }
							/>
						) : (
							// 2 Buttons without primary button
							'TertiaryComponent' in items && items.Tertiary1 && items.Tertiary2
						) ? (
							<Renderer2
								item1={{
									...items.Tertiary1,
									Component: items.TertiaryComponent,
								}}
								item2={{
									...items.Tertiary2,
									Component: items.TertiaryComponent,
								}}
							/>
						) : (
							// 2 Buttons without primary button
							'GhostComponent' in items && items.Ghost1 && items.Ghost2
						) ? (
							<Renderer2
								item1={{
									...items.Ghost1,
									Component: items.GhostComponent,
								}}
								item2={{
									...items.Ghost2,
									Component: items.GhostComponent,
								}}
							/>
						) : (
							// 2 Buttons without primary button
							(items.Ghost && items.Tertiary)
						) ? (
							<Renderer2
								item1={ items.Ghost }
								item2={ items.Tertiary }
							/>
						) : null }
						{ /* eslint-enable @stylistic/indent */ }
					</View>
				</Context.Provider>
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
		}),

	mapStyleByFluid: Record<`${boolean}`, ViewProps['style']> =
		{
			false: styleSheet.fixedGroup,
			true: styleSheet.fluidGroup,
		},

	mapStyleByVerticalStack: Record<`${boolean}`, ViewProps['style']> =
		{
			false: FlexStyleSheet.flex_row,
			true: FlexStyleSheet.flex_col_reverse,
		}
