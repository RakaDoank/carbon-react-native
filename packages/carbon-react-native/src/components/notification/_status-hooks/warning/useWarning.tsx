import {
	useBase,
} from '../_base'

import Icon from '@carbon/icons/es/warning--filled/20'

import type {
	UseWarningData,
} from './UseWarningData'

import type {
	UseWarningProps,
} from './UseWarningProps'

export function useWarning({
	color,
	transparentBorderColor,
}: UseWarningProps): UseWarningData {

	const data = useBase({
		color,
		transparentBorderColor,
		titleColor: {
			low_contrast: 'text_primary',
			high_contrast: 'text_inverse',
		},
		backgroundColor: {
			low_contrast: 'notification_warning_background',
			high_contrast: 'background_inverse',
		},
		borderColor: {
			low_contrast: 'notification_warning_border',
			high_contrast: 'background_inverse',
		},
		leftBarColor: {
			low_contrast: 'support_warning',
			high_contrast: 'support_warning_inverse',
		},
		iconColor: {
			low_contrast: 'support_warning',
			high_contrast: 'support_warning_inverse',
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
