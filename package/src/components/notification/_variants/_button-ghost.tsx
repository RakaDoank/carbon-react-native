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
	Ghost,
	type GhostProps,
} from '../../button/ghost'

import type {
	NotificationColor,
} from '../types'

export interface ButtonGhostProps extends GhostProps {
	color: NotificationColor,
}

export function ButtonGhost({
	color,
	size = 'small',
	style,
	...props
}: ButtonGhostProps) {

	return (
		/**
		 * I don't know, is this a bad idea to nest the provider?
		 */
		<ThemeContextProvider colorScheme={ mapColorScheme[color] }>
			<Ghost
				{ ...props }
				size={ size }
				style={ [
					baseStyle.buttonGhost,
					style,
				] }
			/>
		</ThemeContextProvider>
	)

}

const
	baseStyle =
		StyleSheet.create({
			buttonGhost: {
				marginTop: SpacingConstant.spacing_03,
				paddingRight: SpacingConstant.spacing_05,
			},
		}),

	mapColorScheme: Record<NotificationColor, ThemeContextProviderProps['colorScheme']> =
		{
			low_contrast: 'gray_10',
			high_contrast: 'gray_100',
		}
