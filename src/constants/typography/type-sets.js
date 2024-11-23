const
	body_compact_01 =
		{
			fontSize: 14,
			lineHeight: 18,
			fontWeight: 400,
			letterSpacing: 0.16,
		},

	body_compact_02 =
		{
			fontSize: 16,
			lineHeight: 22,
			fontWeight: 400,
			letterSpacing: 0,
		},

	body_01 =
		{
			fontSize: 14,
			lineHeight: 20,
			fontWeight: 400,
			letterSpacing: 0.16,
		},

	body_02 =
		{
			fontSize: 16,
			lineHeight: 24,
			fontWeight: 400,
			letterSpacing: 0,
		}

/**
 * @type {import('../../types/typography').TypeSets}
 */
module.exports = {

	code_01: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: 400,
		letterSpacing: 0.32,
	},
	code_02: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 400,
		letterSpacing: 0.32,
	},
	label_01: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: 400,
		letterSpacing: 0.32,
	},
	label_02: {
		fontSize: 14,
		lineHeight: 18,
		fontWeight: 400,
		letterSpacing: 0.16,
	},
	helper_text_01: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: 400,
		letterSpacing: 0.32,
	},
	helper_text_02: {
		fontSize: 14,
		lineHeight: 18,
		fontWeight: 400,
		letterSpacing: 0.16,
	},
	legal_01: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: 400,
		letterSpacing: 0.32,
	},
	legal_02: {
		fontSize: 14,
		lineHeight: 18,
		fontWeight: 400,
		letterSpacing: 0.16,
	},

	body_compact_01: body_compact_01,
	body_compact_02: body_compact_02,
	body_01: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 400,
		letterSpacing: 0.16,
	},
	body_02: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: 400,
		letterSpacing: 0,
	},

	heading_compact_01: {
		...body_compact_01,
		fontWeight: 600,
	},
	heading_compact_02: {
		...body_compact_02,
		fontWeight: 600,
	},
	heading_01: {
		...body_01,
		fontWeight: 600,
	},
	heading_02: {
		...body_02,
		fontWeight: 600,
	},
	heading_03: {
		fontSize: 20,
		lineHeight: 28,
		fontWeight: 400,
		letterSpacing: 0,
	},
	heading_04: {
		fontSize: 28,
		lineHeight: 36,
		fontWeight: 400,
		letterSpacing: 0,
	},
	heading_05: {
		fontSize: 32,
		lineHeight: 40,
		fontWeight: 400,
		letterSpacing: 0,
	},
	heading_06: {
		fontSize: 42,
		lineHeight: 50,
		fontWeight: 300,
		letterSpacing: 0,
	},
	heading_07: {
		fontSize: 54,
		lineHeight: 64,
		fontWeight: 300,
		letterSpacing: 0,
	},

}
