import {
	forwardRef,
} from 'react'

import {
	useWarning,
} from '../../_status-hooks'

import {
	CalloutVariant,
	type CalloutVariantProps,
	type CalloutVariantRef,
} from '../../_variants'

export interface WarningProps extends Omit<CalloutVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<CalloutVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<CalloutVariantProps['iconCloseProps']>,
		| 'color'
	>,
}

export interface WarningRef extends CalloutVariantRef {
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
