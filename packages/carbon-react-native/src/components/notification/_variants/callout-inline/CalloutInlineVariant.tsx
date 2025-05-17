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

import type {
	CalloutInlineVariantProps,
} from './CalloutInlineVariantProps'

import type {
	CalloutInlineVariantRef,
} from './CalloutInlineVariantRef'

export const CalloutInlineVariant = forwardRef<CalloutInlineVariantRef, CalloutInlineVariantProps>(
	function CalloutInlineVariant(
		{
			color,
			icon,
			subtitle,
			subtitleStyle,
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
					iconClose={ false }
					body={
						subtitle && (typeof subtitle === 'string' || typeof subtitle === 'number') ? (
							<Subtitle style={ subtitleStyle }>
								{ subtitle }
							</Subtitle>
						) : subtitle
					}
					nodes={ undefined }
					ref={ ref }
				/>
			</VariantContextProvider>
		)

	},

)
