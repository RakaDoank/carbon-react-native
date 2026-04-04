import {
	Animated,
} from "react-native"

import {
	useAnimatedContent,
} from "../_useAnimatedContent"

import type {
	AnimatedNextContentProps,
} from "./AnimatedNextContentProps"

export function AnimatedNextContent({
	visible,
	style,
	...props
}: AnimatedNextContentProps) {

	const
		animatedContent =
			useAnimatedContent({ visible })

	return (
		<Animated.View
			{ ...props }
			style={ [
				animatedContent.style,
				style,
			] }
		/>
	)

}
