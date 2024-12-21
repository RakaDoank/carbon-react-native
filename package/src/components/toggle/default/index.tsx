import {
	Base,
	type BaseProps,
} from '../base'

export interface DefaultProps extends Omit<BaseProps, 'switchProps'> {
	label: string,
	actionText: string,
	switchProps?: Omit<BaseProps['switchProps'], 'size'>,
}

export function Default({
	switchProps,
	...props
}: DefaultProps) {

	return (
		<Base
			{ ...props }
			switchProps={{
				...switchProps,
				size: 'default',
			}}
		/>
	)

}
