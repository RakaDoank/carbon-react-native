import {
	forwardRef,
} from "react"

import {
	Primary as Button,
} from "../../button/primary/Primary"

import {
	useSize,
} from "../_useSize"

import type {
	PrimaryProps,
} from "./PrimaryProps"

import type {
	PrimaryRef,
} from "./PrimaryRef"

export const Primary = forwardRef<PrimaryRef, PrimaryProps>(
	function Primary(
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
