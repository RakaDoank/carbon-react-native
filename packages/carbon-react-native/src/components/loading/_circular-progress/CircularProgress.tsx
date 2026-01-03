import {
	Component,
} from "react"

import Svg, {
	Circle,
} from "react-native-svg"

import type {
	LoadingType,
} from "../LoadingType"

import type {
	CircularProgressProps,
} from "./CircularProgressProps"

export class CircularProgress extends Component<CircularProgressProps> {

	override render() {
		const
			{
				circleStrokeColor,
				circleBackgroundColor,
				type,
				forwardedRef,

				fill = "transparent",
				viewBox = "0 0 100 100",

				...props
			} =
				this.props,

			size =
				mapSize[type]

		return (
			<Svg
				ref={ forwardedRef }
				{ ...props }
				width={ size }
				height={ size }
				viewBox={ viewBox }
				fill={ fill }
			>
				{ type == "small" && (
					// Background
					<Circle
						cx="50%"
						cy="50%"
						r={ radius }
						strokeLinecap="butt"
						strokeDasharray={ circleStrokeDasharray }
						stroke={ circleBackgroundColor }
						strokeWidth={ mapCircleStrokeWidth.small }
						strokeDashoffset={ -radius }
					/>
				) }

				{ /* Stroke */ }
				<Circle
					cx="50%"
					cy="50%"
					r={ radius }
					strokeLinecap="butt"
					strokeDasharray={ circleStrokeDasharray }
					stroke={ circleStrokeColor }
					strokeWidth={ mapCircleStrokeWidth[type] }
					strokeDashoffset={ mapCircleStrokeDashoffset[type] }
				/>
			</Svg>
		)
	}

}

const
	mapSize: Record<LoadingType, number> =
		{
			small: 16,
			large: 88,
		},

	radius =
		44,

	circumference =
		radius * 2 * Math.PI,

	circleStrokeDasharray =
		[circumference, circumference],

	mapCircleStrokeDashoffset: Record<LoadingType, number> =
		{
			small: loadingProgress(circumference, 50),
			large: loadingProgress(circumference, 81),
		},

	mapCircleStrokeWidth: Record<LoadingType, number> =
		{
			small: 16,
			large: 10,
		}

function loadingProgress(
	circumference: number,
	/**
	 * 0 - 100
	 */
	percentage: number,
) {
	return circumference - percentage * 0.01 * circumference
}
