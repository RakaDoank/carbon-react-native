import {
	forwardRef,
} from 'react'

import {
	Base,
	type BaseProps,
	type BaseRef,
} from '../../base'

import {
	Subtitle,
	type SubtitleProps,
} from '../../subtitle'

import type {
	NotificationColor,
} from '../../types'

import {
	VariantContextProvider,
} from '../../_variant-context'

export interface CalloutInlineVariantProps extends Omit<
	BaseProps,
	| 'inline'
	| 'body'
	| 'icon'
	| 'iconClose'
	| 'nodes'
	| 'leftContainerStyle'
> {
	color?: NotificationColor,
	icon: NonNullable<BaseProps['icon']>,
	subtitle: React.ReactNode,
	subtitleStyle?: SubtitleProps['style'],
}

export interface CalloutInlineVariantRef extends BaseRef {
}

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
