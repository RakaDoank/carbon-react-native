import node_fs from "node:fs"
import node_path from "node:path"

const
	root =
		node_path.resolve(import.meta.dirname, "..", "..", ".."),

	packagePath =
		node_path.join(root, "packages", "carbon-react-native-elements"),

	additionalSources =
		[
			{
				name: "LICENSE",
				path: node_path.join(root, "LICENSE"),
			},
		]

export function prepack() {
	try {

		additionalSources.forEach(src => {
			const destPath = node_path.join(packagePath, src.name)

			if(node_fs.existsSync(destPath)) {
				node_fs.rmSync(destPath, {
					recursive: true,
				})
			}

			node_fs.cpSync(
				src.path,
				destPath,
				{
					recursive: true,
				},
			)
		})

		console.info("/packages-builder/carbon-react-native-elements/scripts/_prepack.mjs :: Package has been packed successfully")

	} catch(e) {

		throw new Error(
			`/packages-builder/carbon-react-native-elements/scripts/_prepack.mjs :: `,
			`${e?.name || "Unknown Name"} :: `,
			`${e?.message || "Unknown Error"}`,
		)

	}
}
