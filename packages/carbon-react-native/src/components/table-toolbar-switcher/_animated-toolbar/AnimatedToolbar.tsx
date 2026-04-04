import {
	forwardRef,
} from "react"

import {
	Animated,
} from "react-native"

import {
	TableToolbar,
} from "../../table-toolbar/TableToolbar"

import {
	useAnimatedContent,
} from "../_useAnimatedContent"

import type {
	AnimatedToolbarProps,
} from "./AnimatedToolbarProps"

import type {
	AnimatedToolbarRef,
} from "./AnimatedToolbarRef"

export const AnimatedToolbar = forwardRef<AnimatedToolbarRef, AnimatedToolbarProps>(
	function AnimatedToolbar(
		{
			visible,
			size,
			style,
			...props
		},
		ref,
	) {

		const
			animatedContent =
				useAnimatedContent({
					visible,
					size,
				})

		return (
			<AnimatedTableToolbar
				ref={ ref }
				{ ...props }
				style={ [
					animatedContent.style,
					style,
				] }
			/>
		)

	},
)

const
	AnimatedTableToolbar =
		Animated.createAnimatedComponent(TableToolbar)
