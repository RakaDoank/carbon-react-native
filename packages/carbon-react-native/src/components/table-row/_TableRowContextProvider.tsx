import {
	useState,
} from "react"

import {
	TableRowContext,
} from "./_TableRowContext"

export function TableRowContextProvider({
	interactiveState,
	hovered,
	defaultSelected,
	children,
}: TableRowContextProviderProps) {

	const
		[selected, setSelected] =
			useState(!!defaultSelected)

	return (
		<TableRowContext.Provider
			value={{
				interactiveState,
				hovered,
				selected,
				setSelected,
			}}
		>
			{ children }
		</TableRowContext.Provider>
	)

}

interface TableRowContextProviderProps extends Omit<TableRowContext, "selected" | "setSelected"> {
	defaultSelected?: boolean,
	children?: React.ReactNode,
}
