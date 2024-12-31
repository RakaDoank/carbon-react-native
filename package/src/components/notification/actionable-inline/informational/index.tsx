import {
	forwardRef,
} from 'react'

import {
	useInformational,
} from '../../_status-hooks'

import {
	ActionableInlineVariant,
	type ActionableInlineVariantProps,
	type ActionableInlineVariantRef,
} from '../../_variants'

export interface InformationalProps extends Omit<ActionableInlineVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<ActionableInlineVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<ActionableInlineVariantProps['iconCloseProps']>,
		| 'color'
	>,
}

export interface InformationalRef extends ActionableInlineVariantRef {
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
			<ActionableInlineVariant
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
