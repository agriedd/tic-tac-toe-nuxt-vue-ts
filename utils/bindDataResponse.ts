export default (data: ArrayBuffer | Buffer | string): { key: string, data: { [key: string]: unknown } } | undefined => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (_error) {
      return undefined
    }
  } else {
    try {
      const buff = Buffer.from(data);
      return JSON.parse(buff.toString())
    } catch (_error) {
      return undefined
    }
  }
}