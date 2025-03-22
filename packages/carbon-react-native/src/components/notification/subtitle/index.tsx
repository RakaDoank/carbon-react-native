import {
	useContext,
} from 'react'

import type {
	ColorToken,
} from '@audira/carbon-react-native-elements'

import {
	ThemeContext,
} from '../../../contexts'

import {
	Text,
	type TextProps,
} from '../../text'

import type {
	NotificationColor,
} from '../types'

import {
	VariantContext,
} from '../_variant-context'

export interface SubtitleProps extends Omit<TextProps, 'type'> {
}

export function Subtitle({
	style,
	...props
}: SubtitleProps) {

	const
		themeContext =
			useContext(ThemeContext),

		variantContext =
			useContext(VariantContext)

	return (
		<Text
			{ ...props }
			type="body_compact_01"
			style={ [
				{ color: themeContext.color[mapTextColor[variantContext.color]] },
				style,
			] }
		/>
	)

}

const mapTextColor: Record<NotificationColor, ColorToken> =
	{
		low_contrast: 'text_primary',
		high_contrast: 'text_inverse',
	}
