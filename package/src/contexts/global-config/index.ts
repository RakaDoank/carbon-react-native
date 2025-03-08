import {
	createContext,
} from 'react'

import type {
	NotificationColor,
} from '../../components/notification/types'

export interface GlobalConfigContext {
	/**
	 * @platform android
	 */
	android_buttonRippleEffect: boolean,
	notificationColor: NotificationColor,
}

export const GlobalConfigContext = createContext<GlobalConfigContext>({
	android_buttonRippleEffect: true,
	notificationColor: 'high_contrast',
})
