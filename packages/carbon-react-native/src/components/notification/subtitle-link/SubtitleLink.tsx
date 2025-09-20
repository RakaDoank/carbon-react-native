import {
	forwardRef,
	useContext,
} from 'react'

import {
	CarbonStyleSheet,
} from '../../../carbon-style-sheet'

import {
	ThemeContext,
} from '../../../contexts'


import type {
	NotificationColor,
} from '../NotificationColor'

import {
	VariantContext,
} from '../_variant-context'
import {
	Subtitle,
} from '../subtitle'

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

		useContext(ThemeContext)

		const
			variantContext =
				useContext(VariantContext)

		return (
			<Subtitle
				{ ...props }
				ref={ ref }
				style={ [
					mapTextColorStyle[variantContext.color],
					style,
				] }
			/>
		)

	},
)

const
	mapTextColorStyle =
		CarbonStyleSheet.create<Record<NotificationColor, {
			color: string
		}>>({
			low_contrast: {
				color: CarbonStyleSheet.color.link_primary,
			},
			high_contrast: {
				color: CarbonStyleSheet.color.link_inverse,
			},
		})
