import {
	useContext,
} from 'react'

import {
	ThemeContext,
} from '../../../contexts'

import type {
	ThemeType,
} from '../../../types'

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

const mapTextColor: Record<NotificationColor, ThemeType.ColorToken> =
	{
		low_contrast: 'text_primary',
		high_contrast: 'text_inverse',
	}
