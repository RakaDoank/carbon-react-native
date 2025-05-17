import type {
	PressableProps,
	ViewProps,
} from 'react-native'

import type {
	FormLabelProps,
} from '../form-label/FormLabelProps'

import type {
	RadioButtonInputInteractiveState,
} from '../radio-button-input/RadioButtonInputInteractiveState'

import type {
	RadioButtonInputProps,
} from '../radio-button-input/RadioButtonInputProps'

export interface RadioButtonProps extends Omit<ViewProps, 'children'> {
	defaultChecked?: boolean,
	checked?: boolean,
	value?: RadioButtonInputProps['value'],
	interactiveState?: RadioButtonInputInteractiveState,
	label: string,
	onChange?: RadioButtonInputProps['onChange'],
	onPress?: RadioButtonInputProps['onPress'],
	radioButtonInputProps?: Omit<
		RadioButtonInputProps,
		| 'controlled'
		| 'checked'
		| 'value'
		| 'interactiveState'
		| 'role'
		| 'onChange'
	>,
	formLabelProps?: Omit<FormLabelProps, 'label'>,
	pressableProps?: Omit<
		PressableProps,
		| 'role'
		| 'style'
		| 'onPress'
	> & {
		style?: ViewProps['style'],
	},
}
