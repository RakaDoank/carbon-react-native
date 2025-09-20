import type {
	NotificationColor,
} from '../../NotificationColor'
import type {
	BaseProps,
} from '../../base'


import type {
	SubtitleProps,
} from '../../subtitle/SubtitleProps'

import type {
	ButtonTertiaryProps,
} from '../_ButtonTertiary'

export interface ActionableVariantProps extends Omit<
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
	 * Fill the button prop to render an button action in the notification component  
	 * Props are similar like you're calling an button component `<Button.Ghost text="button"/>`, just without the JSX
	 * @example
	 * <Notification.Actionable.Informational
	 * 	title="Title goes here"
	 * 	subtitle="Subtitle goes here"
	 * 	buttonProps={{
	 * 		text: 'Action',
	 * 		onPress: event => {
	 * 			// your function
	 * 		},
	 * 	}}
	 * />
	 */
	buttonProps?: Omit<ButtonTertiaryProps, 'color'>,
	subtitle: React.ReactNode,
	subtitleStyle?: SubtitleProps['style'],
}
