import type {
	BaseProps,
} from "../base/BaseProps"

export interface DefaultProps extends Omit<BaseProps, "switchProps"> {
	label: string,
	actionText: string,
	switchProps?: Omit<BaseProps["switchProps"], "size">,
}
