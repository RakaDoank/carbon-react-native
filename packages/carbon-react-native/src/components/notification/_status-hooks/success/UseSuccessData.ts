import type {
	BaseProps,
} from '../../base/BaseProps'

import type {
	UseBaseData,
} from '../_base/UseBaseData'

export interface UseSuccessData extends UseBaseData {
	icon: NonNullable<BaseProps['icon']>,
}
