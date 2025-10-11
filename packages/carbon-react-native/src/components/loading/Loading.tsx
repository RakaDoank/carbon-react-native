import {
	Component,
	forwardRef,
	useContext,
	useEffect,
} from 'react'

import {
	Color,
	Motion,
	type ColorLayerLevel,
} from '@audira/carbon-react-native-elements'

import Animated, {
	Easing,
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

import Svg, {
	Circle,
	type SvgProps,
} from 'react-native-svg'

import {
	ThemeContext,
} from '../../contexts'

import {
	LayerContext,
} from '../layer'

import type {
	LoadingProps,
} from './LoadingProps'

import type {
	LoadingRef,
} from './LoadingRef'

import type {
	LoadingType,
} from './LoadingType'
import {
	loadingProgress,
} from './_loading-progress'

export const Loading = forwardRef<LoadingRef, LoadingProps>(
	function Loading(
		{
			type = 'large',
			style,
			...props
		},
		ref,
	) {

		const
			layerContext =
				useContext(LayerContext),

			themeContext =
				useContext(ThemeContext),

			rotationValue =
				useSharedValue(0),

			animatedStyle =
				useAnimatedStyle(() => {
					return {
						transform: [{
							rotateZ: `${rotationValue.value}deg`,
						}],
					}
				})

		useEffect(() => {
			rotationValue.value = withRepeat(
				withTiming(
					360,
					{
						duration: Motion.Duration.slow_02,
						easing: Easing.linear,
					},
				),
				0,
			)
			return () => {
				cancelAnimation(rotationValue)
			}
		}, [
			rotationValue,
		])

		return (
			<AnimatedCircularProgress
				forwardedRef={ ref }
				{ ...props }
				type={ type }
				circleStrokeColor={ mapCircleStrokeColor[themeContext.colorScheme] }
				circleBackgroundColor={ mapCircleBackgroundColor[layerContext][themeContext.colorScheme] }
				style={ [
					animatedStyle,
					style,
				] }
			/>
		)

	},
)

const
	mapCircleStrokeColor: Record<ThemeContext['colorScheme'], string> =
		{
			gray_10: Color.Token.gray_10.interactive,
			gray_100: Color.Token.gray_100.interactive,
		},

	mapCircleBackgroundColor: {
		[Layer in ColorLayerLevel]: Record<ThemeContext['colorScheme'], string>
	} =
		{
			1: {
				gray_10: Color.Token.gray_10.layer_accent_01,
				gray_100: Color.Token.gray_100.layer_accent_01,
			},
			2: {
				gray_10: Color.Token.gray_10.layer_accent_02,
				gray_100: Color.Token.gray_100.layer_accent_02,
			},
			3: {
				gray_10: Color.Token.gray_10.layer_accent_03,
				gray_100: Color.Token.gray_100.layer_accent_03,
			},
		},

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

interface InternalCircularProgressProps extends Omit<SvgProps, 'width' | 'height'> {
	/**
	 * @default 'large'
	 */
	type: LoadingType,
	circleStrokeColor: string,
	circleBackgroundColor: string,
	forwardedRef?: React.ForwardedRef<Svg>,
}

class CircularProgress extends Component<InternalCircularProgressProps> {

	override render() {
		const
			{
				circleStrokeColor,
				circleBackgroundColor,
				type,
				forwardedRef,

				fill = 'transparent',
				viewBox = '0 0 100 100',

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
				{ type == 'small' && (
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
	AnimatedCircularProgress =
		Animated.createAnimatedComponent(CircularProgress)
