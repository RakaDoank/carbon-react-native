import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	Table as CarbonTable,
	TableCell,
	TableCellHeader,
	TableHeader,
	TableRow,
	TableRowHeader,
	TableToolbar,
	TableToolbarButton,
	type TableProps,
} from "@audira/carbon-react-native"

import IconDownload from "@carbon/icons/svg/32/download.svg"

export default {

	title: "Components/Data Table",

	args: {
		rowSize: "large",
	},

	argTypes: {
		rowSize: {
			control: "select",
			options: [
				"extra_small",
				"small",
				"medium",
				"large",
				"extra_large",
			] satisfies NonNullable<TableProps["rowSize"]>[],
		},
	},

} satisfies Meta<TableProps>

export const Table: StoryFn<TableProps> = args => {

	return (
		<CarbonTable
			{ ...args }
			header={ <>
				<TableHeader
					title="Data Table"
					description="Add description if needed"
				/>

				<TableToolbar
					buttons={ <>
						<TableToolbarButton.GhostIcon
							Icon={ IconDownload }
						/>
						<TableToolbarButton.Primary
							text="Hola"
						/>
					</> }
				/>
			</> }
		>
			<TableRowHeader>
				<TableCellHeader
					width={ 140 }
					defaultSort="none"
					text="Head 1"
				/>
				<TableCell
					width={ 80 }
					text="Head 2"
				/>
				<TableCell
					width={ 90 }
					text="Head 3"
				/>
				<TableCell
					width={ 125 }
					text="Head 4"
				/>
				<TableCell
					width={ 111 }
					text="Head 5"
				/>
				<TableCell
					width={ 111 }
					text="Head 6"
				/>
				<TableCell
					width={ 90 }
					text="Head 7"
				/>
				<TableCell
					width={ 100 }
					text="Head 8"
				/>
				<TableCell
					width={ 100 }
					text="Head 9"
				/>
				<TableCell
					width={ 100 }
					text="Head 10"
				/>
			</TableRowHeader>
			<TableRow>
				<TableCell
					width={ 140 }
					text="Col 1"
				/>
				<TableCell
					width={ 80 }
					text="Col 2"
				/>
				<TableCell
					width={ 90 }
					text="Col 3"
				/>
				<TableCell
					width={ 125 }
					text="Col 4"
				/>
				<TableCell
					width={ 111 }
					text="Col 5"
				/>
				<TableCell
					width={ 111 }
					text="Col 6"
				/>
				<TableCell
					width={ 90 }
					text="Col 7"
				/>
				<TableCell
					width={ 100 }
					text="Col 8"
				/>
				<TableCell
					width={ 100 }
					text="Col 9"
				/>
				<TableCell
					width={ 100 }
					text="Col 10"
				/>
			</TableRow>
			<TableRow>
				<TableCell
					width={ 140 }
					text="Col 11"
				/>
				<TableCell
					width={ 80 }
					text="Col 22"
				/>
				<TableCell
					width={ 90 }
					text="Col 33"
				/>
				<TableCell
					width={ 125 }
					text="Col 44"
				/>
				<TableCell
					width={ 111 }
					text="Col 55"
				/>
				<TableCell
					width={ 111 }
					text="Col 66"
				/>
				<TableCell
					width={ 90 }
					text="Col 77"
				/>
				<TableCell
					width={ 100 }
					text="Col 88"
				/>
				<TableCell
					width={ 100 }
					text="Col 99"
				/>
				<TableCell
					width={ 100 }
					text="Col 100"
				/>
			</TableRow>
		</CarbonTable>
	)
}
