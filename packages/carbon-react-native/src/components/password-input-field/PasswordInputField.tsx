import {
	forwardRef,
} from "react"

import {
	SecureTextEntryControlHook,
} from "../../_internal/hooks"

import {
	TextInputField,
} from "../text-input-field"

import type {
	PasswordInputFieldProps,
} from "./PasswordInputFieldProps"

import type {
	PasswordInputFieldRef,
} from "./PasswordInputFieldRef"

import {
	GhostIcon,
} from "./_ghost-icon"

export const PasswordInputField = forwardRef<PasswordInputFieldRef, PasswordInputFieldProps>(
	function PasswordInputField(
		{
			autoComplete = "current-password",
			size = "medium",
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
			<TextInputField
				ref={ ref }
				{ ...props }
				autoComplete={ autoComplete }
				size={ size }
				secureTextEntry={ secureTextEntry }
				blockEndNode={ (<>
					<GhostIcon
						inputSize={ size }
						secureTextEntry={ secureTextEntry }
						onPress={ toggleSecureTextEntrySelf }
					/>

					{ blockEndNode }
				</>) }
			/>
		)

	},
)
