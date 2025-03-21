import {
	hexToRgba,
} from '../../../helpers/color/hex-to-rgba'

import type {
	ThemeType,
} from '../../../types'

import code from '../code.json'

export const gray_100 = {

	background: code.black,
	background_hover: hexToRgba(code.gray_50, '0.16'),
	background_active: hexToRgba(code.gray_50, '0.4'),
	background_selected: hexToRgba(code.gray_50, '0.24'),
	background_selected_hover: hexToRgba(code.gray_50, '0.32'),
	background_inverse: code.gray_10,
	background_inverse_hover: code.gray_10_hover,
	background_brand: code.blue_60,

	layer_01: code.gray_90,
	layer_02: code.gray_80,
	layer_03: code.gray_70,
	layer_hover_01: code.gray_90_hover,
	layer_hover_02: code.gray_80_hover,
	layer_hover_03: code.gray_70_hover,
	layer_active_01: code.gray_70,
	layer_active_02: code.gray_60,
	layer_active_03: code.gray_50,
	layer_selected_01: code.gray_80,
	layer_selected_02: code.gray_70,
	layer_selected_03: code.gray_60,
	layer_selected_hover_01: code.gray_80_hover,
	layer_selected_hover_02: code.gray_70_hover,
	layer_selected_hover_03: code.gray_60_hover,
	layer_selected_inverse: code.gray_10,
	layer_selected_disabled: code.gray_60,

	layer_accent_01: code.gray_80,
	layer_accent_02: code.gray_70,
	layer_accent_03: code.gray_60,
	layer_accent_hover_01: code.gray_80_hover,
	layer_accent_hover_02: code.gray_70_hover,
	layer_accent_hover_03: code.gray_60_hover,
	layer_accent_active_01: code.gray_70,
	layer_accent_active_02: code.gray_50,
	layer_accent_active_03: code.gray_80,

	field_01: code.gray_90,
	field_02: code.gray_80,
	field_03: code.gray_70,
	field_hover_01: code.gray_90_hover,
	field_hover_02: code.gray_80_hover,
	field_hover_03: code.gray_70_hover,

	border_interactive: code.blue_50,
	border_subtle_00: code.gray_80,
	border_subtle_01: code.gray_80,
	border_subtle_02: code.gray_70,
	border_subtle_03: code.gray_60,
	border_subtle_selected_01: code.gray_70,
	border_subtle_selected_02: code.gray_60,
	border_subtle_selected_03: code.gray_50,
	border_strong_01: code.gray_60,
	border_strong_02: code.gray_50,
	border_strong_03: code.gray_40,
	border_tile_01: code.gray_70,
	border_tile_02: code.gray_60,
	border_tile_03: code.gray_50,
	border_inverse: code.gray_10,
	border_disabled: hexToRgba(code.gray_50, '0.5'),

	text_primary: code.gray_10,
	text_secondary: code.gray_30,
	text_placeholder: code.gray_60,
	text_on_color: code.white,
	text_on_color_disabled: hexToRgba(code.white, '0.25'),
	text_helper: code.gray_50,
	text_error: code.red_40,
	text_inverse: code.gray_100,
	text_disabled: hexToRgba(code.gray_10, '0.25'),

	link_primary: code.blue_40,
	link_primary_hover: code.blue_30,
	link_secondary: code.blue_30,
	link_inverse: code.blue_60,
	link_inverse_hover: code.blue_70,
	link_inverse_active: code.gray_100,
	link_inverse_visited: code.purple_60,
	link_visited: code.purple_40,

	icon_primary: code.gray_10,
	icon_secondary: code.gray_30,
	icon_on_color: code.white,
	icon_on_color_disabled: hexToRgba(code.white, '0.25'),
	icon_interactive: code.white,
	icon_inverse: code.gray_100,
	icon_disabled: hexToRgba(code.gray_10, '0.25'),

	support_error: code.red_50,
	support_success: code.green_40,
	support_warning: code.yellow_30,
	support_info: code.blue_50,
	support_error_inverse: code.red_60,
	support_success_inverse: code.green_50,
	support_warning_inverse: code.yellow_30,
	support_info_inverse: code.blue_70,
	support_caution_minor: code.yellow_30,
	support_caution_major: code.orange_40,
	support_caution_undefined: code.purple_50,

	focus: code.white,
	focus_inset: code.gray_100,
	focus_inverse: code.blue_60,

	interactive: code.blue_50,
	highlight: code.blue_90,
	toggle_off: code.gray_60,
	overlay: hexToRgba(code.gray_100, '0.7'),
	skeleton_element: code.gray_70,
	skeleton_background: code.gray_80_hover,

	button_primary: code.blue_60,
	button_primary_hover: code.blue_60_hover,
	button_primary_active: code.blue_80,
	button_secondary: code.gray_60,
	button_secondary_hover: code.gray_60_hover,
	button_secondary_active: code.gray_80,
	button_tertiary: code.white,
	button_tertiary_hover: code.gray_10,
	button_tertiary_active: code.gray_30,
	button_danger_primary: code.red_60,
	button_danger_secondary: code.red_50,
	button_danger_hover: code.red_60_hover,
	button_danger_active: code.red_80,
	button_separator: code.gray_100,
	button_disabled: code.gray_70,

	tag_background_gray: code.gray_70,
	tag_color_gray: code.gray_20,
	tag_hover_gray: code.gray_70_hover,
	tag_border_gray: code.gray_50,
	tag_background_cool_gray: code.cool_gray_70,
	tag_color_cool_gray: code.cool_gray_20,
	tag_hover_cool_gray: code.cool_gray_70_hover,
	tag_border_cool_gray: code.cool_gray_50,
	tag_background_warm_gray: code.warm_gray_70,
	tag_color_warm_gray: code.warm_gray_20,
	tag_hover_warm_gray: code.warm_gray_70_hover,
	tag_border_warm_gray: code.warm_gray_50,
	tag_background_red: code.red_70,
	tag_color_red: code.red_20,
	tag_hover_red: code.red_70_hover,
	tag_border_red: code.red_50,
	tag_background_magenta: code.magenta_70,
	tag_color_magenta: code.magenta_20,
	tag_hover_magenta: code.magenta_70_hover,
	tag_border_magenta: code.magenta_50,
	tag_background_purple: code.purple_70,
	tag_color_purple: code.purple_20,
	tag_hover_purple: code.purple_70_hover,
	tag_border_purple: code.purple_50,
	tag_background_blue: code.blue_70,
	tag_color_blue: code.blue_20,
	tag_hover_blue: code.blue_70_hover,
	tag_border_blue: code.blue_50,
	tag_background_cyan: code.cyan_70,
	tag_color_cyan: code.cyan_20,
	tag_hover_cyan: code.cyan_70_hover,
	tag_border_cyan: code.cyan_50,
	tag_background_teal: code.teal_70,
	tag_color_teal: code.teal_20,
	tag_hover_teal: code.teal_70_hover,
	tag_border_teal: code.teal_50,
	tag_background_green: code.green_70,
	tag_color_green: code.green_20,
	tag_hover_green: code.green_70_hover,
	tag_border_green: code.green_50,

	notification_info_background: code.gray_90,
	notification_info_border: hexToRgba(code.blue_50, '0.5'),
	notification_error_background: code.gray_90,
	notification_error_border: hexToRgba(code.red_40, '0.5'),
	notification_success_background: code.gray_90,
	notification_success_border: hexToRgba(code.green_40, '0.5'),
	notification_warning_background: code.gray_90,
	notification_warning_border: hexToRgba(code.yellow_50, '0.5'),

	notification_action_hover: code.gray_90_hover,
	notification_action_tertiary_inverse: code.blue_60,
	notification_action_tertiary_inverse_active: code.gray_100,
	notification_action_tertiary_inverse_hover: code.blue_80,
	notification_action_tertiary_inverse_text: code.white,
	notification_action_tertiary_inverse_text_on_color_disabled: code.white,

} as const satisfies Record<ThemeType.ColorToken, string>
