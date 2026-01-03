import type {
	BaseColorProps,
} from "../base-color/BaseColorProps"

export interface GhostProps extends Omit<
	BaseColorProps,
	| "android_rippleEffectColor"
	| "colorStateStyle"
> {
}
