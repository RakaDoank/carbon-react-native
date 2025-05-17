import {
	forwardRef,
} from 'react'

import {
	useError,
} from '../../_status-hooks'

import {
	CalloutInlineVariant,
} from '../../_variants'

import type {
	ErrorProps,
} from './ErrorProps'

import type {
	ErrorRef,
} from './ErrorRef'

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
