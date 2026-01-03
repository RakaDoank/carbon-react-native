import {
	forwardRef,
} from "react"

import {
	useInformational,
} from "../../_status-hooks"

import {
	CalloutVariant,
} from "../../_variants"

import type {
	InformationalProps,
} from "./InformationalProps"

import type {
	InformationalRef,
} from "./InformationalRef"

export const Informational = forwardRef<InformationalRef, InformationalProps>(
	function Informational(
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
			useInformational({
				color,
				transparentBorderColor: true,
			})

		return (
			<CalloutVariant
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
