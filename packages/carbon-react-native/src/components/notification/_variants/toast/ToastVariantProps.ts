import type {
	NotificationColor,
} from "../../NotificationColor"

import type {
	BaseProps,
} from "../../base/BaseProps"

import type {
	SubtitleProps,
} from "../../subtitle/SubtitleProps"

export interface ToastVariantProps extends Omit<
	BaseProps,
	| "inline"
	| "body"
	| "iconClose"
	| "nodes"
	| "leftContainerStyle"
> {
	color?: NotificationColor,
	Icon: NonNullable<BaseProps["Icon"]>,
	/**
	 * Override timestamp text with this prop
	 */
	timestamp?: string,
	subtitle: React.ReactNode,
	subtitleStyle?: SubtitleProps["style"],
}
