import node_fs from 'node:fs'
import node_path from 'node:path'
import node_url from 'node:url'

const
	__filename =
		node_url.fileURLToPath(import.meta.url),

	__dirname =
		node_path.dirname(__filename),

	root =
		node_path.resolve(__dirname, '../..'),

	packagePath =
		node_path.join(root, 'package'),

	additionalSources =
		[
			{
				name: 'assets',
				path: node_path.join(root, 'assets'),
			},
			{
				name: 'README.md',
				path: node_path.join(root, 'README.md'),
			},
		]
try {
	additionalSources.forEach(src => {
		const destPath = node_path.join(packagePath, src.name)

		if(node_fs.existsSync(destPath)) {
			node_fs.rmSync(destPath, { recursive: true })
		}

		node_fs.cpSync(
			src.path,
			destPath,
			{
				recursive: true,
			},
		)
	})
} catch(e) {
	throw new Error(e instanceof Error ? e.message : 'Unknown error')
}
