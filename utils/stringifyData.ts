export default (key: string, data: object): string => {
	return JSON.stringify({
		key: key,
		data
	})
}