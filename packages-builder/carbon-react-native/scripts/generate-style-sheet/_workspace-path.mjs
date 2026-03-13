import node_path from "node:path"

export const WorkspacePath =
	node_path.join(import.meta.dirname, "..", "..", "..", "..")
