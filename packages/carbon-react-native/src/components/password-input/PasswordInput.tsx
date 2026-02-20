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
	TextInput,
} from "../text-input"

import type {
	PasswordInputProps,
} from "./PasswordInputProps"

import type {
	PasswordInputRef,
} from "./PasswordInputRef"

export const PasswordInput = forwardRef<PasswordInputRef, PasswordInputProps>(
	function PasswordInput(
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
			<TextInput
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
