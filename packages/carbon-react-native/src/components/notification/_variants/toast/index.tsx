import {
	forwardRef,
} from 'react'

import {
	StyleSheet,
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

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

export interface ToastVariantProps extends Omit<
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
	 * Override timestamp text with this prop
	 */
	timestamp?: string,
	subtitle: React.ReactNode,
	subtitleStyle?: SubtitleProps['style'],
}

export interface ToastVariantRef extends BaseRef {
}

export const ToastVariant = forwardRef<ToastVariantRef, ToastVariantProps>(
	function ToastVariant(
		{
			color,
			icon,
			timestamp,
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
						beforeContentContainerEnd: timestamp ? (
							<Subtitle style={ baseStyle.timestamp }>
								{ timestamp }
							</Subtitle>
						) : (
							<Timestamp/>
						),
					}}
					ref={ ref }
				/>
			</VariantContextProvider>
		)

	},

)

const
	baseStyle =
		StyleSheet.create({
			timestamp: {
				marginTop: Spacing.spacing_06,
			},
		})

interface TimestampProps extends Omit<SubtitleProps, 'children'> {
}

function Timestamp({
	style,
	...props
}: TimestampProps) {

	return (
		<Subtitle
			{ ...props }
			style={ [
				baseStyle.timestamp,
				style,
			] }
		>
			{ new Date().toLocaleString(
				'en-US',
				{
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					hour12: true,
				},
			) }
		</Subtitle>
	)

}
