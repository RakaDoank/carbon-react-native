import type {
	EasingFunction,
	ViewProps,
} from 'react-native'

import type {
	EasingFunctionFactory,
} from 'react-native-reanimated'

import type {
	AnimatedViewProps,
} from './_AnimatedViewProps'

export interface CollapsibleProps extends AnimatedViewProps {
	defaultOpen?: boolean,
	open?: boolean,
	motion?: Record<'toOpen' | 'toClose', {
		duration: number,
		/**
		 * `EasingFunctionFactory` is the return type of the `Easing.bezier` of React Native Reanimated
		 */
		easing?: EasingFunction | EasingFunctionFactory,
	}>,
	contentContainerStyle?: ViewProps['style'],
	onToggle?: (value: boolean) => void,
	onOpened?: () => void,
	onClosed?: () => void,
}
