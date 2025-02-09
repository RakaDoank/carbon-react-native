import {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import {
	StyleSheet,
	View,
	type ViewProps,
} from 'react-native'

import {
	SpacingConstant,
} from '../../constants'

import {
	Collapsible,
} from '../collapsible'

import {
	Context,
} from './_context'

import {
	Header,
	type HeaderProps,
} from './_header'

import {
	Motion,
} from './_motion'

export interface ItemProps extends ViewProps {
	controlled?: boolean,
	open?: boolean,
	title?: string,
	children?: React.ReactNode,
	onChange?: (open: boolean) => void,
	onPressHeader?: HeaderProps['onPress'],
	accordionHeaderProps?: Omit<
		HeaderProps,
		| 'open'
		| 'size'
		| 'text'
		| 'flushAlignment'
		| 'onPress'
	>
}

interface AccordionItemRefBase {
	readonly open: boolean,
	/**
	 * This method does nothing if `controlled` prop is true
	 */
	setOpen: (value: boolean | ((value: boolean) => boolean)) => void,
}

export interface ItemRef extends View, AccordionItemRefBase {
}

export const Item = forwardRef<ItemRef, ItemProps>(
	function Item(
		{
			controlled,
			open: openProp,
			title,
			children,
			style: styleProp,
			onChange,
			onPressHeader,
			accordionHeaderProps,
			...props
		},
		forwardedRef,
	) {

		const
			accordionContext =
				useContext(Context),

			ref =
				useRef({
					isMounted: false,
					open: !!openProp,
				}),

			viewRef =
				useRef<View>(null),

			[openSelf, setOpenSelf] =
				useState(!!openProp),

			open =
				controlled ? !!openProp : openSelf,

			pressHandler: NonNullable<HeaderProps['onPress']> =
				useCallback(event => {
					onPressHeader?.(event)
					if(!controlled) {
						setOpenSelf(state => !state)
					}
				}, [
					controlled,
					onPressHeader,
				])

		useEffect(() => {
			if(!ref.current.isMounted) {
				ref.current.isMounted = true
			} else {
				ref.current.open = open
				onChange?.(open)
			}
		}, [
			open,
			onChange,
		])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, AccordionItemRefBase>(
				(viewRef.current ?? {}) as View,
				{
					get open() {
						return ref.current.open
					},
					setOpen(value) {
						if(!controlled) {
							if(typeof value === 'boolean') {
								ref.current.open = value
							} else {
								ref.current.open = value(ref.current.open)
							}
							setOpenSelf(ref.current.open)
						}
					},
				},
			)
		}, [
			controlled,
		])

		return (
			<View
				{ ...props }
				style={ styleProp }
			>
				<Header
					{ ...accordionHeaderProps }
					open={ open }
					size={ accordionContext.size }
					text={ title }
					flushAlignment={ accordionContext.flushAlignment }
					onPress={ pressHandler }
				/>

				<Collapsible
					motion={ Motion }
					controlled
					open={ open }
					contentContainerStyle={ [
						accordionContext.collapsibleContentContainerStyle,
						style.panel,
					] }
				>
					{ children }
				</Collapsible>
			</View>
		)

	},
)

const
	style =
		StyleSheet.create({
			panel: {
				paddingTop: SpacingConstant.spacing_03,
				paddingBottom: SpacingConstant.spacing_06,
				paddingLeft: SpacingConstant.spacing_05,
			},
		})
