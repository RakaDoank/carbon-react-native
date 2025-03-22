import {
	forwardRef,
} from 'react'

import {
	useInformational,
} from '../../_status-hooks'

import {
	ToastVariant,
	type ToastVariantProps,
	type ToastVariantRef,
} from '../../_variants'

export interface InformationalProps extends Omit<ToastVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<ToastVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<ToastVariantProps['iconCloseProps']>,
		| 'color'
	>,
}

export interface InformationalRef extends ToastVariantRef {
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
