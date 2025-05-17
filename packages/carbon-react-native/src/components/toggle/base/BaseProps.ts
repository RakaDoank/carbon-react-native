import type {
	PressableProps,
	ViewProps,
} from 'react-native'

import type {
	FormLabelProps,
} from '../../form-label/FormLabelProps'

import type {
	SwitchProps,
} from '../../switch/SwitchProps'

import type {
	TextProps,
} from '../../text/TextProps'

import type {
	ToggleState,
} from '../ToggleState'

export interface BaseProps extends Omit<ViewProps, 'children'> {
	/**
	 * @default 'normal'
	 */
	state?: ToggleState,
	defaultValue?: boolean,
	value?: boolean,
	label?: string,
	actionText?: string,
	onChange?: SwitchProps['onChange'],
	formLabelProps?: Omit<
		FormLabelProps,
		| 'label'
	>,
	actionTextProps?: Omit<TextProps, 'children'>,
	pressableProps?: Omit<
		PressableProps,
		| 'aria-checked'
		| 'role'
		| 'style'
	> & {
		style?: ViewProps['style'],
	},
	switchProps?: Omit<
		SwitchProps,
		| 'controlled'
		| 'value'
		| 'onChange'
		| 'motion'
		| 'role'
		| 'aria-checked'
	>,
}
