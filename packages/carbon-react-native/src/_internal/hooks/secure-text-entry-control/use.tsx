import {
	useCallback,
	useState,
} from "react"

import type {
	UseProps,
} from "./UseProps"

export function use(secureTextEntryProp?: UseProps) {

	const
		[secureTextEntrySelf, setSecureTextEntrySelf] =
			useState(true),

		secureTextEntry =
			secureTextEntryProp ?? secureTextEntrySelf,

		toggleSecureTextEntrySelf =
			useCallback(() => {
				setSecureTextEntrySelf(bool => !bool)
			}, [])

	return [secureTextEntry, toggleSecureTextEntrySelf] as const

}
