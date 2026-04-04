import {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from "react"

import {
	View,
} from "react-native"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import type {
	TableToolbarSwitcherProps,
} from "./TableToolbarSwitcherProps"

import type {
	TableToolbarSwitcherRef,
} from "./TableToolbarSwitcherRef"

import type {
	TableToolbarSwitcherRefBase,
} from "./TableToolbarSwitcherRefBase"

import {
	AnimatedNextContent,
} from "./_animated-next-content"

import {
	AnimatedToolbar,
	type AnimatedToolbarRef,
} from "./_animated-toolbar"

/**
 * Render `TableToolbar` and switch to other view if some events happened.
 * 
 * This is useful if you want to use both `TableToolbar` and `TableBatchActionBar`,
 * but only show `TableBatchActionBar` and hide `TableToolbar` if some events occured, e.g. a row has been selected.
 */
export const TableToolbarSwitcher = forwardRef<TableToolbarSwitcherRef, TableToolbarSwitcherProps>(
	function TableToolbarSwitcher(
		{
			defaultNext,
			next: nextProp,
			nextContent,
			...props
		},
		ref,
	) {


		const
			animatedToolbarRef =
				useRef<AnimatedToolbarRef>(null),

			[nextSelf, setNextSelf] =
				useState(!!defaultNext),

			next =
				nextProp ?? nextSelf

		useImperativeHandle(ref, () => {
			return Object.assign<AnimatedToolbarRef, TableToolbarSwitcherRefBase>(
				animatedToolbarRef.current ?? {} as AnimatedToolbarRef,
				{
					next() {
						if(typeof nextProp === "undefined") {
							setNextSelf(true)
						}
					},
					prev() {
						if(typeof nextProp === "undefined") {
							setNextSelf(false)
						}
					},
					switch() {
						if(typeof nextProp === "undefined") {
							setNextSelf(s => !s)
						}
					},
				},
			)
		}, [
			nextProp,
		])

		return (
			<View
				style={ [
					CarbonStyleSheet.g.flex_auto,
				] }
			>
				<AnimatedToolbar
					ref={ animatedToolbarRef }
					{ ...props }
					visible={ !next }
				/>

				<AnimatedNextContent
					visible={ next }
				>
					{ nextContent }
				</AnimatedNextContent>
			</View>
		)

	},
)

