import type {
	PressableProps,
	StyleProp,
	ViewStyle,
} from 'react-native'

import type {
	WithTimingConfig,
} from 'react-native-reanimated'

import type {
	SwitchSize,
} from './SwitchSize'

import type {
	SwitchState,
} from './SwitchState'

export interface SwitchProps extends Omit<PressableProps, 'children'> {
	/**
	 * @default 'default'
	 */
	size?: SwitchSize,
	/**
	 * @default 'normal'
	 */
	state?: SwitchState,
	/**
	 * Control `value` prop
	 */
	defaultValue?: boolean,
	value?: boolean,
	trackColor?: Record<'false' | 'true', string>,
	thumbColor?: Record<'false' | 'true', string>,
	motion?: Record<'false' | 'true', WithTimingConfig>,
	onChange?: (value: boolean) => void,
	style?: StyleProp<ViewStyle>,
}
