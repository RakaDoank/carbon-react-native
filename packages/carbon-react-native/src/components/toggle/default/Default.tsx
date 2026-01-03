import {
	forwardRef,
} from "react"

import {
	Base,
} from "../base"

import type {
	DefaultProps,
} from "./DefaultProps"

import type {
	DefaultRef,
} from "./DefaultRef"

export const Default = forwardRef<DefaultRef, DefaultProps>(
	function Default(
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
					size: "default",
				}}
				ref={ ref }
			/>
		)

	},
)
