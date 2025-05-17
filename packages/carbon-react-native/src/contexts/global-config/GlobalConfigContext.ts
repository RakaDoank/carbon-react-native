import {
	createContext,
} from 'react'

import type {
	NotificationColor,
} from '../../components/notification/NotificationColor'

export interface GlobalConfigContext {
	android_buttonRippleEffect: boolean,
	notificationColor: NotificationColor,
	/**
	 * Toast duration in milliseconds per component that will be appeared on screen  
	 * @default 5000
	 */
	toastDuration: number,
}

export const GlobalConfigContext = createContext<GlobalConfigContext>({
	android_buttonRippleEffect: true,
	notificationColor: 'high_contrast',
	toastDuration: 5000,
})
