import {
	forwardRef,
	useContext,
} from 'react'

import {
	View,
	type ViewStyle,
} from 'react-native'

import {
	Color,
	type ColorLayerLevel,
} from '@audira/carbon-react-native-elements'

import {
	MathHelper,
} from '../../_internal/helpers'

import {
	CarbonStyleSheet,
} from '../../carbon-style-sheet'

import {
	LayerContext,
} from './LayerContext'

import type {
	LayerProps,
} from './LayerProps'

import type {
	LayerRef,
} from './LayerRef'

export const Layer = forwardRef<LayerRef, LayerProps>(
	function Layer(
		{
			level: levelProp,
			withBackground,
			style,
			...props
		},
		ref,
	) {

		const
			layerContextLevel =
				useContext(LayerContext),

			level =
				levelProp ?? layerContextLevel,

			value =
				MathHelper.clamp(level + 1, Color.Layer.MinLevel, Color.Layer.MaxLevel)

		return (
			<LayerContext.Provider value={ value }>
				<View
					ref={ ref }
					{ ...props }
					style={ [
						withBackground
							? bgLevelStyleSheet[value]
							: undefined,
						style,
					] }
				/>
			</LayerContext.Provider>
		)

	},
)

const
	bgLevelStyleSheet =
		CarbonStyleSheet.create<Record<ColorLayerLevel, ViewStyle>>({
			1: {
				backgroundColor: CarbonStyleSheet.color.layer_01,
			},
			2: {
				backgroundColor: CarbonStyleSheet.color.layer_02,
			},
			3: {
				backgroundColor: CarbonStyleSheet.color.layer_03,
			},
		})
