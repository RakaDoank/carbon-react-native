import type {
	ViewProps,
} from 'react-native'

import type {
	WithTimingConfig,
} from 'react-native-reanimated'

import type {
	AnimatedViewProps,
} from './_AnimatedViewProps'

export interface CollapsibleProps extends AnimatedViewProps {
	defaultOpen?: boolean,
	open?: boolean,
	motion?: Record<'toOpen' | 'toClose', WithTimingConfig>,
	contentContainerStyle?: ViewProps['style'],
	onToggle?: (value: boolean) => void,
	onOpened?: () => void,
	onClosed?: () => void,
}
