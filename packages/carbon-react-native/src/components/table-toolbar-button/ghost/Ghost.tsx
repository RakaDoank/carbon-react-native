import {
	forwardRef,
} from "react"

import {
	Ghost as Button,
} from "../../button/ghost/Ghost"

import {
	useSize,
} from "../_useSize"

import type {
	GhostProps,
} from "./GhostProps"

import type {
	GhostRef,
} from "./GhostRef"

export const Ghost = forwardRef<GhostRef, GhostProps>(
	function Ghost(
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
