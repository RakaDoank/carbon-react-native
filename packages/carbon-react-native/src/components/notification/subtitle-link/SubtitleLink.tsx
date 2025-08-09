import {
	forwardRef,
	useContext,
} from 'react'

import {
	StyleSheet,
} from '../../../_style-sheet'

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
		StyleSheet.create<Record<NotificationColor, { color: string }>>({
			low_contrast: {
				color: StyleSheet.color.link_primary,
			},
			high_contrast: {
				color: StyleSheet.color.link_inverse,
			},
		})
