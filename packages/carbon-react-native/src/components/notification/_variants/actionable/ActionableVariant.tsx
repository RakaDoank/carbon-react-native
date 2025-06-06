import {
	forwardRef,
} from 'react'

import {
	Base,
} from '../../base'

import {
	Subtitle,
} from '../../subtitle'

import {
	VariantContextProvider,
} from '../../_VariantContextProvider'

import {
	ButtonTertiary,
} from '../_ButtonTertiary'

import type {
	ActionableVariantProps,
} from './ActionableVariantProps'

import type {
	ActionableVariantRef,
} from './ActionableVariantRef'

export const ActionableVariant = forwardRef<ActionableVariantRef, ActionableVariantProps>(
	function ActionableVariant(
		{
			color,
			icon,
			subtitle,
			subtitleStyle,
			buttonProps,
			...props
		},
		ref,
	) {

		return (
			<VariantContextProvider color={ color }>
				<Base
					{ ...props }
					inline={ false }
					icon={ icon }
					iconClose
					body={
						subtitle && (typeof subtitle === 'string' || typeof subtitle === 'number') ? (
							<Subtitle style={ subtitleStyle }>
								{ subtitle }
							</Subtitle>
						) : subtitle
					}
					nodes={{
						beforeContentContainerEnd: buttonProps ? (
							<ButtonTertiary
								{ ...buttonProps }
							/>
						) : undefined,
					}}
					ref={ ref }
				/>
			</VariantContextProvider>
		)

	},

)
