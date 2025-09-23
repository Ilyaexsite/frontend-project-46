import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/gendiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

describe('JSON formatter', () => {
  test('should format flat files to valid JSON', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')

    const result = genDiff(file1, file2, 'json')

    expect(() => JSON.parse(result)).not.toThrow()

    const parsed = JSON.parse(result)
    expect(Array.isArray(parsed)).toBe(true)

    parsed.forEach((item) => {
      expect(item).toHaveProperty('key')
      expect(item).toHaveProperty('status')
      expect(['added', 'removed', 'unchanged', 'updated', 'nested']).toContain(item.status)
    })
  })

  test('should handle nested structures correctly', () => {
    const file1 = getFixturePath('nested1.json')
    const file2 = getFixturePath('nested2.json')

    const result = genDiff(file1, file2, 'json')
    const parsed = JSON.parse(result)

    const nestedItem = parsed.find(item => item.status === 'nested')
    expect(nestedItem).toBeDefined()
    expect(nestedItem).toHaveProperty('children')
    expect(Array.isArray(nestedItem.children)).toBe(true)
  })

  test('should include oldValue for updated items', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')

    const result = genDiff(file1, file2, 'json')
    const parsed = JSON.parse(result)

    const updatedItem = parsed.find(item => item.status === 'updated')
    if (updatedItem) {
      expect(updatedItem).toHaveProperty('oldValue')
      expect(updatedItem).toHaveProperty('value')
    }
  })

  test('should produce different output for different formats', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')

    const jsonResult = genDiff(file1, file2, 'json')
    const stylishResult = genDiff(file1, file2, 'stylish')

    expect(jsonResult).not.toEqual(stylishResult)
    expect(() => JSON.parse(jsonResult)).not.toThrow()
    expect(() => JSON.parse(stylishResult)).toThrow()
  })
})
