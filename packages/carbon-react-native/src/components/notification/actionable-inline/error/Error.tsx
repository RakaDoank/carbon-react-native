import {
	forwardRef,
} from "react"

import {
	useError,
} from "../../_status-hooks"

import {
	ActionableInlineVariant,
} from "../../_variants"

import type {
	ErrorProps,
} from "./ErrorProps"

import type {
	ErrorRef,
} from "./ErrorRef"

export const Error = forwardRef<ErrorRef, ErrorProps>(
	function Error(
		{
			color,
			iconProps,
			iconCloseProps,
			titleStyle: titleStyleProp,
			leftBarStyle: leftBarStyleProp,
			style: styleProp,
			...props
		},
		ref,
	) {

		const {
			Icon,
			iconProps: iconPropsData,
			iconCloseProps: iconClosePropsData,
			titleStyle,
			leftBarStyle,
			style,
		} =
			useError({
				color,
			})

		return (
			<ActionableInlineVariant
				{ ...props }
				color={ color }
				Icon={ Icon }
				iconProps={{
					...iconProps,
					...iconPropsData,
				}}
				iconCloseProps={{
					...iconCloseProps,
					...iconClosePropsData,
				}}
				titleStyle={ [
					titleStyle,
					titleStyleProp,
				] }
				leftBarStyle={ [
					leftBarStyle,
					leftBarStyleProp,
				] }
				style={ [
					style,
					styleProp,
				] }
				ref={ ref }
			/>
		)

	},
)
