const
	fs =
		require('fs'),

	path =
		require('path'),

	{ execSync } =
		require('child_process'),

	packageJson =
		require('../../package/package.json')

const
	root =
		path.resolve(__dirname, '../..'),

	packageRegistryPath =
		path.join(root, '.carbon-react-native'),

	content =
		'// THIS IS GENERATED FILE OF LOCAL DEVELOPMENT SCRIPT\n' +
		'export * from \'./src\'\n',

	localPackageJson =
		{ ...packageJson }

execSync('npm run setup-package-registry')

fs.writeFileSync(`${packageRegistryPath}/index.tsx`, content)

delete localPackageJson.scripts.prepare
delete localPackageJson.exports
delete localPackageJson.files
delete localPackageJson.main
delete localPackageJson.module
delete localPackageJson.source
delete localPackageJson.types
fs.unlinkSync(path.join(packageRegistryPath, 'package.json'))
fs.writeFileSync(path.join(packageRegistryPath, 'package.json'), JSON.stringify(localPackageJson, null, '\t'))

console.log('Local development has been initialized')
