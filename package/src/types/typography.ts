import type {
	TextStyle,
} from 'react-native'

export type TypeSetsClass =
	| 'code_01'
	| 'code_02'
	| 'label_01'
	| 'label_02'
	| 'helper_text_01'
	| 'helper_text_02'
	| 'legal_01'
	| 'legal_02'
	| 'body_compact_01'
	| 'body_compact_02'
	| 'body_01'
	| 'body_02'
	| 'heading_compact_01'
	| 'heading_compact_02'
	| 'heading_01'
	| 'heading_02'
	| 'heading_03'
	| 'heading_04'
	| 'heading_05'
	| 'heading_06'
	| 'heading_07'

export interface TypeSetsStyle {
	fontSize: number,
	lineHeight: number,
	fontWeight: Extract<NonNullable<TextStyle['fontWeight']>, number>
	letterSpacing: number,
}

export interface TypeSets extends Record<TypeSetsClass, TypeSetsStyle> {
}