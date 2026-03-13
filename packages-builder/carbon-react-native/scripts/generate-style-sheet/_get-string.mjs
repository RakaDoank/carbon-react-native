/**
 * @typedef {{
 * 	name: string,
 * 	attrs: {
 * 		name: string,
 * 		value: number | string,
 * 	}[],
 * }} DataStyleSheet
 * 
 * @param {DataStyleSheet} data
 */
export function getString(
	data,
) {

	return `\nexport const { ${data.name} } = StyleSheet.create({\n` +
		`\t${data.name}: {\n` +
		( data.attrs.reduce((text, attr) => {
			let t = text
			t += `\t\t${attr.name}: ${typeof attr.value === "number" ? attr.value : `"${attr.value}"`},\n`
			return t
		}, "") ) +
		`\t} as const,\n` +
		`})`

}
