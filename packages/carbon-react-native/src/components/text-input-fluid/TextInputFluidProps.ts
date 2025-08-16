import type {
	TextInputFieldProps,
} from '../text-input-field/TextInputFieldProps'

export interface TextInputFluidProps extends Omit<
	TextInputFieldProps,
	| 'size'
	| 'hideInteractiveStateIcon'
	| 'blockStartNodes'
	| 'blockEndNodes'
> {
	label: string,
	helperText?: string,
}
