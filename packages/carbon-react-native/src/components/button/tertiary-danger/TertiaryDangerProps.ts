import type {
	BaseColorProps,
} from "../base-color/BaseColorProps"

export interface TertiaryDangerProps extends Omit<
	BaseColorProps,
	| "android_rippleEffectColor"
	| "colorStateStyle"
	| "iconContainerStyle"
> {
}

