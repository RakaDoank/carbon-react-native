import type {
	TextInputProps,
	ViewProps,
} from 'react-native'

import type {
	TextInputFieldInteractiveState,
} from './TextInputFieldInteractiveState'

import type {
	TextInputFieldSize,
} from './TextInputFieldSize'

export interface TextInputFieldProps extends Omit<TextInputProps, 'style'> {
	/**
	 * @default 'medium'
	 */
	size?: TextInputFieldSize,
	/**
	 * @default 'normal'
	 */
	interactiveState?: TextInputFieldInteractiveState,
	hideInteractiveStateIcon?: boolean,
	blockStartNode?: React.ReactNode,
	blockEndNode?: React.ReactNode,
	style?: ViewProps['style'],
	/**
	 * The actual style prop of RN's TextInput
	 */
	textInputStyle?: TextInputProps['style'],
}
