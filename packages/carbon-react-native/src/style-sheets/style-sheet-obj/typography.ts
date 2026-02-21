import type {
	TextStyle,
} from "react-native"

import {
	Typography as T,
} from "@audira/carbon-react-native-elements"

export const Typography = {
	body_01: T.TypeSets.body_01,
	body_02: T.TypeSets.body_02,
	body_compact_01: T.TypeSets.body_compact_01,
	body_compact_02: T.TypeSets.body_compact_02,
	code_01: T.TypeSets.code_01,
	code_02: T.TypeSets.code_02,
	heading_01: T.TypeSets.heading_01,
	heading_02: T.TypeSets.heading_02,
	heading_03: T.TypeSets.heading_03,
	heading_04: T.TypeSets.heading_04,
	heading_05: T.TypeSets.heading_05,
	heading_06: T.TypeSets.heading_06,
	heading_07: T.TypeSets.heading_07,
	heading_compact_01: T.TypeSets.heading_compact_01,
	heading_compact_02: T.TypeSets.heading_compact_02,
	helper_text_01: T.TypeSets.helper_text_01,
	helper_text_02: T.TypeSets.helper_text_02,
	label_01: T.TypeSets.label_01,
	label_02: T.TypeSets.label_02,
	legal_01: T.TypeSets.legal_01,
	legal_02: T.TypeSets.legal_02,
} as const satisfies Record<keyof typeof T["TypeSets"], TextStyle>
