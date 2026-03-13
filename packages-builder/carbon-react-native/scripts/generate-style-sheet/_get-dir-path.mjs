import node_path from "node:path"

import {
	WorkspacePath,
} from "./_workspace-path.mjs"

/**
 * @param {string} fileName
 */
export function getDirPath(
	fileName,
) {
	return {
		g: node_path.join(WorkspacePath, "packages", "carbon-react-native", "src", "carbon-style-sheet", "g", fileName),
		gObject: node_path.join(WorkspacePath, "packages", "carbon-react-native", "src", "carbon-style-sheet", "g-object", fileName),
	}
}
