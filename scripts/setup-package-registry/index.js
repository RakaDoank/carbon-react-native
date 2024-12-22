const
	fs =
		require('fs'),

	path =
		require('path'),

	packageJson =
		require('../../package/package.json'),

	packageJsonRoot =
		require('../../package.json')

const
	root =
		path.resolve(__dirname, '../..'),

	symlinkPath =
		path.join(root, '.carbon-react-native'),

	additionalSources =
		[
			{
				name: 'assets',
				path: path.join(root, '/assets'),
			},
			{
				name: 'README.md',
				path: path.join(root, 'README.md'),
			},
		]

if(fs.existsSync(symlinkPath)) {
	fs.rmSync(symlinkPath, { recursive: true })
}
fs.mkdirSync(symlinkPath)

const localPackageJson = { ...packageJson }
localPackageJson.name = packageJsonRoot.name
localPackageJson.version = packageJsonRoot.version
fs.writeFileSync(`${root}/package/package.json`, JSON.stringify(localPackageJson, null, '\t'))

fs.readdir(path.join(root, '/package'), {}, (err, files) => {
	if(err) {
		console.error(`Failed to read \`package\` ${err.message}`)
	} else {
		try {
			files.forEach(file => {
				try {
					if(file !== 'package-original.json') {
						fs.symlinkSync(
							path.join(root, 'package', file),
							path.join(symlinkPath, file),
							'dir',
						)
					}
				} catch(e) {
					throw new Error(`Failed to create \`package\` symlink. ${e.message}`)
				}
			})

			additionalSources.forEach(source => {
				try {
					fs.symlinkSync(source.path, path.join(symlinkPath, source.name), 'dir')
				} catch(e) {
					throw new Error(`Failed to create \`${source.name}\` symlink. ${e.message}`)
				}
			})

			console.info('Package has been set as registry')
		} catch(e) {
			console.error(e.message)
		}
	}
})
