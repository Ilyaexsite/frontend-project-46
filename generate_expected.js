import { writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from './src/gendiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)

const flat1 = getFixturePath('file1_flat.json')
const flat2 = getFixturePath('file2_flat.json')
const flatResult = genDiff(flat1, flat2)
writeFileSync(getFixturePath('expected_flat.txt'), flatResult)

const nested1 = getFixturePath('file1_nested.json')
const nested2 = getFixturePath('file2_nested.json')
const nestedResult = genDiff(nested1, nested2)
writeFileSync(getFixturePath('expected_nested.txt'), nestedResult)
console.log('Expected files generated!')
