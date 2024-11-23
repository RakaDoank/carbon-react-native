/**
 * @param {string} hexCode 
 * @param {string} opacity
 * @returns {string}
 */
function hexToRgba(
	hexCode,
	opacity,
) {
	const values = [
		hexCode.substring(1, 3),
		hexCode.substring(3, 5),
		hexCode.substring(5, 7),
	].map((string) => parseInt(string, 16))
	return `rgba(${values[0]},${values[1]},${values[2]},${opacity})`
}

module.exports = hexToRgba
