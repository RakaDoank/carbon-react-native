import type {
	BaseColorProps,
} from "../base-color/BaseColorProps"

export interface PrimaryDangerProps extends Omit<
	BaseColorProps,
	| "android_rippleEffectColor"
	| "colorStateStyle"
	| "iconContainerStyle"
> {
}

