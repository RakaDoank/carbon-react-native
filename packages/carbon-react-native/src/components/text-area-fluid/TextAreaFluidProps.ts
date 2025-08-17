import type {
	TextAreaFieldProps,
} from '../text-area-field/TextAreaFieldProps'

export interface TextAreaFluidProps extends Omit<
	TextAreaFieldProps,
	| 'hideInteractiveStateIcon'
	| 'blockStartNodes'
	| 'blockEndNodes'
> {
	label: string,
	helperText?: string,
}
