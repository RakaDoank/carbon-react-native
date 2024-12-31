import {
	forwardRef,
} from 'react'

import {
	useSuccess,
} from '../../_status-hooks'

import {
	CalloutVariant,
	type CalloutVariantProps,
	type CalloutVariantRef,
} from '../../_variants'

export interface SuccessProps extends Omit<CalloutVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<CalloutVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<CalloutVariantProps['iconCloseProps']>,
		| 'color'
	>,
}

export interface SuccessRef extends CalloutVariantRef {
}

export const Success = forwardRef<SuccessRef, SuccessProps>(
	function Success(
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
			useSuccess({
				color,
				transparentBorderColor: true,
			})

		return (
			<CalloutVariant
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
