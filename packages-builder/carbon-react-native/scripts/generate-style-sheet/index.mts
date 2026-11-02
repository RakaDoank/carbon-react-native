import {
	initColorTokenReferences,
} from "./_init-color-token-references.mjs"

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
	initColorTokenReferences()
	initFont()
	initSpacing()
	initTypography()
}
