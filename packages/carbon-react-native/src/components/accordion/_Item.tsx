import {
	forwardRef,
	useCallback,
	useContext,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import {
	StyleSheet,
	View,
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	Collapsible,
} from '../collapsible'

import {
	Context,
} from './_context'

import {
	Header,
} from './_Header'

import type {
	ItemRefBase,
} from './_ItemRefBase'

import {
	Motion,
} from './_motion'

import type {
	AccordionHeaderProps,
} from './AccordionHeaderProps'

import type {
	AccordionItemProps,
} from './AccordionItemProps'

import type {
	AccordionItemRef,
} from './AccordionItemRef'

export const Item = forwardRef<AccordionItemRef, AccordionItemProps>(
	function Item(
		{
			defaultOpen,
			open: openProp,
			title,
			children,
			style: styleProp,
			onPressHeader,
			headerProps,
			...props
		},
		forwardedRef,
	) {

		const
			accordionContext =
				useContext(Context),

			ref =
				useRef({
					allowOnChangeEffect: false,
					open: !!defaultOpen,
				}),

			viewRef =
				useRef<View>(null),

			[openSelf, setOpenSelf] =
				useState(ref.current.open),

			controlled =
				typeof openProp !== 'undefined',

			open =
				controlled ? !!openProp : openSelf,

			pressHandler: NonNullable<AccordionHeaderProps['onPress']> =
				useCallback(event => {
					onPressHeader?.(event)
					if(!controlled) {
						ref.current.allowOnChangeEffect = true
						setOpenSelf(state => !state)
					}
				}, [
					controlled,
					onPressHeader,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<View, ItemRefBase>(
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
					{ ...headerProps }
					open={ open }
					size={ accordionContext.size }
					text={ title }
					flushAlignment={ accordionContext.flushAlignment }
					onPress={ pressHandler }
				/>

				<Collapsible
					motion={ Motion }
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
				paddingTop: Spacing.spacing_03,
				paddingBottom: Spacing.spacing_06,
				paddingLeft: Spacing.spacing_05,
			},
		})
