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
	Text,
} from '../../text'

import type {
	NotificationColor,
} from '../NotificationColor'

import {
	VariantContext,
} from '../_variant-context'

import type {
	SubtitleProps,
} from './SubtitleProps'

import type {
	SubtitleRef,
} from './SubtitleRef'

export const Subtitle = forwardRef<SubtitleRef, SubtitleProps>(
	function Subtitle(
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
			<Text
				{ ...props }
				ref={ ref }
				type="body_compact_01"
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
		low_contrast: 'text_primary',
		high_contrast: 'text_inverse',
	}
