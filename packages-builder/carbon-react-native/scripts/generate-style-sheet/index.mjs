import {
	initFont,
} from "./_init-font.mjs"

import {
	initSpacing,
} from "./_init-spacing.mjs"

import {
	initTypography,
} from "./_init-typography.mjs"

export function generateStyleSheet() {
	initFont()
	initSpacing()
	initTypography()
}
