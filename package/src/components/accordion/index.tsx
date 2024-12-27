import {
	forwardRef,
	useCallback,
	useRef,
	useState,
} from 'react'

import {
	Dimensions,
	StyleSheet,
	View,
	type ViewProps,
} from 'react-native'

import {
	AccordionContext,
} from './_context'
import type {
	AccordionHeaderProps,
} from './_header'
import {
	AccordionHeaderBorder,
} from './_header-border'
import {
	AccordionItem,
	type AccordionItemProps,
	type AccordionItemRef,
} from './_item'
import type {
	AccordionSize,
} from './size'
import {
	MarginRightStyle,
} from './_styles'

export type {
	AccordionHeaderProps,
	AccordionItemProps,
	AccordionItemRef,
	AccordionSize,
}

export interface AccordionProps extends Omit<ViewProps, 'children'> {
	size?: AccordionSize,
	flushAlignment?: boolean,
	children?: React.ReactNode[],
}

export interface AccordionRef extends View {
}

const Accordion_ = forwardRef<AccordionRef, AccordionProps>(
	function Accordion(
		{
			size,
			flushAlignment,
			children,
			style,
			onLayout,
			...props
		},
		forwardedRef,
	) {

		const
			ref =
				useRef<{
					marginRightStyleKey: keyof typeof MarginRightStyle,
				}>({
					marginRightStyleKey: getMarginRightStyleKey(windowWidth),
				}),

			[marginRightStyleKey, setMarginRightStyleKey] =
				useState(ref.current.marginRightStyleKey),

			handlerLayout: NonNullable<ViewProps['onLayout']> =
				useCallback(event => {
					onLayout?.(event)
					/**
					 * https://carbondesignsystem.com/components/accordion/style/#margin-right
					 */

					const key = getMarginRightStyleKey(windowWidth)

					if(ref.current.marginRightStyleKey !== key) {
						ref.current.marginRightStyleKey = key
						setMarginRightStyleKey(key)
					}
				}, [
					onLayout,
				])

		return (
			<View
				{ ...props }
				style={ style }
				onLayout={ handlerLayout }
				ref={ forwardedRef }
			>
				<AccordionContext.Provider
					value={{
						size,
						flushAlignment,
						collapsibleContentContainerStyle: MarginRightStyle[marginRightStyleKey],
					}}
				>
					{ children }

					{ !!children?.length && (
						<AccordionHeaderBorder
							flushAlignment={ flushAlignment }
							style={ baseStyle.lastAccordionHeaderBorder }
						/>
					) }
				</AccordionContext.Provider>
			</View>
		)

	},
)

export const Accordion = Object.assign(Accordion_, {
	Item: AccordionItem,
})

const
	baseStyle =
		StyleSheet.create({
			lastAccordionHeaderBorder: {
				top: '100%',
			},
		}),

	windowWidth =
		Dimensions.get('window').width

function getMarginRightStyleKey(width: number): keyof typeof MarginRightStyle {
	if(width < 420) {
		return 'small'
	}

	if(width <= 640) {
		return 'range_420_640'
	}

	return 'large'
}
