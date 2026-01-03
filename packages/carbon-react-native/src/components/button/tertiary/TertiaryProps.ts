import type {
	BaseColorProps,
} from "../base-color/BaseColorProps"

export interface TertiaryProps extends Omit<
	BaseColorProps,
	| "android_rippleEffectColor"
	| "colorStateStyle"
	| "iconContainerStyle"
> {
}

