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

		useContext(ThemeContext)

		const
			variantContext =
				useContext(VariantContext)

		return (
			<Text
				{ ...props }
				ref={ ref }
				type="body_compact_01"
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
				color: StyleSheet.color.text_primary,
			},
			high_contrast: {
				color: StyleSheet.color.text_inverse,
			},
		})
