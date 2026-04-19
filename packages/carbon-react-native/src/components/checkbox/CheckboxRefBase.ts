import type {
	CheckboxInputRefBase,
} from "../checkbox-input/CheckboxInputRefBase"

export interface CheckboxRefBase extends CheckboxInputRefBase {
	checked: CheckboxInputRefBase["checked"],
}
