import type {
	BaseColorProps,
} from "../base-color/BaseColorProps"

export interface GhostDangerProps extends Omit<
	BaseColorProps,
	| "android_rippleEffectColor"
	| "colorStateStyle"
> {
}
