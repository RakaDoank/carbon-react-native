import {
	forwardRef,
} from "react"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	Box,
} from "../box/Box"

import {
	ScrollView,
} from "../scroll-view/ScrollView"

import type {
	TableProps,
} from "./TableProps"

import type {
	TableRef,
} from "./TableRef"

import {
	TableContext,
} from "./_TableContext"

export const Table = forwardRef<TableRef, TableProps>(
	function Table(
		{
			rowSize = "large",
			header,
			footer,
			horizontalScrollViewProps,
			verticalScrollViewProps,
			children,
			...props
		},
		ref,
	) {

		return (
			<TableContext.Provider
				value={{
					rowSize,
				}}
			>
				<Box
					ref={ ref }
					{ ...props }
				>
					{ header }

					<ScrollView
						{ ...horizontalScrollViewProps }
						horizontal={ horizontalScrollViewProps?.horizontal ?? true }
						nestedScrollEnabled={ horizontalScrollViewProps?.nestedScrollEnabled ?? true }
						contentContainerStyle={ [
							CarbonStyleSheet.g.grow,
							horizontalScrollViewProps?.contentContainerStyle,
						] }
					>
						<ScrollView
							{ ...verticalScrollViewProps }
							style={ [
								CarbonStyleSheet.g.flex_auto,
								verticalScrollViewProps?.style,
							] }
							role="table"
						>
							{ children }
						</ScrollView>
					</ScrollView>

					{ footer }
				</Box>
			</TableContext.Provider>
		)

	},
)
