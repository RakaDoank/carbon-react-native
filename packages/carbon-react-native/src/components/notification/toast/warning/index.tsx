import {
	forwardRef,
} from 'react'

import {
	useWarning,
} from '../../_status-hooks'

import {
	ToastVariant,
	type ToastVariantProps,
	type ToastVariantRef,
} from '../../_variants'

export interface WarningProps extends Omit<ToastVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<ToastVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<ToastVariantProps['iconCloseProps']>,
		| 'color'
	>,
}

export interface WarningRef extends ToastVariantRef {
}

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
			icon,
			iconProps: iconPropsData,
			iconCloseProps: iconClosePropsData,
			titleStyle,
			leftBarStyle,
			style,
		} =
			useWarning({
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
