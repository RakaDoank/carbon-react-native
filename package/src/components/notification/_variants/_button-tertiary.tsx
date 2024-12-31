import {
	StyleSheet,
} from 'react-native'

import {
	SpacingConstant,
} from '../../../constants'

import {
	ThemeContextProvider,
	type ThemeContextProviderProps,
} from '../../../contexts/theme/provider'

import {
	Tertiary,
	type TertiaryProps,
} from '../../button/tertiary'

import type {
	NotificationColor,
} from '../types'

export interface ButtonTertiaryProps extends TertiaryProps {
	color: NotificationColor,
}

export function ButtonTertiary({
	color,
	size = 'small',
	style,
	...props
}: ButtonTertiaryProps) {

	return (
		/**
		 * I don't know, is this a bad idea to nest the provider?
		 */
		<ThemeContextProvider colorScheme={ mapColorScheme[color] }>
			<Tertiary
				{ ...props }
				size={ size }
				style={ [
					baseStyle.buttonTertiary,
					style,
				] }
			/>
		</ThemeContextProvider>
	)

}

const
	baseStyle =
		StyleSheet.create({
			buttonTertiary: {
				marginTop: SpacingConstant.spacing_06,
				paddingRight: SpacingConstant.spacing_05,
			},
		}),

	mapColorScheme: Record<NotificationColor, ThemeContextProviderProps['colorScheme']> =
		{
			low_contrast: 'gray_10',
			high_contrast: 'gray_100',
		}
