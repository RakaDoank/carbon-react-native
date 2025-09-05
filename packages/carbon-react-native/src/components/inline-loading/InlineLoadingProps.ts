import type {
	ViewProps,
} from 'react-native'

import type {
	TextProps,
} from '../text/TextProps'

import type {
	InlineLoadingState,
} from './InlineLoadingState'

export interface InlineLoadingProps extends Omit<ViewProps, 'children'> {
	/**
	 * @default 'active'
	 */
	state?: InlineLoadingState,
	text: string,
	textProps?: Omit<
		TextProps,
		| 'children'
		| 'type'
	>
}
