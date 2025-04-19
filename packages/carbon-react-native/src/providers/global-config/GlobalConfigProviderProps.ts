import type {
	GlobalConfigContext,
} from '../../contexts'

export interface GlobalConfigProviderProps extends Partial<GlobalConfigContext> {
	children?: React.ReactNode,
}
