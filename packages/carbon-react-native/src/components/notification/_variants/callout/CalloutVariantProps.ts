import type {
	NotificationColor,
} from '../../NotificationColor'
import type {
	BaseProps,
} from '../../base/BaseProps'


import type {
	SubtitleProps,
} from '../../subtitle/SubtitleProps'

export interface CalloutVariantProps extends Omit<
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
	subtitle: React.ReactNode,
	subtitleStyle?: SubtitleProps['style'],
}
