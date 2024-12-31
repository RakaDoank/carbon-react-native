import {
	forwardRef,
} from 'react'

import {
	useError,
} from '../../_status-hooks'

import {
	ActionableVariant,
	type ActionableVariantProps,
	type ActionableVariantRef,
} from '../../_variants'

export interface ErrorProps extends Omit<ActionableVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<ActionableVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<ActionableVariantProps['iconCloseProps']>,
		| 'color'
	>,
}

export interface ErrorRef extends ActionableVariantRef {
}

export const Error = forwardRef<ActionableVariantRef, ErrorProps>(
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
			icon,
			iconProps: iconPropsData,
			iconCloseProps: iconClosePropsData,
			titleStyle,
			leftBarStyle,
			style,
		} =
			useError({
				color,
				transparentBorderColor: true,
			})

		return (
			<ActionableVariant
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
