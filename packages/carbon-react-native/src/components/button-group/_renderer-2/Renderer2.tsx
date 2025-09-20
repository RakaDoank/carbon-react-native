'use client'

import {
	useContext,
} from 'react'

import type {
	ViewProps,
} from 'react-native'

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
	Renderer2Props,
} from './Renderer2Props'

export function Renderer2<
	Props1 extends ViewProps = BaseProps,
	Props2 extends ViewProps = BaseProps,
>({
	item1,
	item2,
}: Renderer2Props<Props1, Props2>) {

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

		style =
			mapStyle[`${context.verticalStack}`][`${context.fluid}`]

	return (
		<>
			<item1.Component
				{ ...props1 }
				style={ [
					style,
					props1.style,
				] }
			/>
			<item2.Component
				{ ...props2 }
				style={ [
					style,
					props2.style,
				] }
			/>
		</>
	)

}

const
	mapStyle: {
		[VerticalStack in `${boolean}`]: {
			[Fluid in `${boolean}`]: ViewProps['style']
		}
	} =
		{
			false: {
				false: undefined,
				true: FlexStyleSheet.flex_1,
			},
			true: {
				false: FlexStyleSheet.self_stretch,
				true: FlexStyleSheet.self_stretch,
			},
		}
