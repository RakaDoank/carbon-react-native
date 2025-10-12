import {
	forwardRef,
} from 'react'

import {
	useSuccess,
} from '../../_status-hooks'

import {
	CalloutVariant,
} from '../../_variants'

import type {
	SuccessProps,
} from './SuccessProps'

import type {
	SuccessRef,
} from './SuccessRef'

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
			Icon,
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
				Icon={ Icon }
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
