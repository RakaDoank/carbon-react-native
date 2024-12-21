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
if(!fs.existsSync(`${root}/package/package-original.json`)) {
	fs.writeFileSync(`${root}/package/package-original.json`, JSON.stringify(packageJson, null, '\t'))
}

delete localPackageJson.scripts.prepare
delete localPackageJson.exports
delete localPackageJson.files
delete localPackageJson.main
delete localPackageJson.module
delete localPackageJson.source
delete localPackageJson.types
fs.writeFileSync(`${root}/package/package.json`, JSON.stringify(localPackageJson, null, '\t'))

console.log('Local development has been initialized')
console.warn(
	'\nWARNING' +
	'\n\nPlease, do not commit the modified package.json by this script.\nYou can undo it with `npm run clean-local-development` command or discard package.json change.' +
	'\n\nIf you are actually want to change some in the package.json,' +
	'\nundo this script by `npm run local-development-clean` or get original package.json' +
	'\nand modify the package.json first before running this script again\n'
)
