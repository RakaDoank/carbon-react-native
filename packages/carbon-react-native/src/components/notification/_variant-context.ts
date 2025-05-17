import {
	createContext,
} from 'react'

import type {
	NotificationColor,
} from './NotificationColor'

export interface VariantContext {
	color: NotificationColor,
}

export const VariantContext = createContext<VariantContext>({
	color: 'high_contrast',
})
