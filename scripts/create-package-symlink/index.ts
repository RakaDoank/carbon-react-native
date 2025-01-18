import node_fs from 'node:fs'
import node_path from 'node:path'
import node_url from 'node:url'
import node_child_process from 'node:child_process'

node_child_process.execSync('npm run setup-package-registry')

const
	__filename =
		node_url.fileURLToPath(import.meta.url),

	__dirname =
		node_path.dirname(__filename),

	root =
		node_path.resolve(__dirname, '../..'),

	packagePath =
		node_path.join(root, 'package')

try {
	const argv = process.argv

	let destinationPath = ''

	argv.forEach((arg, index) => {
		if(arg === '--destination') {
			if(argv[index + 1] === '=' && argv[index + 2]) {
				destinationPath = node_path.join(root, argv[index + 2])
			} else if(typeof argv[index + 1] === 'string') {
				destinationPath = node_path.join(root, argv[index + 1])
			}
		}
	})

	if(!destinationPath) {
		throw new Error('No destination path argument')
	}

	if(!node_fs.existsSync(destinationPath)) {
		throw new Error('Destination path doesn\'t exist')
	}

	const destination = node_path.join(destinationPath, '.carbon-react-native')

	if(node_fs.existsSync(destination)) {
		node_fs.rmSync(destination, { recursive: true })
	}
	node_fs.mkdirSync(destination)

	const files = node_fs.readdirSync(packagePath, { withFileTypes: true })
	files.forEach(file => {
		const isDirectory = file.isDirectory()
		if(
			!isDirectory ||
			(
				isDirectory &&
				(
					file.name !== 'node_modules' &&
					file.name !== 'lib'
				)
			)
		) {
			node_fs.symlinkSync(
				node_path.join(packagePath, file.name),
				node_path.join(destination, file.name),
			)
		}
	})

	console.info('Successfully created package symlink at: ' + destination)

} catch(e) {
	throw new Error(e instanceof Error ? e.message : 'Unknown error')
}
