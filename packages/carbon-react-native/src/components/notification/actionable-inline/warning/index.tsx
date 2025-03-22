import {
	forwardRef,
} from 'react'

import {
	useWarning,
} from '../../_status-hooks'

import {
	ActionableInlineVariant,
	type ActionableInlineVariantProps,
	type ActionableInlineVariantRef,
} from '../../_variants'

export interface WarningProps extends Omit<ActionableInlineVariantProps, 'icon'> {
	iconProps?: Omit<
		NonNullable<ActionableInlineVariantProps['iconProps']>,
		| 'color'
	>,
	iconCloseProps?: Omit<
		NonNullable<ActionableInlineVariantProps['iconCloseProps']>,
		| 'color'
	>,
}

export interface WarningRef extends ActionableInlineVariantRef {
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
