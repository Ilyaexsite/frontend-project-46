import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/gendiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8')

describe('gendiff', () => {
  test('should compare flat JSON files correctly', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    const expected = readFile('expected.txt').trim()
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('should work with stylish format by default', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    const expected = readFile('expected.txt').trim()
    const result = genDiff(filepath1, filepath2, 'stylish')
    expect(result).toEqual(expected)
  })

  test('should throw error for unsupported format', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    expect(() => genDiff(filepath1, filepath2, 'unknown')).toThrow('Unsupported format: unknown')
  })

  test('should handle identical files', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file1.json')
    const result = genDiff(filepath1, filepath2)
    expect(result).toContain('host: hexlet.io')
    expect(result).toContain('timeout: 50')
    expect(result).not.toContain('+')
    expect(result).not.toContain('-')
  })

  test('should compare flat YAML files correctly', () => {
    const filepath1 = getFixturePath('file1.yml')
    const filepath2 = getFixturePath('file2.yml')
    const expected = readFile('expected.txt').trim()
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('should compare YAML and JSON files correctly', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.yml')
    const expected = readFile('expected.txt').trim()
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('should throw error for unsupported file format', () => {
    const tempFile = path.join(__dirname, '..', '__fixtures__', 'test.unsupported')
    writeFileSync(tempFile, 'test content')
    expect(() => genDiff(tempFile, getFixturePath('file2.json')))
      .toThrow('Unsupported file format: unsupported')
       unlinkSync(tempFile)
  })
})
