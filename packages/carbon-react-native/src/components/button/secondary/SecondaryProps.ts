import type {
	BaseColorProps,
} from "../base-color/BaseColorProps"

export interface SecondaryProps extends Omit<
	BaseColorProps,
	| "android_rippleEffectColor"
	| "colorStateStyle"
	| "iconContainerStyle"
> {
}

