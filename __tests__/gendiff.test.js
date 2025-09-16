import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import genDiff from '../src/gendiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename)
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf8').trim()

describe('gendiff', () => {
  test('recursive JSON comparison', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    const expected = readFixture('expected.txt')

    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('recursive YAML comparison', () => {
    const filepath1 = getFixturePath('file1.yaml')
    const filepath2 = getFixturePath('file2.yaml')
    const expected = readFixture('expected.txt')

    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('mixed JSON and YAML comparison', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.yaml')
    const expected = readFixture('expected.txt')

    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })
})
