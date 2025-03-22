import type {
	BaseProps,
} from '../../base'

import {
	useBase,
	type UseBaseProps,
	type UseBaseData,
} from '../_base'

import Icon from '@carbon/icons/es/information--filled/20'

export interface UseInformationalProps {
	color?: UseBaseProps['color'],
	transparentBorderColor?: UseBaseProps['transparentBorderColor'],
}

export interface UseInformationalData extends UseBaseData {
	icon: NonNullable<BaseProps['icon']>,
}

export function useInformational({
	color,
	transparentBorderColor,
}: UseInformationalProps): UseInformationalData {

	const data = useBase({
		color,
		transparentBorderColor,
		titleColor: {
			low_contrast: 'text_primary',
			high_contrast: 'text_inverse',
		},
		backgroundColor: {
			low_contrast: 'notification_info_background',
			high_contrast: 'background_inverse',
		},
		borderColor: {
			low_contrast: 'notification_info_border',
			high_contrast: 'background_inverse',
		},
		leftBarColor: {
			low_contrast: 'support_info',
			high_contrast: 'support_info_inverse',
		},
		iconColor: {
			low_contrast: 'support_info',
			high_contrast: 'support_info_inverse',
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
