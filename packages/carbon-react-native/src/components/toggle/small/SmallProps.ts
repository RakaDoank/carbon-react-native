import type {
	BaseProps,
} from '../base/BaseProps'

export interface SmallProps extends Omit<BaseProps, 'switchProps'> {
	switchProps?: Omit<BaseProps['switchProps'], 'size'>,
}
