import type {
	ThemeContext,
} from "../../../contexts"

export interface ThemeProviderProps {
	colorScheme?: ThemeContext["colorScheme"],
	children?: React.ReactNode,
}
