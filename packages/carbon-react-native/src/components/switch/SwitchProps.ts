import type {
	EasingFunction,
	PressableProps,
	StyleProp,
	ViewStyle,
} from "react-native"

import type {
	SwitchSize,
} from "./SwitchSize"

import type {
	SwitchState,
} from "./SwitchState"

export interface SwitchProps extends Omit<PressableProps, "children"> {
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
	trackColor?: Record<"false" | "true", string>,
	thumbColor?: Record<"false" | "true", string>,
	motion?: Record<"false" | "true", {
		duration: number,
		easing?: EasingFunction,
	}>,
	onChange?: (value: boolean) => void,
	style?: StyleProp<ViewStyle>,
}
