import type {
	RadioButtonProps,
} from '../radio-button/RadioButtonProps'

export interface RadioButtonGroupItemProps extends Omit<
	RadioButtonProps,
	| 'defaultChecked'
	| 'checked'
> {
}
