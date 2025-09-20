import type {
	NotificationColor,
} from '../../NotificationColor'
import type {
	BaseProps,
} from '../../base/BaseProps'


import type {
	SubtitleProps,
} from '../../subtitle/SubtitleProps'

export interface ToastVariantProps extends Omit<
	BaseProps,
	| 'inline'
	| 'body'
	| 'icon'
	| 'iconClose'
	| 'nodes'
	| 'leftContainerStyle'
> {
	color?: NotificationColor,
	icon: NonNullable<BaseProps['icon']>,
	/**
	 * Override timestamp text with this prop
	 */
	timestamp?: string,
	subtitle: React.ReactNode,
	subtitleStyle?: SubtitleProps['style'],
}
