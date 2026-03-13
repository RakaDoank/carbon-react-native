import node_fs from "node:fs"
import node_path from "node:path"

const
	root =
		node_path.resolve(import.meta.dirname, "..", "..", ".."),

	packagePath =
		node_path.join(root, "packages", "carbon-react-native"),

	additionalSources =
		[
			{
				name: "assets",
				path: node_path.join(root, "assets"),
			},
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

		{
			/**
			 * Keep the short README.md in the package directory, and publish to npm with the long README.md (root repository)
			 */

			const destPath = node_path.join(packagePath, "README.md")

			if(node_fs.existsSync(destPath)) {
				node_fs.renameSync(
					destPath,
					node_path.join(packagePath, "README-original.md"),
				)
			}

			node_fs.cpSync(
				node_path.join(root, "README.md"),
				destPath,
			)
		}

		console.info("/packages-builder/carbon-react-native/scripts/_prepack.mjs :: Package has been packed successfully")

	} catch(e) {

		throw new Error(
			`/packages-builder/carbon-react-native/scripts/_prepack.mjs :: `,
			`${e?.name || "Unknown Name"} :: `,
			`${e?.message || "Unknown Error"}`,
		)

	}
}
