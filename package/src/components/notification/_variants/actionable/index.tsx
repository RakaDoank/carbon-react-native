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
	ButtonTertiary,
	type ButtonTertiaryProps,
} from '../_button-tertiary'

export interface ActionableVariantProps extends Omit<
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
	 * <Notification.Actionable.Informational
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
	buttonProps?: Omit<ButtonTertiaryProps, 'color'>,
	subtitle: React.ReactNode,
	subtitleStyle?: SubtitleProps['style'],
}

export interface ActionableVariantRef extends BaseRef {
}

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
