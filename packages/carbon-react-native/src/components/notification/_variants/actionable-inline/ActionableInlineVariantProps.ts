import type {
	NotificationColor,
} from "../../NotificationColor"
import type {
	BaseProps,
} from "../../base/BaseProps"


import type {
	SubtitleProps,
} from "../../subtitle/SubtitleProps"

import type {
	ButtonGhostProps,
} from "../_ButtonGhost"

export interface ActionableInlineVariantProps extends Omit<
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
	 * Fill the button prop to render an button action in the notification component  
	 * Props are similar like you're calling an button component `<Button.Ghost text="button"/>`, just without the JSX
	 * @example
	 * <Notification.ActionableInline.Informational
	 * 	title="Title goes here"
	 * 	subtitle="Subtitle goes here"
	 * 	buttonProps={{
	 * 		text: 'Action',
	 * 		onPress: event => {
	 * 			// your function
	 * 		},
	 * 	}}
	 * />
	 */
	buttonProps?: Omit<ButtonGhostProps, "color">,
	subtitle: React.ReactNode,
	subtitleStyle?: SubtitleProps["style"],
}
