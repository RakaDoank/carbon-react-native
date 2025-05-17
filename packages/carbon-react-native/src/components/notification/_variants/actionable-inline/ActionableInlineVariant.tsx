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
	ButtonGhost,
} from '../_ButtonGhost'

import type {
	ActionableInlineVariantProps,
} from './ActionableInlineVariantProps'

import type {
	ActionableInlineVariantRef,
} from './ActionableInlineVariantRef'

export const ActionableInlineVariant = forwardRef<ActionableInlineVariantRef, ActionableInlineVariantProps>(
	function ActionableInlineVariant(
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
					inline
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
						beforeButtonClose: buttonProps ? (
							<ButtonGhost
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
