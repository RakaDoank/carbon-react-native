import {
	forwardRef,
} from 'react'

import {
	VariantContextProvider,
} from '../../_VariantContextProvider'

import {
	Base,
} from '../../base'

import {
	Subtitle,
} from '../../subtitle'

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
			Icon,
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
					Icon={ Icon }
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
