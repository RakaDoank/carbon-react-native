import {
	createContext,
} from 'react'

import type {
	NotificationColor,
} from '../../components/notification/types'

export interface GlobalConfig {
	/**
	 * @platform android
	 */
	android_buttonRippleEffect: boolean,
	notificationColor: NotificationColor,
	/**
	 * Toast duration in milliseconds per component that will be appeared on screen  
	 * @default 5000
	 */
	toastDuration: number,
}

export const GlobalConfig = createContext<GlobalConfig>({
	android_buttonRippleEffect: true,
	notificationColor: 'high_contrast',
	toastDuration: 5000,
})
