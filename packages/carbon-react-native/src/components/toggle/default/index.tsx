import {
	forwardRef,
} from 'react'

import {
	Base,
	type BaseProps,
	type BaseRef,
} from '../base'

export interface DefaultProps extends Omit<BaseProps, 'switchProps'> {
	label: string,
	actionText: string,
	switchProps?: Omit<BaseProps['switchProps'], 'size'>,
}

export interface DefaultRef extends BaseRef {
}

export const Default = forwardRef<DefaultRef, DefaultProps>(
	function Default(
		{
			switchProps,
			...props
		},
		ref,
	) {

		return (
			<Base
				{ ...props }
				switchProps={{
					...switchProps,
					size: 'default',
				}}
				ref={ ref }
			/>
		)

	},
)
