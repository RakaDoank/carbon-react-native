import {
	createContext,
} from "react"

import type {
	NotificationColor,
} from "../../../components/notification/NotificationColor"

export interface GlobalConfigContext {
	android_buttonRippleEffect: boolean,
	notificationColor: NotificationColor,
	/**
	 * Toast duration in milliseconds per component that will be appeared on screen  
	 * @default 5000
	 */
	toastDuration: number,
	/**
	 * Locale property indicating that text is written from right to left. For example, the `ar` locale (for Arabic) specifies right-to-left.
	 * 
	 * Not only the text, it also affects all the components render.
	 */
	rtl: boolean,
}

export const GlobalConfigContext = createContext<GlobalConfigContext>({
	android_buttonRippleEffect: true,
	notificationColor: "high_contrast",
	toastDuration: 5000,
	rtl: false,
})
