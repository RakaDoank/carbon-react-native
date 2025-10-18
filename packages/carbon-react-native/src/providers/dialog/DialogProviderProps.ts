import type {
	DialogProviderAnimatedConfig,
} from './DialogProviderAnimatedConfig'

import type {
	DialogProviderReanimatedConfig,
} from './DialogProviderReanimatedConfig'

import type {
	ModalProps,
} from './_controller/_modal/ModalProps'

import type {
	OverlayProps,
} from './_controller/_overlay/OverlayProps'

export interface DialogProviderProps {
	overlayProps?: Omit<OverlayProps, 'animationConfig'>,
	/**
	 * @default DialogAnimationConfigs.Reanimated.CarbonReact
	 * @platform windows
	 * @platform web
	 */
	animatedConfig?: DialogProviderAnimatedConfig,
	/**
	 * @default DialogAnimationConfigs.Animated.CarbonReact
	 * @platform ios
	 * @platform android
	 * @platform macos
	 */
	reanimatedConfig?: DialogProviderReanimatedConfig,
	modalProps?: Omit<ModalProps, 'animationConfig'>,
	children?: React.ReactNode,
	/**
	 * User can touch/click any area in the overlay to dismiss the dialog
	 * 
	 * `overlayTouchDismiss` boolean value in the `.show` method parameter will takes precedence
	 * @default 'false'
	 */
	overlayTouchDismiss?: boolean,
}
