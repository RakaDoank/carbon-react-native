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
 * @param {"ViewStyle" | "TextStyle"} satisfierType
 */
export function getObjectString(
	data,
	satisfierType,
) {

	return `\nexport const ${data.name} = {\n` +
		( data.attrs.reduce((text, attr) => {
			let t = text
			t += `\t${attr.name}: ${typeof attr.value === "number" ? attr.value : `"${attr.value}"`},\n`
			return t
		}, "") ) +
		`} as const satisfies ${satisfierType}\n`

}
