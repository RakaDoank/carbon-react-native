import {
	createContext,
} from 'react'

import type {
	RadioButtonGroupProps,
} from './types'

export interface RadioButtonGroupItemContext {
	controlled?: RadioButtonGroupProps['controlled'],
	value?: RadioButtonGroupProps['selectedValue'],
	setValue?: (value: RadioButtonGroupProps['selectedValue']) => void,
}

export const RadioButtonGroupItemContext = createContext<RadioButtonGroupItemContext>({})
