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
	CalloutVariantProps,
} from './CalloutVariantProps'

import type {
	CalloutVariantRef,
} from './CalloutVariantRef'

export const CalloutVariant = forwardRef<CalloutVariantRef, CalloutVariantProps>(
	function CalloutVariant(
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
					inline={ false }
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
