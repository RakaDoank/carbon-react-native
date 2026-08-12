import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	Table,
	TableCell,
	TableCellCheckbox,
	TableRow as CarbonTableRow,
	type TableRowProps,
} from "@audira/carbon-react-native"

export default {

	title: "Components/Table/Table Row",
	component: CarbonTableRow,

} satisfies Meta<TableRowProps>

export const TableRow: StoryFn<TableRowProps> = args => {

	return (
		<Table>
			<CarbonTableRow
				{ ...args }
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
			</CarbonTableRow>
		</Table>
	)
}
