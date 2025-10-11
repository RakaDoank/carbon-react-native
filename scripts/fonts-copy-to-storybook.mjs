import node_fs from 'node:fs'
import node_path from 'node:path'

const
	root =
		node_path.join(import.meta.dirname, '..'),

	fontsDir =
		node_path.join(root, 'assets', 'fonts'),

	storybookFontsDir =
		node_path.join(root, 'storybook', 'public', 'fonts')

if(!node_fs.existsSync(fontsDir)) {
	throw new Error('/scripts/fonts-copy-to-storybook :: /assets/fonts directory was not found')
}

node_fs.cpSync(fontsDir, storybookFontsDir, { recursive: true, force: true })

console.info('/scripts/fonts-copy-to-storybook :: /assets/fonts directory has been copied to storybook static directory')
