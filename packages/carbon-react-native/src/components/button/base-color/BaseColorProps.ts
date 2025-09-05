import type {
	StyleProp,
	TextStyle,
	ViewStyle,
} from 'react-native'

import type {
	BaseProps,
} from '../base/BaseProps'

import type {
	BaseColorState,
} from './BaseColorState'

export interface BaseColorProps extends Omit<BaseProps, 'backgroundNode' | 'iconNode'> {
	android_rippleEffectColor: string,
	colorStateStyle: {
		background: Record<BaseColorState, StyleProp<ViewStyle>>,
		text: Record<BaseColorState, StyleProp<TextStyle>>,
		icon: Record<BaseColorState, string>,
	},
	/**
	 * It extends `iconNode` prop from `BaseProps` to add one argument at start for icon coloring
	 */
	iconNode?: (
		/**
		 * Use this param to coloring an icon correctly according each variant of button and its state, like focused, disabled, etc.
		 */
		iconColorState: string,
		...params: Parameters<NonNullable<BaseProps['iconNode']>>
	) => React.ReactNode,
}
