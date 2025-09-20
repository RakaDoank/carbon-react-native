'use client'

import {
	useContext,
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
	FlexStyleSheet,
} from '../../../_internal/style-sheets'

import type {
	BaseProps,
} from '../../button/base/BaseProps'

import {
	Context,
} from '../_context'

import type {
	Renderer3Props,
} from './Renderer3Props'

export function Renderer3<
	Props1 extends ViewProps = BaseProps,
	Props2 extends ViewProps = BaseProps,
	Props3 extends ViewProps = BaseProps,
>({
	item1,
	item2,
	item3,
}: Renderer3Props<Props1, Props2, Props3>) {

	const
		context =
			useContext(Context),

		props1 =
			Object.defineProperty({
				...item1,
			}, 'Component', {
				value: undefined,
			}),

		props2 =
			Object.defineProperty({
				...item2,
			}, 'Component', {
				value: undefined,
			}),

		props3 =
			Object.defineProperty({
				...item3,
			}, 'Component', {
				value: undefined,
			}),

		lastTwoButtonStyle =
			mapLastTwoButtonStyle[`${context.verticalStack}`]

	return (
		<>
			<item1.Component
				{ ...props1 }
				style={ [
					mapFirstButtonStyle[`${context.verticalStack}`][`${context.fluid}`],
					props1.style,
				] }
			/>

			<View
				style={ mapLastTwoButtonContainerStyle[`${context.verticalStack}`][`${context.fluid}`] }
			>
				<item2.Component
					{ ...props2 }
					style={ [
						lastTwoButtonStyle,
						props2.style,
					] }
				/>
				<item3.Component
					{ ...props3 }
					style={ [
						lastTwoButtonStyle,
						props3.style,
					] }
				/>
			</View>
		</>
	)

}

const
	styleSheet =
		StyleSheet.create({
			firstButtonHorizontalFluid: {
				width: '25%',
			},
			lastTwoButtonContainerFluid: {
				gap: 1,
			},
			lastTwoButtonContainerHorizontalFluid: {
				width: '50%',
			},
			lastTwoButtonContainerFixed: {
				gap: Spacing.spacing_05,
			},
		}),

	mapLastTwoButtonContainerStyle: {
		[VerticalStack in `${boolean}`]: {
			[Fluid in `${boolean}`]: ViewProps['style']
		}
	} =
		{
			false: {
				false: [
					FlexStyleSheet.flex_row,
					styleSheet.lastTwoButtonContainerFixed,
				],
				true: [
					FlexStyleSheet.flex_row,
					styleSheet.lastTwoButtonContainerFluid,
					styleSheet.lastTwoButtonContainerHorizontalFluid,
				],
			},
			true: {
				false: [
					FlexStyleSheet.flex_col_reverse,
					styleSheet.lastTwoButtonContainerFixed,
				],
				true: [
					FlexStyleSheet.flex_col_reverse,
					styleSheet.lastTwoButtonContainerFluid,
				],
			},
		},

	mapFirstButtonStyle: {
		[VerticalStack in `${boolean}`]: {
			[Fluid in `${boolean}`]: ViewProps['style']
		}
	} =
		{
			false: {
				false: undefined,
				true: styleSheet.firstButtonHorizontalFluid,
			},
			true: {
				false: FlexStyleSheet.self_stretch,
				true: FlexStyleSheet.self_stretch,
			},
		},

	mapLastTwoButtonStyle: { [VerticalStack in `${boolean}`]: ViewProps['style'] } =
		{
			false: FlexStyleSheet.flex_auto,
			true: FlexStyleSheet.self_stretch,
		}
