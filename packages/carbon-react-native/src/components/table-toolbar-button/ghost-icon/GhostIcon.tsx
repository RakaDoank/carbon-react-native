import {
	forwardRef,
} from "react"

import {
	GhostIcon as Button,
} from "../../button/ghost-icon/GhostIcon"

import {
	useSize,
} from "../_useSize"

import type {
	GhostIconProps,
} from "./GhostIconProps"

import type {
	GhostIconRef,
} from "./GhostIconRef"

export const GhostIcon = forwardRef<GhostIconRef, GhostIconProps>(
	function GhostIcon(
		{
			size: sizeProp,
			...props
		},
		ref,
	) {

		const
			size =
				useSize()

		return (
			<Button
				ref={ ref }
				{ ...props }
				size={ sizeProp ?? size }
			/>
		)

	},
)
