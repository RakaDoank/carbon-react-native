import {
	forwardRef,
} from "react"

import {
	Base,
} from "../base"

import type {
	SmallProps,
} from "./SmallProps"

import type {
	SmallRef,
} from "./SmallRef"

export const Small = forwardRef<SmallRef, SmallProps>(
	function Small(
		{
			switchProps,
			...props
		},
		ref,
	) {

		return (
			<Base
				{ ...props }
				switchProps={{
					...switchProps,
					size: "small",
				}}
				ref={ ref }
			/>
		)

	},
)
