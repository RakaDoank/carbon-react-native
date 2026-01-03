import type {
	ViewProps,
} from "react-native"

import type {
	SvgProps,
} from "react-native-svg"

import type {
	BaseColorProps,
} from "../../button/base-color"

import type {
	TextProps,
} from "../../text/TextProps"

export interface BaseProps extends Omit<ViewProps, "children"> {
	title?: string,
	/**
	 * You can fill it with string or number to render quickly useful message.  
	 * Alternatively, you can use `<Notification.Subtitle>` with `<Notification.SubtitleLink>` if necessary
	 */
	body?: React.ReactNode,
	inline?: boolean,

	Icon?: BaseColorProps["Icon"],
	iconProps?: Omit<SvgProps, "width" | "height">,
	iconContainerStyle?: ViewProps["style"],

	iconClose?: boolean,
	onPressIconClose?: BaseColorProps["onPress"],
	iconCloseProps?: Omit<
		SvgProps,
		| "width"
		| "height"
	>,
	iconCloseButtonProps?: Omit<
		BaseColorProps,
		| "text"
		| "size"
		| "icon"
		| "iconNode"
		| "colorStateStyle"
		| "onPress"
	>,

	nodes?: Partial<Record<
		| "beforeContentContainer"
		| "beforeButtonClose"
		| "afterContentContainer"
		| "beforeContentContainerEnd",
		React.ReactNode
	>>,

	titleStyle?: TextProps["style"],
	leftBarStyle?: ViewProps["style"],
	leftContainerStyle?: ViewProps["style"],
	contentContainerStyle?: ViewProps["style"],
}
