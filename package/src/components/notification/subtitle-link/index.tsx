import {
	useContext,
} from 'react'

import type * as GRAY_10 from '../../../constants/color/tokens/gray-10'

import {
	ThemeContext,
} from '../../../contexts'

import {
	Subtitle,
	type SubtitleProps,
} from '../subtitle'

import type {
	NotificationColor,
} from '../types'

import {
	VariantContext,
} from '../_variant-context'

export interface SubtitleLinkProps extends SubtitleProps {
}

export function SubtitleLink({
	style,
	...props
}: SubtitleLinkProps) {

	const
		themeContext =
			useContext(ThemeContext),

		variantContext =
			useContext(VariantContext)

	return (
		<Subtitle
			{ ...props }
			style={ [
				{ color: themeContext.color[mapTextColor[variantContext.color]] },
				style,
			] }
		/>
	)

}

const mapTextColor: Record<NotificationColor, keyof typeof GRAY_10> =
	{
		low_contrast: 'link_primary',
		high_contrast: 'link_inverse',
	}
