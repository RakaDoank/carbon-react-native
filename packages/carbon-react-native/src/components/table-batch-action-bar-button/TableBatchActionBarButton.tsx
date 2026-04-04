import {
	forwardRef,
	useContext,
} from "react"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	Primary as ButtonPrimary,
	type PrimaryProps as ButtonPrimaryProps,
} from "../button/primary"

import type {
	TableBatchActionBarSize,
} from "../table-batch-action-bar/TableBatchActionBarSize"

import {
	TableBatchActionBarContext,
} from "../table-batch-action-bar/_TableBatchActionBarContext"

import type {
	TableBatchActionBarButtonProps,
} from "./TableBatchActionBarButtonProps"

import type {
	TableBatchActionBarButtonRef,
} from "./TableBatchActionBarButtonRef"

export const TableBatchActionBarButton = forwardRef<TableBatchActionBarButtonRef, TableBatchActionBarButtonProps>(
	function TableBatchActionBarButton(
		{
			Icon,
			iconProps,
			style,
			...props
		},
		ref,
	) {

		const
			tableBatchActionBarContext =
				useContext(TableBatchActionBarContext)

		return (
			<ButtonPrimary
				ref={ ref }
				{ ...props }
				size={ mapBatchActionBarSizeToButtonSize[tableBatchActionBarContext.size] }
				Icon={ Icon }
				iconProps={{
					...iconProps,
					style: [
						CarbonStyleSheet.g.ms_03, // override the gap between text and icon
						iconProps?.style,
					],
				}}
				style={ [
					Icon
						? undefined
						: CarbonStyleSheet.g.pe_05,
					style,
				] }
			/>
		)

	},
)

const
	mapBatchActionBarSizeToButtonSize =
		{
			small: "small",
			large: "large_productive",
		} as const satisfies Record<TableBatchActionBarSize, NonNullable<ButtonPrimaryProps["size"]>>
