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

import {
	ButtonGhost,
	type ButtonGhostProps,
} from '../_button-ghost'

export interface ActionableInlineVariantProps extends Omit<
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
	/**
	 * Fill the button prop to render an button action in the notification component  
	 * Props are similar like you're calling an button component `<Button.Ghost text="button"/>`, just without the JSX
	 * @example
	 * <Notification.ActionableInline.Informational
	 * 	title="Title goes here"
	 * 	subtitle="Subtitle goes here"
	 * 	buttonProps={{
	 * 		text: 'Action',
	 * 		onPress: event => {
	 * 			// your function
	 * 		},
	 * 	}}
	 * />
	 */
	buttonProps?: Omit<ButtonGhostProps, 'color'>,
	subtitle: React.ReactNode,
	subtitleStyle?: SubtitleProps['style'],
}

export interface ActionableInlineVariantRef extends BaseRef {
}

export const ActionableInlineVariant = forwardRef<ActionableInlineVariantRef, ActionableInlineVariantProps>(
	function ActionableInlineVariant(
		{
			color = 'high_contrast',
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
								color={ color }
							/>
						) : undefined,
					}}
					ref={ ref }
				/>
			</VariantContextProvider>
		)

	},

)
