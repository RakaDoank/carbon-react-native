import type {
	BaseColorProps,
} from "../base-color/BaseColorProps"

export interface PrimaryProps extends Omit<
	BaseColorProps,
	| "android_rippleEffectColor"
	| "colorStateStyle"
	| "iconContainerStyle"
> {
}
