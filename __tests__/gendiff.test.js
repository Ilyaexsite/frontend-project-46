import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/gendiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim()

describe('gendiff', () => {
  test('should compare flat JSON files correctly', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file2_flat.json')
    const expected = readFile('expected_flat.txt')
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('should work with stylish format by default', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file2_flat.json')
    const expected = readFile('expected_flat.txt')
    const result = genDiff(filepath1, filepath2, 'stylish')
    expect(result).toEqual(expected)
  })

  test('should throw error for unsupported format', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file2_flat.json')
    expect(() => genDiff(filepath1, filepath2, 'unknown')).toThrow('Unsupported format: unknown')
  })

  test('should handle identical files', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file1_flat.json')
    const result = genDiff(filepath1, filepath2)
    expect(result).toContain('host: hexlet.io')
    expect(result).toContain('timeout: 50')
    expect(result).not.toContain('+')
    expect(result).not.toContain('-')
  })

  test('should compare flat YAML files correctly', () => {
    const filepath1 = getFixturePath('file1_flat.yml')
    const filepath2 = getFixturePath('file2_flat.yml')
    const expected = readFile('expected_flat.txt')
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('should compare YAML and JSON files correctly', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file2_flat.yml')
    const expected = readFile('expected_flat.txt')
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('should throw error for unsupported file format', () => {
    const tempFile = path.join(__dirname, '..', '__fixtures__', 'test.unsupported')
    writeFileSync(tempFile, 'test content')
    expect(() => genDiff(tempFile, getFixturePath('file2_flat.json')))
      .toThrow('Unsupported file format: unsupported')
    unlinkSync(tempFile)
  })

  test('should compare nested JSON files correctly', () => {
    const filepath1 = getFixturePath('file1_nested.json')
    const filepath2 = getFixturePath('file2_nested.json')
    const expected = readFile('expected_nested.txt')
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('should compare nested YAML files correctly', () => {
    const filepath1 = getFixturePath('file1_nested.yaml')
    const filepath2 = getFixturePath('file2_nested.yaml')
    const expected = readFile('expected_nested.txt')
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('should compare mixed nested formats correctly', () => {
    const filepath1 = getFixturePath('file1_nested.json')
    const filepath2 = getFixturePath('file2_nested.yaml')
    const expected = readFile('expected_nested.txt')
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('should handle nested identical files', () => {
    const filepath1 = getFixturePath('file1_nested.json')
    const filepath2 = getFixturePath('file1_nested.json')
    const result = genDiff(filepath1, filepath2)

    expect(result).toContain('common: {')
    expect(result).toContain('group1: {')
    expect(result).toContain('group2: {')
    expect(result).not.toContain('+')
    expect(result).not.toContain('-')
  })

  test('should format nested objects correctly in stylish format', () => {
    const filepath1 = getFixturePath('file1_nested.json')
    const filepath2 = getFixturePath('file2_nested.json')
    const result = genDiff(filepath1, filepath2, 'stylish')

    expect(result).toContain('setting5: {')
    expect(result).toContain('key5: value5')
    expect(result).toContain('doge: {')
    expect(result).toContain('wow: so much')
    expect(result).toContain('deep: {')
    expect(result).toContain('id: {')
    expect(result).toContain('number: 45')
  })
})

describe('gendiff plain format', () => {
  test('should format flat files in plain format', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file2_flat.json')
    const result = genDiff(filepath1, filepath2, 'plain')
    expect(result).toContain("Property 'follow' was removed")
    expect(result).toContain("Property 'timeout' was updated. From 50 to 20")
    expect(result).toContain("Property 'verbose' was added with value: true")
  })

  test('should format nested files in plain format', () => {
    const filepath1 = getFixturePath('file1_nested.json')
    const filepath2 = getFixturePath('file2_nested.json')
    const result = genDiff(filepath1, filepath2, 'plain')

    expect(result).toContain("Property 'common.follow' was updated. From true to false")
    expect(result).toContain("Property 'common.setting2' was removed")
    expect(result).toContain("Property 'common.setting3' was updated. From true to null")
    expect(result).toContain("Property 'common.setting4' was added with value: 'blah blah'")
    expect(result).toContain("Property 'common.setting5' was added with value: [complex value]")
    expect(result).toContain("Property 'common.setting6.doge.wow' was updated. From '' to 'so much'")
    expect(result).toContain("Property 'common.setting6.ops' was added with value: 'vops'")
    expect(result).toContain("Property 'group1.baz' was updated. From 'bas' to 'bars'")
    expect(result).toContain("Property 'group1.nest' was updated. From [complex value] to 'str'")
    expect(result).toContain("Property 'group2' was removed")
    expect(result).toContain("Property 'group3' was added with value: [complex value]")
  })

  test('should throw error for unknown format', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file2_flat.json')

    expect(() => genDiff(filepath1, filepath2, 'unknown')).toThrow('Unsupported format: unknown')
  })
})
describe('gendiff json format', () => {
  test('should format files in json format', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file2_flat.json')
    
    const result = genDiff(filepath1, filepath2, 'json')
    
    expect(() => JSON.parse(result)).not.toThrow()
    const parsed = JSON.parse(result)
    expect(Array.isArray(parsed)).toBe(true)
  })

  test('should format nested files in json format', () => {
    const filepath1 = getFixturePath('file1_nested.json')
    const filepath2 = getFixturePath('file2_nested.json')
    
    const result = genDiff(filepath1, filepath2, 'json')
    
    expect(() => JSON.parse(result)).not.toThrow()
    const parsed = JSON.parse(result)
    expect(Array.isArray(parsed)).toBe(true)
  })
})
