import type {
	ViewProps,
} from 'react-native'

import type {
	TextProps,
} from '../text'

export interface FormHelperTextProps extends Omit<ViewProps, 'children'> {
	error?: boolean,
	text: string,
	textLeading?: React.ReactNode,
	textTrailing?: React.ReactNode,
	textProps?: Omit<TextProps, 'children'>,
}
