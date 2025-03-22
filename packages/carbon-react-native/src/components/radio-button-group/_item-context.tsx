import {
	createContext,
} from 'react'

import type {
	RadioButtonGroupProps,
} from './_types'

export interface RadioButtonGroupItemContext {
	controlled?: RadioButtonGroupProps['controlled'],
	value?: RadioButtonGroupProps['selectedValue'],
	setValue?: (value: RadioButtonGroupProps['selectedValue']) => void,
}

export const RadioButtonGroupItemContext = createContext<RadioButtonGroupItemContext>({})
