import {
	forwardRef,
} from 'react'

import {
	useError,
} from '../../_status-hooks'

import {
	ActionableInlineVariant,
	type ActionableInlineVariantProps,
	type ActionableInlineVariantRef,
} from '../../_variants'

export interface ErrorProps extends Omit<ActionableInlineVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<ActionableInlineVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<ActionableInlineVariantProps['iconCloseProps']>,
		| 'color'
	>,
}

export interface ErrorRef extends ActionableInlineVariantRef {
}

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
			icon,
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
