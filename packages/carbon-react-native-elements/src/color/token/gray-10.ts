import type {
	ColorToken,
} from '../../types'

import * as code from '../code'

import {
	hexToRgba,
} from './_hex-to-rgba'

export const background = code.gray_10
export const background_hover = hexToRgba(code.gray_50, '0.12')
export const background_active = hexToRgba(code.gray_50, '0.5')
export const background_selected = hexToRgba(code.gray_50, '0.2')
export const background_selected_hover = hexToRgba(code.gray_50, '0.32')
export const background_inverse = code.gray_80
export const background_inverse_hover = code.gray_80_hover
export const background_brand = code.blue_60

export const layer_01 = code.white
export const layer_02 = code.gray_10
export const layer_03 = code.white
export const layer_hover_01 = code.gray_10_hover
export const layer_hover_02 = code.gray_10_hover
export const layer_hover_03 = code.gray_10_hover
export const layer_active_01 = code.gray_30
export const layer_active_02 = code.gray_30
export const layer_active_03 = code.gray_30
export const layer_selected_01 = code.gray_20
export const layer_selected_02 = code.gray_20
export const layer_selected_03 = code.gray_20
export const layer_selected_hover_01 = code.gray_20_hover
export const layer_selected_hover_02 = code.gray_20_hover
export const layer_selected_hover_03 = code.gray_20_hover
export const layer_selected_inverse = code.gray_100
export const layer_selected_disabled = code.gray_50

export const layer_accent_01 = code.gray_20
export const layer_accent_02 = code.gray_20
export const layer_accent_03 = code.gray_20
export const layer_accent_hover_01 = code.gray_20_hover
export const layer_accent_hover_02 = code.gray_20_hover
export const layer_accent_hover_03 = code.gray_20_hover
export const layer_accent_active_01 = code.gray_40
export const layer_accent_active_02 = code.gray_40
export const layer_accent_active_03 = code.gray_40

export const field_01 = code.white
export const field_02 = code.gray_10
export const field_03 = code.white
export const field_hover_01 = code.gray_10_hover
export const field_hover_02 = code.gray_10_hover
export const field_hover_03 = code.gray_10_hover

export const border_interactive = code.blue_60
export const border_subtle_00 = code.gray_30
export const border_subtle_01 = code.gray_20
export const border_subtle_02 = code.gray_30
export const border_subtle_03 = code.gray_20
export const border_subtle_selected_01 = code.gray_30
export const border_subtle_selected_02 = code.gray_30
export const border_subtle_selected_03 = code.gray_30
export const border_strong_01 = code.gray_50
export const border_strong_02 = code.gray_50
export const border_strong_03 = code.gray_50
export const border_tile_01 = code.gray_40
export const border_tile_02 = code.gray_30
export const border_tile_03 = code.gray_40
export const border_inverse = code.gray_100
export const border_disabled = code.gray_30

export const text_primary = code.gray_100
export const text_secondary = code.gray_70
export const text_placeholder = code.gray_40
export const text_on_color = code.white
export const text_on_color_disabled = code.gray_50
export const text_helper = code.gray_60
export const text_error = code.red_60
export const text_inverse = code.white
export const text_disabled = hexToRgba(code.gray_100, '0.25')

export const link_primary = code.blue_60
export const link_primary_hover = code.blue_70
export const link_secondary = code.blue_70
export const link_inverse = code.blue_40
export const link_inverse_hover = code.blue_30
export const link_inverse_active = code.gray_10
export const link_inverse_visited = code.purple_40
export const link_visited = code.purple_60

export const icon_primary = code.gray_100
export const icon_secondary = code.gray_70
export const icon_on_color = code.white
export const icon_on_color_disabled = code.gray_50
export const icon_interactive = code.blue_60
export const icon_inverse = code.white
export const icon_disabled = hexToRgba(code.gray_100, '0.25')

export const support_error = code.red_60
export const support_success = code.green_50
export const support_warning = code.yellow_30
export const support_info = code.blue_70
export const support_error_inverse = code.red_50
export const support_success_inverse = code.green_40
export const support_warning_inverse = code.yellow_30
export const support_info_inverse = code.blue_50
export const support_caution_minor = code.yellow_30
export const support_caution_major = code.orange_40
export const support_caution_undefined = code.purple_60

export const focus = code.blue_60
export const focus_inset = code.white
export const focus_inverse = code.white

export const interactive = code.blue_60
export const highlight = code.blue_20
export const toggle_off = code.gray_50
export const overlay = hexToRgba(code.gray_100, '0.5')
export const skeleton_element = code.gray_30
export const skeleton_background = code.gray_10_hover

export const button_primary = code.blue_60
export const button_primary_hover = code.blue_60_hover
export const button_primary_active = code.blue_80
export const button_secondary = code.gray_80
export const button_secondary_hover = code.gray_80_hover
export const button_secondary_active = code.gray_60
export const button_tertiary = code.blue_60
export const button_tertiary_hover = code.blue_60_hover
export const button_tertiary_active = code.blue_80
export const button_danger_primary = code.red_60
export const button_danger_secondary = code.red_60
export const button_danger_hover = code.red_60_hover
export const button_danger_active = code.red_80
export const button_separator = code.gray_20
export const button_disabled = code.gray_30

export const tag_background_gray = code.gray_20
export const tag_color_gray = code.gray_100
export const tag_hover_gray = code.gray_20_hover
export const tag_border_gray = code.gray_40
export const tag_background_cool_gray = code.cool_gray_20
export const tag_color_cool_gray = code.cool_gray_100
export const tag_hover_cool_gray = code.cool_gray_20_hover
export const tag_border_cool_gray = code.cool_gray_40
export const tag_background_warm_gray = code.warm_gray_20
export const tag_color_warm_gray = code.warm_gray_100
export const tag_hover_warm_gray = code.warm_gray_20_hover
export const tag_border_warm_gray = code.warm_gray_40
export const tag_background_red = code.red_20
export const tag_color_red = code.red_70
export const tag_hover_red = code.red_20_hover
export const tag_border_red = code.red_40
export const tag_background_magenta = code.magenta_20
export const tag_color_magenta = code.magenta_70
export const tag_hover_magenta = code.magenta_20_hover
export const tag_border_magenta = code.magenta_40
export const tag_background_purple = code.purple_20
export const tag_color_purple = code.purple_70
export const tag_hover_purple = code.purple_20_hover
export const tag_border_purple = code.purple_40
export const tag_background_blue = code.blue_20
export const tag_color_blue = code.blue_70
export const tag_hover_blue = code.blue_20_hover
export const tag_border_blue = code.blue_40
export const tag_background_cyan = code.cyan_20
export const tag_color_cyan = code.cyan_70
export const tag_hover_cyan = code.cyan_20_hover
export const tag_border_cyan = code.cyan_40
export const tag_background_teal = code.teal_20
export const tag_color_teal = code.teal_70
export const tag_hover_teal = code.teal_20_hover
export const tag_border_teal = code.teal_40
export const tag_background_green = code.green_20
export const tag_color_green = code.green_70
export const tag_hover_green = code.green_20_hover
export const tag_border_green = code.green_40

export const notification_info_background = code.blue_10
export const notification_info_border = hexToRgba(code.blue_70, '0.3')
export const notification_error_background = code.red_10
export const notification_error_border = hexToRgba(code.red_60, '0.3')
export const notification_success_background = code.green_10
export const notification_success_border = hexToRgba(code.green_50, '0.3')
export const notification_warning_background = code.yellow_10
export const notification_warning_border = hexToRgba(code.yellow_30, '0.3')

export const notification_action_hover = code.white
export const notification_action_tertiary_inverse = code.white
export const notification_action_tertiary_inverse_active = code.white
export const notification_action_tertiary_inverse_hover = code.gray_30
export const notification_action_tertiary_inverse_text = code.gray_100
export const notification_action_tertiary_inverse_text_on_color_disabled = code.white

/**
 * Expose all members to support `ThemeContext.color`
 */
export const all = {
	background,
	background_hover,
	background_active,
	background_selected,
	background_selected_hover,
	background_inverse,
	background_inverse_hover,
	background_brand,

	layer_01,
	layer_02,
	layer_03,
	layer_hover_01,
	layer_hover_02,
	layer_hover_03,
	layer_active_01,
	layer_active_02,
	layer_active_03,
	layer_selected_01,
	layer_selected_02,
	layer_selected_03,
	layer_selected_hover_01,
	layer_selected_hover_02,
	layer_selected_hover_03,
	layer_selected_inverse,
	layer_selected_disabled,

	layer_accent_01,
	layer_accent_02,
	layer_accent_03,
	layer_accent_hover_01,
	layer_accent_hover_02,
	layer_accent_hover_03,
	layer_accent_active_01,
	layer_accent_active_02,
	layer_accent_active_03,

	field_01,
	field_02,
	field_03,
	field_hover_01,
	field_hover_02,
	field_hover_03,

	border_interactive,
	border_subtle_00,
	border_subtle_01,
	border_subtle_02,
	border_subtle_03,
	border_subtle_selected_01,
	border_subtle_selected_02,
	border_subtle_selected_03,
	border_strong_01,
	border_strong_02,
	border_strong_03,
	border_tile_01,
	border_tile_02,
	border_tile_03,
	border_inverse,
	border_disabled,

	text_primary,
	text_secondary,
	text_placeholder,
	text_on_color,
	text_on_color_disabled,
	text_helper,
	text_error,
	text_inverse,
	text_disabled,

	link_primary,
	link_primary_hover,
	link_secondary,
	link_inverse,
	link_inverse_hover,
	link_inverse_active,
	link_inverse_visited,
	link_visited,

	icon_primary,
	icon_secondary,
	icon_on_color,
	icon_on_color_disabled,
	icon_interactive,
	icon_inverse,
	icon_disabled,

	support_error,
	support_success,
	support_warning,
	support_info,
	support_error_inverse,
	support_success_inverse,
	support_warning_inverse,
	support_info_inverse,
	support_caution_minor,
	support_caution_major,
	support_caution_undefined,

	focus,
	focus_inset,
	focus_inverse,

	interactive,
	highlight,
	toggle_off,
	overlay,
	skeleton_element,
	skeleton_background,

	button_primary,
	button_primary_hover,
	button_primary_active,
	button_secondary,
	button_secondary_hover,
	button_secondary_active,
	button_tertiary,
	button_tertiary_hover,
	button_tertiary_active,
	button_danger_primary,
	button_danger_secondary,
	button_danger_hover,
	button_danger_active,
	button_separator,
	button_disabled,

	tag_background_gray,
	tag_color_gray,
	tag_hover_gray,
	tag_border_gray,
	tag_background_cool_gray,
	tag_color_cool_gray,
	tag_hover_cool_gray,
	tag_border_cool_gray,
	tag_background_warm_gray,
	tag_color_warm_gray,
	tag_hover_warm_gray,
	tag_border_warm_gray,
	tag_background_red,
	tag_color_red,
	tag_hover_red,
	tag_border_red,
	tag_background_magenta,
	tag_color_magenta,
	tag_hover_magenta,
	tag_border_magenta,
	tag_background_purple,
	tag_color_purple,
	tag_hover_purple,
	tag_border_purple,
	tag_background_blue,
	tag_color_blue,
	tag_hover_blue,
	tag_border_blue,
	tag_background_cyan,
	tag_color_cyan,
	tag_hover_cyan,
	tag_border_cyan,
	tag_background_teal,
	tag_color_teal,
	tag_hover_teal,
	tag_border_teal,
	tag_background_green,
	tag_color_green,
	tag_hover_green,
	tag_border_green,

	notification_info_background,
	notification_info_border,
	notification_error_background,
	notification_error_border,
	notification_success_background,
	notification_success_border,
	notification_warning_background,
	notification_warning_border,

	notification_action_hover,
	notification_action_tertiary_inverse,
	notification_action_tertiary_inverse_active,
	notification_action_tertiary_inverse_hover,
	notification_action_tertiary_inverse_text,
	notification_action_tertiary_inverse_text_on_color_disabled,
} as const satisfies Record<ColorToken, string>
