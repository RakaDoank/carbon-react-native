import {
	useBase,
} from '../_base'

import Icon from '@carbon/icons/es/checkmark--filled/20'

import type {
	UseSuccessData,
} from './UseSuccessData'

import type {
	UseSuccessProps,
} from './UseSuccessProps'

export function useSuccess({
	color,
	transparentBorderColor,
}: UseSuccessProps): UseSuccessData {

	const data = useBase({
		color,
		transparentBorderColor,
		titleColor: {
			low_contrast: 'text_primary',
			high_contrast: 'text_inverse',
		},
		backgroundColor: {
			low_contrast: 'notification_success_background',
			high_contrast: 'background_inverse',
		},
		borderColor: {
			low_contrast: 'notification_success_border',
			high_contrast: 'background_inverse',
		},
		leftBarColor: {
			low_contrast: 'support_success',
			high_contrast: 'support_success_inverse',
		},
		iconColor: {
			low_contrast: 'support_success',
			high_contrast: 'support_success_inverse',
		},
		iconCloseColor: {
			low_contrast: 'icon_primary',
			high_contrast: 'icon_inverse',
		},
	})

	return {
		...data,
		icon: Icon,
	}

}
