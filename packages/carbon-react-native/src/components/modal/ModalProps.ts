import type {
	ViewProps,
} from "react-native"

import type {
	GhostIconProps,
} from "../button/ghost-icon/GhostIconProps"

import type {
	ModalSize,
} from "./ModalSize"

export interface ModalProps extends ViewProps {
	label?: string,
	title: string,
	/**
	 * @default 'medium'
	 */
	size?: ModalSize,
	buttonCloseProps?: Omit<
		GhostIconProps,
		| "icon"
	>,
	/**
	 * The modal will use react-native-safe-area-context internally to supporting safe areas, but you may want to apply it only for specific situation, e.g. in dialog and small breakpoint. This may only apply to Android, iOS, and Web.
	 * 
	 * - `all`:
	 * Apply insets regardless the conditions. You might want this if you want to render it in full screen with dialog in Android, iOS, and Web platform by override the modal width and height style
	 * 
	 * - `in_dialog_and_small_bp`:
	 * (Default) Apply insets only if the Modal component is rendered in dialog and currently in small breakpoint. Based on IBM spec, this is needed for the modal in the mobile screen. The `Modal` will be height stretched automatically in small breakpoint and in dialog
	 * 
	 * - `none`:
	 * Apply no insets
	 * 
	 * This prop may not apply for desktop app. Unless in the future, macOS or Windows with React Native allows us to create an desktop app that will be rendered in full screen or borderless windowed like a video game
	 * 
	 * @default "in_dialog_and_small_bp"
	 */
	applyInsets?:
		| "all"
		| "in_dialog_and_small_bp"
		| "none",
	/**
	 * All edges are applied by default. You probably want this if you want to apply the inset only for specific edges. It only applies if `applyInsets` prop is not undefined or not `none`.
	 * 
	 * Note:
	 * - `left` and `right` edge only apply to the `ModalContent` component
	 * - `top` edge applies margin style to the modal's header (the title and the close icon)
	 * - `bottom` edge applies to the modal itself
	 * 
	 * Alternative for modal with buttons; You can unapply the bottom inset and use the `Button` component with `2xl` size.
	 */
	applyInsetsEdges?: Partial<Record<
		| "top"
		| "bottom"
		| "left"
		| "right",
		boolean
	>>,
}
