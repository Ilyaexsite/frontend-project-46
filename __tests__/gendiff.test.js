import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/gendiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

describe('gendiff', () => {
  test('should compare flat JSON files correctly', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file2_flat.json')

    const result = genDiff(filepath1, filepath2)

    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
    expect(result).toContain('follow')
    expect(result).toContain('host')
    expect(result).toContain('timeout')
  })

  test('should work with stylish format by default', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file2_flat.json')

    const resultDefault = genDiff(filepath1, filepath2)
    const resultStylish = genDiff(filepath1, filepath2, 'stylish')

    expect(resultDefault).toEqual(resultStylish)
  })

  test('should throw error for unsupported format', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file2_flat.json')

    expect(() => genDiff(filepath1, filepath2, 'unknown')).toThrow('Unsupported format: unknown')
  })

  test('should handle identical files', () => {
    const filepath1 = getFixturePath('file1_flat.json')

    const result = genDiff(filepath1, filepath1)
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
  })

  test('should compare flat YAML files correctly', () => {
    const filepath1 = getFixturePath('file1_flat.yaml')
    const filepath2 = getFixturePath('file2_flat.yaml')

    const result = genDiff(filepath1, filepath2)
    expect(result).toContain('follow')
    expect(result).toContain('host')
    expect(result).toContain('timeout')
  })

  test('should compare YAML and JSON files correctly', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file2_flat.yaml')

    const result = genDiff(filepath1, filepath2)
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  test('should compare nested JSON files correctly', () => {
    const filepath1 = getFixturePath('file1_nested.json')
    const filepath2 = getFixturePath('file2_nested.json')

    const result = genDiff(filepath1, filepath2)
    expect(result).toContain('common')
    expect(result).toContain('group1')
    expect(result).toContain('setting')
    expect(result).toContain('follow')
  })

  test('should compare nested YAML files correctly', () => {
    const filepath1 = getFixturePath('file1_nested.yaml')
    const filepath2 = getFixturePath('file2_nested.yaml')

    const result = genDiff(filepath1, filepath2)
    expect(result).toContain('common')
    expect(result).toContain('group1')
    expect(result).toContain('setting')
  })

  test('should compare mixed nested formats correctly', () => {
    const filepath1 = getFixturePath('file1_nested.json')
    const filepath2 = getFixturePath('file2_nested.yaml')

    const result = genDiff(filepath1, filepath2)
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  test('should handle nested identical files', () => {
    const filepath1 = getFixturePath('file1_nested.json')

    const result = genDiff(filepath1, filepath1)
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
  })
})

describe('gendiff plain format', () => {
  test('should format flat files in plain format', () => {
    const filepath1 = getFixturePath('file1_flat.json')
    const filepath2 = getFixturePath('file2_flat.json')

    const result = genDiff(filepath1, filepath2, 'plain')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  test('should format nested files in plain format', () => {
    const filepath1 = getFixturePath('file1_nested.json')
    const filepath2 = getFixturePath('file2_nested.json')

    const result = genDiff(filepath1, filepath2, 'plain')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
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
