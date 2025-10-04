import type {
	ViewProps,
} from 'react-native'

import type {
	GhostIconProps,
} from '../button/ghost-icon/GhostIconProps'

import type {
	ModalSize,
} from './ModalSize'

export interface ModalProps extends ViewProps {
	label?: string,
	title: string,
	/**
	 * @default 'medium'
	 */
	size?: ModalSize,
	buttonCloseProps?: Omit<
		GhostIconProps,
		| 'icon'
	>,
}
