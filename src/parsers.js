import fs from 'fs'
import path from 'path'

const getAbsolutePath = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath
  }
  return path.resolve(process.cwd(), filepath)
}

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const parseFile = (filepath) => {
  const content = readFile(filepath)
  const extension = path.extname(filepath).toLowerCase()
  
  switch (extension) {
    case '.json':
      return JSON.parse(content);
    default:
      throw new Error(`Unsupported file format: ${extension}`)
  }
}

export { parseFile, readFile }
