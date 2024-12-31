import {
	forwardRef,
} from 'react'

import {
	useInformational,
} from '../../_status-hooks'

import {
	CalloutInlineVariant,
	type CalloutInlineVariantProps,
	type CalloutInlineVariantRef,
} from '../../_variants'

export interface InformationalProps extends Omit<CalloutInlineVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<CalloutInlineVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<CalloutInlineVariantProps['iconCloseProps']>,
		| 'color'
	>,
}

export interface InformationalRef extends CalloutInlineVariantRef {
}

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
			icon,
			iconProps: iconPropsData,
			iconCloseProps: iconClosePropsData,
			titleStyle,
			leftBarStyle,
			style,
		} =
			useInformational({
				color,
			})

		return (
			<CalloutInlineVariant
				{ ...props }
				color={ color }
				icon={ icon }
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
