import {
	useContext,
} from 'react'

import {
	StyleSheet,
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	ThemeProvider,
	type ThemeProviderProps,
} from '../../../providers'

import {
	Tertiary,
	type TertiaryProps,
} from '../../button/tertiary'

import type {
	NotificationColor,
} from '../types'

import {
	VariantContext,
} from '../_variant-context'

export interface ButtonTertiaryProps extends TertiaryProps {
}

export function ButtonTertiary({
	size = 'small',
	style,
	...props
}: ButtonTertiaryProps) {

	const variantContext = useContext(VariantContext)

	return (
		/**
		 * I don't know, is this a bad idea to nest the provider?
		 */
		<ThemeProvider colorScheme={ mapColorScheme[variantContext.color] }>
			<Tertiary
				{ ...props }
				size={ size }
				style={ [
					baseStyle.buttonTertiary,
					style,
				] }
			/>
		</ThemeProvider>
	)

}

const
	baseStyle =
		StyleSheet.create({
			buttonTertiary: {
				marginTop: Spacing.spacing_06,
				paddingRight: Spacing.spacing_05,
			},
		}),

	mapColorScheme: Record<NotificationColor, ThemeProviderProps['colorScheme']> =
		{
			low_contrast: 'gray_10',
			high_contrast: 'gray_100',
		}
