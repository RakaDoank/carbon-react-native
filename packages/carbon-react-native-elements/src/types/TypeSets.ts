import type {
	TextStyle,
} from 'react-native'

export interface TypeSets {
	fontSize: number,
	lineHeight: number,
	fontWeight: Extract<NonNullable<TextStyle['fontWeight']>, number>
	letterSpacing: number,
}
