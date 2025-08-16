import type {
	TextInput,
	View,
} from 'react-native'

export interface TextInputFieldRef extends View {
	readonly textInput?: TextInput,
}
