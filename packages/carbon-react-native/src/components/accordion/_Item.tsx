import {
	forwardRef,
	useCallback,
	useContext,
	useImperativeHandle,
	useRef,
	useState,
} from "react"

import {
	StyleSheet,
	View,
} from "react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

import {
	GlobalConfigContext,
} from "../../_internal/contexts"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	Collapsible,
} from "../collapsible"

import type {
	AccordionHeaderProps,
} from "./AccordionHeaderProps"

import type {
	AccordionItemProps,
} from "./AccordionItemProps"

import type {
	AccordionItemRef,
} from "./AccordionItemRef"

import type {
	AccordionItemRefBase,
} from "./AccordionItemRefBase"

import {
	Header,
} from "./_Header"

import {
	Context,
} from "./_context"

import {
	Motion,
} from "./_motion"

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
			globalConfigContext =
				useContext(GlobalConfigContext),

			accordionContext =
				useContext(Context),

			ref =
				useRef({
					allowOnChangeEffect: false,
				}),

			viewRef =
				useRef<View>(null),

			[openSelf, setOpenSelf] =
				useState(!!defaultOpen),

			controlled =
				typeof openProp !== "undefined",

			open =
				controlled ? !!openProp : openSelf,

			pressHandler: NonNullable<AccordionHeaderProps["onPress"]> =
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
			return Object.assign<View, AccordionItemRefBase>(
				(viewRef.current ?? {
				}) as View,
				{
					get open() {
						return open
					},
					setOpen(value) {
						if(!controlled) {
							let openNext: boolean
							if(typeof value === "boolean") {
								openNext = value
							} else {
								openNext = value(open)
							}
							setOpenSelf(openNext)
						}
					},
				},
			)
		}, [
			open,
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
					dir={ globalConfigContext.rtl ? "rtl" : undefined }
					contentContainerProps={{
						style: [
							globalConfigContext.rtl ? CarbonStyleSheet.g.rtl : undefined,
							accordionContext.collapsibleContentContainerStyle,
							style.panel,
						],
					}}
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
