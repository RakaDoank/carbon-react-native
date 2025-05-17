import {
	createContext,
} from 'react'

import type {
	RadioButtonGroupProps,
} from './RadioButtonGroupProps'

export interface ItemContext {
	controlled?: boolean,
	value?: RadioButtonGroupProps['selectedValue'],
	setValue?: (value: RadioButtonGroupProps['selectedValue']) => void,
}

export const ItemContext = createContext<ItemContext>({})
