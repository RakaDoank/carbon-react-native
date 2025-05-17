import {
	forwardRef,
	useContext,
} from 'react'

import type {
	ColorToken,
} from '@audira/carbon-react-native-elements'

import {
	ThemeContext,
} from '../../../contexts'

import {
	Subtitle,
} from '../subtitle'

import type {
	NotificationColor,
} from '../NotificationColor'

import {
	VariantContext,
} from '../_variant-context'

import type {
	SubtitleLinkProps,
} from './SubtitleLinkProps'

import type {
	SubtitleLinkRef,
} from './SubtitleLinkRef'

export const SubtitleLink = forwardRef<SubtitleLinkRef, SubtitleLinkProps>(
	function SubtitleLink(
		{
			style,
			...props
		},
		ref,
	) {

		const
			themeContext =
				useContext(ThemeContext),

			variantContext =
				useContext(VariantContext)

		return (
			<Subtitle
				{ ...props }
				ref={ ref }
				style={ [
					{ color: themeContext.color[mapTextColor[variantContext.color]] },
					style,
				] }
			/>
		)

	},
)

const mapTextColor: Record<NotificationColor, ColorToken> =
	{
		low_contrast: 'link_primary',
		high_contrast: 'link_inverse',
	}
