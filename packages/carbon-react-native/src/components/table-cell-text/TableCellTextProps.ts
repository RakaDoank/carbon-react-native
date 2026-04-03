import type {
	TextProps,
} from "../text/TextProps"

export interface TableCellTextProps extends Omit<
	TextProps,
	| "type"
> {
}
