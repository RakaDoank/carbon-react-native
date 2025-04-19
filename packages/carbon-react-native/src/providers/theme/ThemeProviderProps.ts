import type {
	ThemeContext,
} from '../../contexts'

export interface ThemeProviderProps {
	colorScheme?: ThemeContext['colorScheme'],
	/**
	 * You can override all color by your own. `colorScheme` probably means nothing due to this prop.  
	 */
	overrideColor?: Partial<ThemeContext['color']>,
	children?: React.ReactNode,
}
