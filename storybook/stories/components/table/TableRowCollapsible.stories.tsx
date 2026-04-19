import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	Table,
	TableCell,
	TableCellCheckbox,
	TableRowCollapsible as CarbonTableRowCollapsible,
	type TableRowCollapsibleProps,
} from "@audira/carbon-react-native"

export default {

	title: "Components/Table/Table Row Collapsible",
	component: CarbonTableRowCollapsible,

} satisfies Meta<TableRowCollapsibleProps>

export const TableRowCollapsible: StoryFn<TableRowCollapsibleProps> = args => {

	return (
		<Table
			rowSize={ args.size }
		>
			<CarbonTableRowCollapsible
				{ ...args }
				content={
					<>
						<TableCellCheckbox
							invisible
						/>
						<TableCell
							width={ 100 }
							text="Eins"
						/>
						<TableCell
							width={ 100 }
							text="Zwei"
						/>
						<TableCell
							width={ 100 }
							text="Drei"
						/>
						<TableCell
							width={ 100 }
							text="Vier"
						/>
						<TableCell
							width={ 100 }
							text="Fünf"
						/>
						<TableCell
							width={ 100 }
							text="Sechs"
						/>
						<TableCell
							width={ 100 }
							text="Sieben"
						/>
					</>
				}
			>
				<TableCellCheckbox/>
				<TableCell
					width={ 100 }
					text="Eins"
				/>
				<TableCell
					width={ 100 }
					text="Zwei"
				/>
				<TableCell
					width={ 100 }
					text="Drei"
				/>
				<TableCell
					width={ 100 }
					text="Vier"
				/>
				<TableCell
					width={ 100 }
					text="Fünf"
				/>
				<TableCell
					width={ 100 }
					text="Sechs"
				/>
				<TableCell
					width={ 100 }
					text="Sieben"
				/>
			</CarbonTableRowCollapsible>
			<CarbonTableRowCollapsible>
				<TableCellCheckbox/>
				<TableCell
					width={ 100 }
					text="Eins"
				/>
				<TableCell
					width={ 100 }
					text="Zwei"
				/>
				<TableCell
					width={ 100 }
					text="Drei"
				/>
				<TableCell
					width={ 100 }
					text="Vier"
				/>
				<TableCell
					width={ 100 }
					text="Fünf"
				/>
				<TableCell
					width={ 100 }
					text="Sechs"
				/>
				<TableCell
					width={ 100 }
					text="Sieben"
				/>
			</CarbonTableRowCollapsible>
		</Table>
	)
}
