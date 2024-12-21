import {
	Base,
	type BaseProps,
} from '../base'

export interface SmallProps extends Omit<BaseProps, 'switchProps'> {
	switchProps?: Omit<BaseProps['switchProps'], 'size'>,
}

export function Small({
	switchProps,
	...props
}: SmallProps) {

	return (
		<Base
			{ ...props }
			switchProps={{
				...switchProps,
				size: 'small',
			}}
		/>
	)

}
