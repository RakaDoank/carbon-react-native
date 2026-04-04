import {
	useContext,
} from "react"

import type {
	Size,
} from "../button/Size"

import {
	TableToolbarContext,
} from "../table-toolbar/_TableToolbarContext"

export function useSize(): Size {

	const
		tableToolbarContext =
			useContext(TableToolbarContext)

	return mapToolbarSizeToButtonSize[tableToolbarContext.size]

}

const
	mapToolbarSizeToButtonSize =
		{
			small: "small",
			large: "large_productive",
		} as const satisfies Record<TableToolbarContext["size"], Size>
