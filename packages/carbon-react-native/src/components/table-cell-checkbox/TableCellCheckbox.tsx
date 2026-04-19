import {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	CheckboxInput,
	type CheckboxInputProps,
	type CheckboxInputRefBase,
	type CheckboxInputState,
} from "../checkbox-input"

import {
	TableCell,
	type TableCellRef,
} from "../table-cell"

import {
	TableRowContext,
} from "../table-row/_TableRowContext"

import type {
	TableCellCheckboxProps,
} from "./TableCellCheckboxProps"

import type {
	TableCellCheckboxRef,
} from "./TableCellCheckboxRef"

export const TableCellCheckbox = forwardRef<TableCellCheckboxRef, TableCellCheckboxProps>(
	function TableCellCheckbox(
		{
			// +++ Picked CheckboxInput props +++
			defaultChecked,
			checked: checkedProp,
			interactiveState,
			onChange,
			// --- Picked CheckboxInput props ---
			width = 32,
			invisible,
			checkboxInputProps,
			style,
			...props
		},
		ref,
	) {

		const
			tableCellRef =
				useRef<TableCellRef>(null),

			tableRowContext =
				useContext(TableRowContext),

			checkedRef =
				useRef({
					onChangeEffect: false,
					value: typeof checkedProp == "boolean" || typeof checkedProp == "object"
						? checkedProp
						: typeof defaultChecked == "boolean" || typeof defaultChecked == "object"
							? defaultChecked
							: false,
				}),

			[checkedSelf, setCheckedSelf] =
				useState<CheckboxInputState>(() => {
					if(typeof defaultChecked == "boolean" || typeof defaultChecked == "object") {
						return defaultChecked
					}
					return false
				}),

			controlled =
				typeof checkedProp !== "undefined",

			checked =
				controlled ? checkedProp : checkedSelf

		const
			onChangeCheckboxInput: NonNullable<CheckboxInputProps["onChange"]> =
				useCallback(state => {
					if(!controlled) {
						checkedRef.current.onChangeEffect = true
						checkedRef.current.value = state
						setCheckedSelf(state)
					} else {
						onChange?.(state)
					}
				}, [
					controlled,
					onChange,
				])

		useEffect(() => {
			if(!invisible) {
				checkedRef.current.value = checked

				tableRowContext.setSelected(checked !== false)

				if(checkedRef.current.onChangeEffect) {
					checkedRef.current.onChangeEffect = false
					onChange?.(checked)
				}
			}
		}, [
			checked,
			tableRowContext,
			onChange,
			invisible,
		])

		useImperativeHandle(ref, () => {
			return Object.assign<TableCellRef, CheckboxInputRefBase>(
				tableCellRef.current ?? {} as TableCellRef,
				{
					get checked() {
						return checked
					},
					setChecked(val) {
						if(!controlled && interactiveState != "read_only") {
							checkedRef.current.onChangeEffect = true
							if(typeof val == "function") {
								checkedRef.current.value = val(checkedRef.current.value)
							} else {
								checkedRef.current.value = val
							}
							setCheckedSelf(checkedRef.current.value)
						}
					},
				},
			)
		}, [
			checked,
			controlled,
			interactiveState,
		])

		return (
			<TableCell
				ref={ tableCellRef }
				{ ...props }
				width={ width }
				invisible={ invisible }
				style={ [
					CarbonStyleSheet.g.flex_initial,
					style,
				] }
			>
				{ !invisible && (
					<CheckboxInput
						{ ...checkboxInputProps }
						interactiveState={ interactiveState ?? tableRowContext.interactiveState }
						checked={ checked }
						onChange={ onChangeCheckboxInput }
					/>
				) }
			</TableCell>
		)

	},
)
