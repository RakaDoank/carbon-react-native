import type {
	BaseProps,
} from '../../base'

import {
	useBase,
	type UseBaseProps,
	type UseBaseData,
} from '../_base'

import Icon from '@carbon/icons/es/error--filled/20'

export interface UseErrorProps {
	color?: UseBaseProps['color'],
	transparentBorderColor?: UseBaseProps['transparentBorderColor'],
}

export interface UseErrorData extends UseBaseData {
	icon: NonNullable<BaseProps['icon']>,
}

export function useError({
	color,
	transparentBorderColor,
}: UseErrorProps): UseErrorData {

	const data = useBase({
		color,
		transparentBorderColor,
		titleColor: {
			low_contrast: 'text_primary',
			high_contrast: 'text_inverse',
		},
		backgroundColor: {
			low_contrast: 'notification_error_background',
			high_contrast: 'background_inverse',
		},
		borderColor: {
			low_contrast: 'notification_error_border',
			high_contrast: 'background_inverse',
		},
		leftBarColor: {
			low_contrast: 'support_error',
			high_contrast: 'support_error_inverse',
		},
		iconColor: {
			low_contrast: 'support_error',
			high_contrast: 'support_error_inverse',
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
