import {
	forwardRef,
} from "react"

import {
	useWarning,
} from "../../_status-hooks"

import {
	ActionableInlineVariant,
} from "../../_variants"

import type {
	WarningProps,
} from "./WarningProps"

import type {
	WarningRef,
} from "./WarningRef"

export const Warning = forwardRef<WarningRef, WarningProps>(
	function Warning(
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
			useWarning({
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
