import {
	forwardRef,
	useCallback,
	useImperativeHandle,
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
	FlexStyle,
} from '../../styles'

import {
	AccordionContext,
} from './context'
import {
	AccordionHeaderBorder,
} from './header-border'
import {
	AccordionItem,
} from './item'
import {
	AccordionItemContext,
} from './item-context'
import {
	Size,
} from './size'
import {
	MarginRightStyle,
} from './styles'

export interface AccordionProps extends Omit<ViewProps, 'children'> {
	size?: Size,
	controlled?: boolean,
	open?: boolean[],
	flushAlignment?: boolean,
	children?: React.ReactNode[],
}

export interface AccordionRef {
	/**
	 * This method does nothing if `controlled` prop is true
	 */
	setOpen: (value: boolean[]) => void,
}

const Accordion_ = forwardRef<AccordionRef, AccordionProps>(
	function Accordion(
		{
			size,
			controlled,
			open: openProp,
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

			[openSelf, setOpenSelf] =
				useState<(boolean | undefined)[]>(openProp ?? []),

			open =
				controlled ? openProp : openSelf,

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
				]),

			onPressItemHeader =
				useCallback((
					index: number,
				) => {
					if(!controlled) {
						setOpenSelf(currentOpenSelf => {
							const newOpenSelf = currentOpenSelf.slice()
							newOpenSelf[index] = !newOpenSelf[index]
							return newOpenSelf
						})
					}
				}, [
					controlled,
				])

		useImperativeHandle(forwardedRef, () => {
			return {
				setOpen(value) {
					if(!controlled) {
						setOpenSelf(value)
					}
				},
			}
		}, [
			controlled,
		])

		return (
			<View
				{ ...props }
				style={ [
					FlexStyle.flex_initial,
					style,
				] }
				onLayout={ handlerLayout }
			>
				<AccordionContext.Provider
					value={{
						size,
						flushAlignment,
					}}
				>
					{ children?.map((itemChildren, index) => {
						return (
							<AccordionItemContext.Provider
								key={ index }
								value={{
									open: open?.[index],
									onPress() {
										onPressItemHeader(index)
									},
									collapsibleContentContainerStyle: MarginRightStyle[marginRightStyleKey],
								}}
							>
								{ itemChildren }
							</AccordionItemContext.Provider>
						)
					}) }

					{ !!children?.length && (
						<AccordionHeaderBorder
							flushAlignment={ flushAlignment }
							style={ baseStyle.lastAccordionHeaderBorder }
						/>
					) }
				</AccordionContext.Provider>
			</View>
		)

	}
)

export const Accordion = Object.assign(Accordion_, {
	Item: AccordionItem,
	Size,
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
