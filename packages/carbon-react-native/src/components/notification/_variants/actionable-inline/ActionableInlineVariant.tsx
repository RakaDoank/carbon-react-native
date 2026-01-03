import {
	forwardRef,
} from "react"

import {
	VariantContextProvider,
} from "../../_VariantContextProvider"

import {
	Base,
} from "../../base"

import {
	Subtitle,
} from "../../subtitle"

import {
	ButtonGhost,
} from "../_ButtonGhost"

import type {
	ActionableInlineVariantProps,
} from "./ActionableInlineVariantProps"

import type {
	ActionableInlineVariantRef,
} from "./ActionableInlineVariantRef"

export const ActionableInlineVariant = forwardRef<ActionableInlineVariantRef, ActionableInlineVariantProps>(
	function ActionableInlineVariant(
		{
			color,
			Icon,
			subtitle,
			subtitleStyle,
			buttonProps,
			...props
		},
		ref,
	) {

		return (
			<VariantContextProvider color={ color }>
				<Base
					{ ...props }
					inline
					Icon={ Icon }
					iconClose
					body={
						subtitle && (typeof subtitle === "string" || typeof subtitle === "number") ? (
							<Subtitle style={ subtitleStyle }>
								{ subtitle }
							</Subtitle>
						) : subtitle
					}
					nodes={{
						beforeButtonClose: buttonProps ? (
							<ButtonGhost
								{ ...buttonProps }
							/>
						) : undefined,
					}}
					ref={ ref }
				/>
			</VariantContextProvider>
		)

	},

)
