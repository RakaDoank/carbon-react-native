import {
	forwardRef,
	useCallback,
	useContext,
	useImperativeHandle,
	useRef,
} from 'react'

import {
	RadioButton,
	type RadioButtonProps,
	type RadioButtonRef,
} from '../radio-button'

import type {
	RadioButtonGroupItemProps,
} from './RadioButtonGroupItemProps'

import type {
	RadioButtonGroupItemRef,
} from './RadioButtonGroupItemRef'

import {
	ItemContext,
} from './_item-context'

export const Item = forwardRef<RadioButtonGroupItemRef, RadioButtonGroupItemProps>(
	function Item(
		{
			value: valueProp,
			onPress,
			...props
		},
		forwardedRef,
	) {

		const
			{ controlled, value, setValue, setOnChangeGroupEffect, onChangeGroup } =
				useContext(ItemContext),

			radioButtonRef =
				useRef<RadioButtonRef>(null),

			pressHandler: NonNullable<RadioButtonProps['onPress']> =
				useCallback(event => {
					onPress?.(event)
					if(!controlled) {
						setOnChangeGroupEffect?.(true)
						setValue?.(valueProp)
					} else {
						onChangeGroup?.(valueProp)
					}
				}, [
					controlled,
					valueProp,
					setValue,
					setOnChangeGroupEffect,
					onChangeGroup,
					onPress,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<RadioButtonRef, {
				setChecked: RadioButtonRef['setChecked']
			}>(
				(radioButtonRef.current ?? {
				}) as RadioButtonRef,
				{
					setChecked(checkedParam) {
						if(!controlled) {
							let checked: boolean

							if(typeof checkedParam === 'boolean') {
								checked = checkedParam
							} else {
								checked = checkedParam(!!radioButtonRef.current?.checked)
							}

							setValue?.(checked ? valueProp : undefined)
						}
					},
				},
			)
		}, [
			controlled,
			valueProp,
			setValue,
		])

		return (
			<RadioButton
				{ ...props }
				value={ value }
				checked={ value === valueProp }
				onPress={ pressHandler }
				ref={ radioButtonRef }
			/>
		)

	},
)
