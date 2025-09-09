import { readFileSync } from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const content = readFileSync(absolutePath, 'utf-8')
  const ext = path.extname(filepath).toLowerCase()

  switch (ext) {
  case '.json':
    return JSON.parse(content);
  case '.yml':
  case '.yaml':
  return yaml.load(content);
  default:
    throw new Error(`Unsupported file format: ${ext}`)
  }
}

export default parseFile
