import {
	forwardRef,
} from 'react'

import {
	useError,
} from '../../_status-hooks'

import {
	ToastVariant,
	type ToastVariantProps,
	type ToastVariantRef,
} from '../../_variants'

export interface ErrorProps extends Omit<ToastVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<ToastVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<ToastVariantProps['iconCloseProps']>,
		| 'color'
	>,
}

export interface ErrorRef extends ToastVariantRef {
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
				transparentBorderColor: true,
			})

		return (
			<ToastVariant
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
