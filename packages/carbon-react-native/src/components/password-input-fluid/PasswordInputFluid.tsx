import {
	forwardRef,
} from "react"

import {
	SecureTextEntryControlHook,
} from "../../_internal/hooks"

import {
	GhostIcon,
} from "../password-input-field/_ghost-icon"

import {
	TextInputFluid,
} from "../text-input-fluid"

import type {
	PasswordInputFluidProps,
} from "./PasswordInputFluidProps"

import type {
	PasswordInputFluidRef,
} from "./PasswordInputFluidRef"

export const PasswordInputFluid = forwardRef<PasswordInputFluidRef, PasswordInputFluidProps>(
	function PasswordInputFluid(
		{
			autoComplete = "current-password",
			secureTextEntry: secureTextEntryProp,
			blockEndNode,
			...props
		},
		ref,
	) {

		const
			[secureTextEntry, toggleSecureTextEntrySelf] =
				SecureTextEntryControlHook.use(secureTextEntryProp)

		return (
			<TextInputFluid
				ref={ ref }
				{ ...props }
				autoComplete={ autoComplete }
				secureTextEntry={ secureTextEntry }
				blockEndNode={ (<>
					<GhostIcon
						inputSize="medium"
						secureTextEntry={ secureTextEntry }
						onPress={ toggleSecureTextEntrySelf }
					/>

					{ blockEndNode }
				</>) }
			/>
		)

	},
)
